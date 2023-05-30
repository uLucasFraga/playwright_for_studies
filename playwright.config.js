import { expect } from "@playwright/test";
require("dotenv").config({ path: ".env" });

const toMatchSchema = require("./lib/expect-schema");
expect.extend(toMatchSchema);

const apiServerest = process.env.API_SERVEREST;
const e2eServerest = process.env.E2E_SERVEREST;

process.env.PLAYWRIGHT_EXPERIMENTAL_FEATURES = "1";

export const retries = process.env.CI ? 1 : 0;
export const reporter = [
  [
    "allure-playwright",
    {
      environmentInfo: {
        E2E_NODE_VERSION: process.version,
        E2E_OS: process.platform,
      },
    },
  ],
  ["list"],
  ["html", { open: "never", outputFolder: "reports" }],
];
export const projects = [
  {
    name: "api",
    testMatch: "**/api/*/*.api.test.js",
    use: {
      baseURL: apiServerest,
    },
  },
  {
    name: "e2e",
    outputDir: "test-results",
    testMatch: "**/e2e/*/*.e2e.test.js",
    use: {
      baseURL: e2eServerest,
      browsers: ["chromium"],
      viewport: { width: 1440, height: 900 },
      screenshot: "only-on-failure",
      trace: "retain-on-failure",
      bypassCSP: true,
      launchOptions: {
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-web-security",
          "--disable-gpu",
          "--disable-dev-shm-usage",
        ],
        headless: true,
      },
    },
  },
];
