

describe('template spec', () => {
  beforeEach('Page open',()  =>

    cy.visit('https://example.cypress.io')
  )
  it('passes', () => {
    cy.get('h1').should('have.text','Kitchen asda Sink')
  })
  // it('fail', () => {
  //   cy.get(':nth-child(3) > .container > .row > #utilities > p').should('length.greaterThan', 5)
  // })
  // it.skip('passes', () => {
  //   cy.get(':nth-child(3) > .container > .row > #utilities > h2').should('be.visible')
  // })
})