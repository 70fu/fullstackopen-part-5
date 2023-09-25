describe('Blog Application', () => {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.visit('');
  });

  it('Login form is shown', function(){
    cy.contains('Log in to the application');
    cy.get('button').contains('login')
  })
})