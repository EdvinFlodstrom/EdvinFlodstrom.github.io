describe('Check local server', () => {
  it('Tests that "begin" button changes class accordingly.', () => {
    cy.visit('http://127.0.0.1:5500/');

    cy.get('[data-cy="begin"]').then(($el) => {
      if ($el.hasClass("btn-outline-danger")) {
        cy.get('[data-cy="plus100"]').click();
      }
    });

    cy.get('[data-cy="begin"]').should('have.class', 'btn-outline-success');
    cy.get('[data-cy="bet"]').should('have.html', "Bet: $100");
  });
});