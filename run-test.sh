#!/bin/bash

# Spuštění testů v Cypress
npx cypress run --spec "cypress/e2e/email.cy.js"

# Vytvoření reportu
npx mochawesome-merge cypress/reports/*.json > merged-report.json
npx marge merged-report.json --reportDir cypress/reports

# Filtrace udajů v reportu
marge-report --reportDir cypress/reports --filter "passing=false" --overwrite