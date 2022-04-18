describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'testUser1',
      name: 'John Doe',
      password: 'secret'
    }
    
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('log in page displayed by default', function() {
    cy.contains('Log in to application')
    cy.contains('username:')
    cy.contains('password:')
  })

  it('user can login', function() {
    cy.get('#username').type('testUser1')
    cy.get('#password').type('secret')
    cy.get('#login-button').click()
    cy.get('html')
      .should('contain', 'testUser1 logged in')
  })

  it('login fails with wrong password', function() {
    cy.get('#username').type('testUser1')
    cy.get('#password').type('wrongpw')
    cy.get('#login-button').click()
    cy.get('.notify')
      .should('contain', 'incorrect username or password')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    
    cy.get('html').should('not.contain', 'testUser1 logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testUser1')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Dealbook')
      cy.get('#author').type('Andrew Ross Sorkin')
      cy.get('#url').type('https://www.nytimes.com/section/business/dealbook')
      cy.get('#create-button').click()
      cy.contains('new blog successfully saved!')
    })

    describe('an existing blog can be modified', function() {
      beforeEach(function() {
        cy.contains('new blog').click()
        cy.get('#title').type('AllThingsD')
        cy.get('#author').type('Kara Swisher')
        cy.get('#url').type('https://www.wsj.com/allthingsd')
        cy.get('#create-button').click()
      })

      it('details can be viewed', function() {
        cy.get('#AllThingsD')
          .contains('view')
          .click()
      })

      it('blog can be liked', function() {
        cy.get('#AllThingsD')
          .contains('view')
          .click()
        
        cy.get('#AllThingsD')
          .contains('like')
          .click()

        cy.get('#AllThingsD')
          .contains('1')
      })

      it('blog can be deleted', function() {
        cy.get('#AllThingsD')
          .contains('view')
          .click()
        
        cy.get('#AllThingsD')
          .contains('delete')
          .click()

        cy.get('html').should('not.contain', 'AllThingsD')
      })
    })
  })
})