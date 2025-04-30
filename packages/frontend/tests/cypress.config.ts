const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: "e2e/support/e2e.{js,jsx,ts,tsx}",
    specPattern: "e2e/specs/**/*.cy.{js,jsx,ts,tsx}",
    videosFolder: "e2e/videos",
    screenshotsFolder: "e2e/screenshots",
    baseUrl: "http://localhost:5173",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
