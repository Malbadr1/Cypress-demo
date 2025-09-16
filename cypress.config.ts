import { defineConfig } from "cypress";
import webpackPreprocessor from "@cypress/webpack-preprocessor";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // ✅ Register TypeScript preprocessor
      on(
        "file:preprocessor",
        webpackPreprocessor({
          webpackOptions: {
            resolve: {
              extensions: [".ts", ".js"], // allow TS & JS
            },
            module: {
              rules: [
                {
                  test: /\.ts$/,
                  exclude: /node_modules/,
                  use: [{ loader: "ts-loader" }],
                },
              ],
            },
          },
        }),
      );

      // ✅ Register mochawesome reporter plugin
      require("cypress-mochawesome-reporter/plugin")(on);

      return config;
    },

    // ✅ Patterns for test discovery
    specPattern: "cypress/e2e/**/*.cy.ts",
    baseUrl: "https://www.saucedemo.com",

    // ✅ Important: custom commands & reporter hooks
    supportFile: "cypress/support/e2e.ts",

    // ✅ Enable screenshots & videos
    video: true, // Cypress records video of test runs
    screenshotOnRunFailure: true, // take screenshots automatically on failures
  },

  // ✅ Reporter configuration
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Cypress Report",
    embeddedScreenshots: true, // show screenshots inside HTML report
    inlineAssets: true, // bundle CSS/JS in the report file
    saveAllAttempts: false, // only keep latest run attempt
  },
});
