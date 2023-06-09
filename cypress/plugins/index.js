const generateReport = require('cypress-mochawesome-reporter/generateReport');

module.exports = (on, config) => {
  const firstRun = process.env.FIRST_RUN === 'true';

  if (firstRun) {
    require('cypress-mochawesome-reporter/plugin')(on);
  }

  on('after:run', (results) => {
    if (firstRun) {
      generateReport(Object.assign({}, results, {
        reportDir: config.reporterOptions.reportDir,
      }));
    }
  });

  config.pluginFile = "./cypress/plugins/index.js";
  this.screenshotOnRunFailure = true;

  // Implementace dalších event listenerů

  return config;
};