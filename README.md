# Mobile App Automation — WebdriverIO + Appium

Automated UI tests for a native Android Notes application using **WebdriverIO, Appium 3, TypeScript, and Mocha**. The project supports local Android emulator execution and cloud-based testing with BrowserStack App Automate, with automated test reporting through Allure and GitHub Actions.

[![BrowserStack Tests](https://img.shields.io/badge/BrowserStack-App_Automate-00A67E?logo=browserstack)](https://github.com/Z-F-R/appium-webdriverio/actions/workflows/browserstack.yml)
[![Allure Report](https://img.shields.io/badge/Allure-View_Report-8A2BE2?logo=allure)](https://z-f-r.github.io/appium-webdriverio/)

**[View Latest Allure Test Report](https://z-f-r.github.io/appium-webdriverio/)** · **[GitHub Actions Workflows](https://github.com/Z-F-R/appium-webdriverio/actions)**

## Tech Stack

- **WebdriverIO 10** — mobile automation framework
- **Appium 3** — mobile automation server
- **UiAutomator2** — Android automation driver
- **TypeScript** — test implementation
- **Mocha** — test runner
- **Allure Report** — test reporting
- **GitHub Actions** — CI workflow
- **BrowserStack App Automate** — cloud device testing

## Test Coverage

The test suite covers five core user flows in the Notes application:

- Create and save a note
- Search for a note
- Edit an existing note
- Delete a note
- Pin a note and find it in Pinned Notes

## Prerequisites

For local execution:

- Node.js and npm
- Java JDK
- Android SDK and Android Emulator
- Appium 3 with the UiAutomator2 driver

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Z-F-R/appium-webdriverio.git
cd appium-webdriverio
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Start the Android emulator and Appium server

Start an Android emulator, then launch Appium in a terminal:

```bash
appium
```

The project uses the Android Notes APK included in the `apps/` directory.

### 4. Run the tests

Run the full test suite:

```bash
npm test
```

Run the specific test spec:

```bash
npm run test:spec
```

## Allure Reports

Generate a local Allure report after test execution:

```bash
npm run allure:report
```

Open the generated report:

```bash
npm run allure:open
```

The latest published report is also available online:

**[Open Allure Report](https://z-f-r.github.io/appium-webdriverio/)**

## BrowserStack and CI

The project supports running mobile tests on BrowserStack App Automate through GitHub Actions.

To trigger a cloud test run:

1. Open [GitHub Actions](https://github.com/Z-F-R/appium-webdriverio/actions/workflows/browserstack.yml).
2. Select **BrowserStack Mobile Tests**.
3. Click **Run workflow**.

The workflow uploads the Android APK to BrowserStack, executes the test suite on a cloud Android device, generates an Allure report, and publishes the report to GitHub Pages.

The workflow requires the following GitHub Actions repository secrets:

- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`

The published Allure report represents the latest successfully published report and may be replaced by a subsequent workflow run.

## Application Under Test

The project automates a native Android Notes application. Its APK is included in the repository under `apps/`.

## Project Structure

```text
appium-webdriverio/
├── apps/                  # Android application APK
├── test/
│   ├── pageobjects/       # Page Object classes
│   └── specs/             # Test specifications
├── .github/
│   └── workflows/         # GitHub Actions workflows
├── wdio.conf.ts           # WebdriverIO configuration
├── package.json
└── README.md
```

## Author

**[Z-F-R](https://github.com/Z-F-R)**