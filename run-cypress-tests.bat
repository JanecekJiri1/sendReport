@echo off

REM Spuštění testů v Cypress
npx cypress run --spec "cypress/e2e/spec.cy.js"

REM Vytvoření reportu
npx mochawesome-merge cypress/results/*.json > merged-report.json
npx marge merged-report.json --reportDir cypress/reports

REM Odeslání emailu s reportem
npx nodemailer-cli --config email-config.json --file cypress/reports/mochawesome.html