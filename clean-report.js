const { execSync } = require('child_process');
const path = require('path');

const directoryPath = path.join(__dirname, 'cypress/reports/html');
execSync(`rm -rf ${directoryPath}`);