import allure from '@wdio/allure-reporter'
import { resolve } from 'node:path'

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './tsconfig.json',

    specs: ['./test/specs/**/*.ts'],

    maxInstances: 1,

    hostname: '127.0.0.1',
    port: 4723,

    capabilities: [
        {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:deviceName': 'Android Emulator',
            'appium:udid': 'emulator-5554',
            'appium:platformVersion': '17',
            'appium:app': './apps/Notes_com_s17labs_notesapp_1_0_5.apk',
            'appium:appPackage': 'com.s17labs.notesapp',
            'appium:appActivity': '.MainActivity',
            'appium:autoGrantPermissions': true,
            'appium:adbExecTimeout': 40000,
        },
    ],

    logLevel: 'info',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 1,

    // Appium is already running in a separate terminal.
    services: [],

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

    afterTest: async function (_test, _context, { error }) {
        if (error) {
            const screenshot = await browser.takeScreenshot()
            allure.addAttachment(
                'Screenshot on failure',
                Buffer.from(screenshot, 'base64'),
                'image/png'
            )
        }
    },

}
