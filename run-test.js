// const sendEmail = require('./send-email');
const { execSync } = require('child_process');

try {
  // Spustit testy pomocí Cypress
  execSync('npx cypress run --spec cypress/e2e/email.cy.js');
} catch (error) {
  console.error('Chyba při spouštění testu test-email:', error.message);
}

// Ostatní kód pro odeslání e-mailu
// sendEmail();
