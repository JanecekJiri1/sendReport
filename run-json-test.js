const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  reporter: 'cypress-mochawesome-reporter', // html reports
  reporterOptions: {
    "reportDir": "cypress/reports",
    "overwrite": false,
    "html": true,
    "json": false
  },
  e2e: {
    setupNodeEvents(on, config) {
      // config.pluginFile="./cypress/plugins/index.js"
      // implement node event listeners here
      this.screenshotOnRunFailure = true;
    //   require('cypress-mochawesome-reporter/plugin')(on); // for html exports

    },
  },
});


