

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const newUser = {
      name: 'Kukka-Maaria Kalmanlehto',
      username: 'kukkis',
      password: 'kukkis'
    }
    cy.request('POST', 'http://localhost:3001/api/users', newUser)
    cy.visit('http://localhost:3000')
  })


  it('Login form is shown', function() {
    cy.contains('Login')
  })


  it('User can login', function() {
    cy.get('#username').type('kukkis')
    cy.get('#password').type('kukkis')
    cy.get('#login').click()

    cy.contains('Kukka-Maaria Kalmanlehto logged in')
  })


  it('Login fails with wrong credentials', function() {
    cy.get('#username').type('kukkis')
    cy.get('#password').type('tukkis')
    cy.get('#login').click()

    cy.contains('Login')
    cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
  })

  describe('Logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'kukkis', password:'kukkis' })
    })

    it('Logged in user can add a blog', function() {
      cy.get('#title').type('Throwing cars with rocks and what to expect')
      cy.get('#author').type('Bruce Boner')
      cy.get('#url').type('http://www.shouldNotDoIt.it/index.html')
      cy.get('form').submit()
      cy.contains('Bruce Boner')
    })

    it('Likes can be added to blogs', function() {
      cy.get('#title').type('Throwing cars with rocks and what to expect')
      cy.get('#author').type('Bruce Boner')
      cy.get('#url').type('http://www.shouldNotDoIt.it/index.html')
      cy.get('form').submit()
      cy.contains('Throwing cars with rocks and what to expect').parent().contains('view').click()
      cy.contains('Likes: 0')
      cy.get('#likeButton').click()
      cy.contains('Likes: 1')
    })

    it('User who added a blog can also remove it', function() {
      cy.addBlog({ title: 'Sikaniskan reissublogi', author: 'Justus Pynnönen', url: 'www.isku_kiville.org/index.html', likes: 1 })
      cy.visit('http://localhost:3000')
      cy.contains('Sikaniskan').should('exist')
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.contains('Sikaniskan').should('not.exist')
    })

    it('User cant remove blogs added by another user', function() {
      cy.addBlog({ title: 'Sikaniskan reissublogi', author: 'Justus Pynnönen', url: 'www.isku_kiville.org/index.html', likes: 1 })
      cy.visit('http://localhost:3000')
      cy.contains('logout').click()
      cy.loginAnother()
      cy.contains('Ares Isoviha')
      cy.contains('Sikaniskan').parent().parent().find('button').click()
      cy.contains('Sikaniskan').parent().parent().parent()
        .contains('delete').should('not.exist')
    })

    it('Blogs are resorted by likes', function() {
      cy.addBlog({ title: 'Sikaniskan reissublogi', author: 'Justus Pynnönen', url: 'www.isku_kiville.org/index.html', likes: 0 })
      cy.visit('http://localhost:3000')
      cy.addBlog({ title: 'Sekopään luontoblogi', author: 'Markku Metsäpalovaara', url: 'www.sekaisin_luonnossa.org/index.html', likes: 1 })
      cy.visit('http://localhost:3000')
      cy.get('.title').then($titles => {
        return $titles.map((index, html) => Cypress.$(html).text()).get()
      }).should('deep.eq', ['Sekopään luontoblogi', 'Sikaniskan reissublogi'])
      cy.contains('Sikaniskan').parent().parent().find('button').click()
      cy.contains('like').as('tykkääSikaniskasta')
      for(let i = 1; i < 50; i++) {
        cy.get('@tykkääSikaniskasta').click()
      }
      cy.get('.title').then($titles => {
        return $titles.map((index, html) => Cypress.$(html).text()).get()
      }).should('deep.eq', ['Sikaniskan reissublogi', 'Sekopään luontoblogi'])
    })
  })
})