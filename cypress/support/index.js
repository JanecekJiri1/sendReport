after(() => {
    cy.task('sendMail', 'This will be output to email address')
      .then(result => console.log(result));
  })