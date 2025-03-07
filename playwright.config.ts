import { defineConfig, devices } from "@playwright/test"
import { BIG_TIMEOUT, EXPECT_TIMEOUT } from "./constants/timeout-constants"
import * as os from "node:os"

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(__dirname, ".env") })

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  globalSetup: require.resolve("./setup/global-setup"),
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: process.env.CI === "true",
  /* Retry on CI only */
  retries: process.env.CI === "true" ? 3 : 3,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI === "true" ? 3 : 6,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["line"],
    ["dot"],
    ["html"],
    [
      "allure-playwright",
      {
        resultsDir: "allure-results",
        environmentInfo: {
          os_platform: os.platform(),
          os_release: os.release(),
          os_version: os.version(),
          node_version: process.version,
        },
      },
    ],
    ["./setup/custom-logger.ts"],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: "https://letcode.in",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on",
    colorScheme: "dark",
    // Run tests in headless mode in CI pipeline
    headless: process.env.CI === "true",
    // launchOptions: {
    //     args: ["--start-maximized"],
    // },
    // viewport: null
  },
  timeout: BIG_TIMEOUT,
  expect: {
    timeout: EXPECT_TIMEOUT,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //     name: 'Google Chrome',
    //     use: {...devices['Desktop Chrome'], channel: 'chrome'},
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})
