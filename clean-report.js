const { execSync } = require('child_process');
const path = require('path');

const directoryPath = path.join(__dirname, 'cypress/reports/');
execSync(`rm -rf ${directoryPath}`);