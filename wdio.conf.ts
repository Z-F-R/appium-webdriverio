import allure from '@wdio/allure-reporter'
import { resolve } from 'node:path'

const isBrowserStack = process.env.TEST_ENV === 'browserstack'
const username = process.env.BROWSERSTACK_USERNAME
const accessKey = process.env.BROWSERSTACK_ACCESS_KEY
const appUrl = process.env.BROWSERSTACK_APP_URL

if (isBrowserStack && (!username || !accessKey || !appUrl)) {
    throw new Error(
        'BrowserStack requires BROWSERSTACK_USERNAME, ' +
        'BROWSERSTACK_ACCESS_KEY and BROWSERSTACK_APP_URL'
    )
}

let failedTests = 0

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    specs: ['./test/specs/**/*.ts'],
    maxInstances: 1,

    hostname: isBrowserStack
        ? 'hub-cloud.browserstack.com'
        : '127.0.0.1',
    port: isBrowserStack ? 443 : 4723,
    path: isBrowserStack ? '/wd/hub' : '/',

    ...(isBrowserStack ? { user: username, key: accessKey } : {}),

    capabilities: [
        isBrowserStack
            ? {
                platformName: 'Android',
                'appium:automationName': 'UiAutomator2',
                'appium:app': appUrl,
                'bstack:options': {
                    deviceName: 'Samsung Galaxy S22',
                    platformVersion: '12.0',
                    projectName: 'Appium WebdriverIO',
                    buildName: `Mobile Notes Tests - Run ${process.env.GITHUB_RUN_NUMBER ?? 'local'}`,
                    sessionName: 'Notes app test suite',
                },
            }
            : {
                platformName: 'Android',
                'appium:automationName': 'UiAutomator2',
                'appium:deviceName': 'Android Emulator',
                'appium:udid': process.env.ANDROID_UDID ?? 'emulator-5554',
                'appium:platformVersion':
                    process.env.ANDROID_PLATFORM_VERSION ?? '17',
                'appium:app': resolve(
                    process.cwd(),
                    'apps',
                    'Notes_com_s17labs_notesapp_1_0_5.apk'
                ),
                'appium:appPackage': 'com.s17labs.notesapp',
                'appium:appActivity': '.MainActivity',
                'appium:autoGrantPermissions': true,
                'appium:adbExecTimeout': 40000,
            },
    ],

    logLevel: 'warn',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 1,

    services: isBrowserStack ? [] : ['appium'],

    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000,
    },

    after: async function () {
        if (!isBrowserStack) {
            return
        }

        const status = failedTests === 0 ? 'passed' : 'failed'
        const reason = failedTests === 0
            ? 'All tests passed'
            : `${failedTests} test(s) failed`

        await browser.execute(
            `browserstack_executor: ${JSON.stringify({
                action: 'setSessionStatus',
                arguments: { status, reason },
            })}`
        )
    },

    afterTest: async function (_test, _context, { error }) {
        if (error) {
            failedTests++

            const screenshot = await browser.takeScreenshot()
            allure.addAttachment(
                'Screenshot on failure',
                Buffer.from(screenshot, 'base64'),
                'image/png'
            )
        }
    },
}
