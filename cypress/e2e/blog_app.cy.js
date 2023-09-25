describe('Blog Application', () => {
  const user = {
    username:'simonr',
    name:'simon r.',
    password:'SuperSecretWords'
  };
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
  });

  it('Login form is shown', function(){
    cy.visit('');
    cy.contains('Log in to the application');
    cy.get('button').contains('login')
  });

  describe('Login',function(){
    it('succeeds with correct credentials', function() {
      cy.visit('');
      cy.get('#username-input').type(user.username);
      cy.get('#password-input').type(user.password);
      cy.get('#login-button').click();

      cy.contains('Successfully logged in');
      cy.contains(`${user.name} logged in`);
      cy.get('button:first').contains('logout');
    })

    it('fails with wrong credentials', function() {
      cy.visit('');
      cy.get('#username-input').type('hacker');
      cy.get('#password-input').type('wrongpass');
      cy.get('#login-button').click();

      cy.contains('Successfully logged in').should('not.exist');
      cy.contains(`${user.name} logged in`).should('not.exist');
      cy.get('button:first').contains('logout').should('not.exist');

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })


})