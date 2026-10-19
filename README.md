# Mobile App Automation — WebdriverIO + Appium

[![BrowserStack Mobile Tests](https://github.com/Z-F-R/appium-webdriverio/actions/workflows/browserstack.yml/badge.svg)](https://github.com/Z-F-R/appium-webdriverio/actions/workflows/browserstack.yml)
[![Allure Report](https://img.shields.io/badge/Allure-View_Report-8A2BE2?logo=allure)](https://z-f-r.github.io/appium-webdriverio/)

Automated UI tests for a native Android Notes application using **WebdriverIO 10, Appium 3, TypeScript, and Mocha**. The project supports local Android emulator execution and cloud-based testing with BrowserStack App Automate. Allure generates test reports, and GitHub Actions runs the cloud test suite and publishes the report to GitHub Pages.

## Tech Stack

- **WebdriverIO 10** — mobile automation framework
- **Appium 3** — mobile automation server
- **UiAutomator2** — Android automation driver
- **TypeScript** — test implementation
- **Mocha** — test runner
- **Allure Report** — test reporting
- **BrowserStack App Automate** — cloud device testing
- **GitHub Actions** — CI workflow and report deployment

## Test Coverage

The test suite covers five core user flows:

- Create and save a note
- Search for a note
- Edit an existing note
- Delete a note
- Pin a note and find it in Pinned Notes

## Prerequisites

For local execution:

- Node.js 24 or compatible version
- npm
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

### 3. Start the Android emulator

Start an Android emulator and make sure it is available through ADB:

```bash
adb devices
```

The project includes the application APK at `apps/Notes_com_s17labs_notesapp_1_0_5.apk`.

### 4. Run the tests locally

Run the full test suite:

```bash
npm test
```

Run the specific test spec:

```bash
npm run test:spec
```

Run TypeScript validation:

```bash
npm run typecheck
```

## Allure Reports

Generate a local report after test execution:

```bash
npm run allure:report
```

Open the generated report:

```bash
npm run allure:open
```

The latest published report is available at [GitHub Pages](https://z-f-r.github.io/appium-webdriverio/).

The published report may be replaced by a subsequent workflow run.

## BrowserStack and CI

The project supports cloud testing through BrowserStack App Automate.

### Run tests through GitHub Actions

1. Open [BrowserStack Mobile Tests](https://github.com/Z-F-R/appium-webdriverio/actions/workflows/browserstack.yml).
2. Select **Run workflow**.
3. Start the workflow on the desired branch.

The workflow uploads the Android APK to BrowserStack, runs the tests on a cloud Android device, generates an Allure report, saves report artifacts, and publishes the report to GitHub Pages.

The following repository secrets must be configured in **Settings → Secrets and variables → Actions**:

- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`

### Run tests against BrowserStack locally

A local BrowserStack run requires these environment variables:

- `TEST_ENV=browserstack`
- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`
- `BROWSERSTACK_APP_URL`

`BROWSERSTACK_APP_URL` must contain a valid BrowserStack app URL, usually starting with `bs://`. Upload the APK to BrowserStack first if you do not already have an app URL.

For PowerShell, set the variables in the current terminal session before running the tests:

```powershell
$env:TEST_ENV = "browserstack"
$env:BROWSERSTACK_USERNAME = "your_username"
$env:BROWSERSTACK_ACCESS_KEY = "your_access_key"
$env:BROWSERSTACK_APP_URL = "bs://your_app_id"
npm test
```

Do not commit real credentials or app-specific secrets to the repository.

## Application Under Test

The project automates a native Android Notes application. Its APK is stored in the repository under `apps/`.

## Project Structure

```text
appium-webdriverio/
├── apps/                    # Android application APK
├── test/
│   ├── helpers/             # Shared test helpers
│   ├── pageobjects/         # Page Object classes
│   └── specs/               # Test specifications
├── .github/
│   └── workflows/           # GitHub Actions workflows
├── .env.example             # Environment variable template
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
├── wdio.conf.ts
└── README.md
```

## Author

[Z-F-R](https://github.com/Z-F-R)
