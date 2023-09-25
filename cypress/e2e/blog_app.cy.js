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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login(user);
    })
    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/'
    };

    it('A blog can be created', function() {
      cy.contains('new blog').click();

      cy.get('label').contains('title').find('input').type(blog.title);
      cy.get('label').contains('author').find('input').type(blog.author);
      cy.get('label').contains('url').find('input').type(blog.url);

      cy.get('#create-blog-button').click();

      cy.get('.success')
        .should('contain', blog.title)
        .and('contain', blog.author)
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('.blog')
        .should('contain', blog.title)
        .and('contain', blog.author);

      cy.get('.blog').find('button').click();

      cy.get('.blog')
        .should('contain',blog.url)
        .and('contain','likes 0');
    })

    it('user can like a blog', function(){
      const LIKE_COUNT = 2;
      cy.createBlog(blog);
      cy.visit('');

      cy.get('.blog').find('button').click();
      for (let i = 1; i <= LIKE_COUNT; i++) {
        cy.get('.blog').find('button').contains('like').click();
        cy.get('.blog').should('contain',`likes ${i}`);
      }

    })
  })

})