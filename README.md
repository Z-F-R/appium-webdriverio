# Mobile App Automation — WebdriverIO + Appium

Automated UI tests for a native Android Notes application using WebdriverIO, TypeScript, Mocha, and Appium.

## Tech Stack

- WebdriverIO
- Appium 3 with UiAutomator2
- TypeScript
- Mocha
- Allure Report
- Android Emulator

## Prerequisites

- Node.js and npm
- Java JDK
- Android SDK and Android Emulator
- Appium 3 with the UiAutomator2 driver

## Setup

Clone the repository and install dependencies:

```bash
npm ci
```

Start an Android emulator and install/configure Appium with the UiAutomator2 driver.

Start the Appium server:

```bash
appium
```

## Run Tests

Run the full test suite:

```bash
npm test
```

Run a specific spec:

```bash
npm run test:spec
```

## Allure Report

Generate the report:

```bash
npm run allure:report
```

Open the report:

```bash
npm run allure:open
```

## Test Coverage

- Create and save a note
- Search for a note
- Edit an existing note
- Delete a note
- Pin a note and find it in Pinned Notes

## Application Under Test

The Android APK is included in the `apps/` directory.

## Project Status

Local Android emulator execution is configured. BrowserStack App Automate and GitHub Actions integration are planned next.