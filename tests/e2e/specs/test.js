describe('e2e tests with Crypess', () => {
  it('Open the page with the spanish language selected by default', () => {
    cy.visit('/');
    cy.url().should('include', '/es');
  });

  it('Check that when selecting a breed, the photo slide exists', () => {
    cy.visit('/');
    cy.get('select').select('affenpinscher');
    cy.get('.PhotoSlide').should('be.visible');
  });

  it('Select the wrong breed and check that the user message exists, which is closeable', () => {
    cy.visit('/');
    cy.get('.UserMessage').should('not.exist');
    cy.get('select').select(1);
    cy.get('.UserMessage').should('be.visible');
    cy.get('#closeIcon').click();
    cy.get('.UserMessage').should('not.exist');
  });

  it('Select a photo of a breed and check that the user message disappears after 2 seconds', () => {
    cy.visit('/');
    cy.get('.UserMessage').should('not.exist');
    cy.get('select').select('affenpinscher');
    cy.get('[data-cy=imageBreed]').first().click();
    cy.get('.UserMessage').should('be.visible');
    cy.wait(2000);
    cy.get('.UserMessage').should('not.exist');
  });
});
