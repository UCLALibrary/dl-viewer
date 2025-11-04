describe('A manuscript', () => {
  const URL_PARAMETERS =
    '#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fzz0009gx6g%2Fmanifest'

  it('loads in Universal Viewer!', () => {
    cy.visit('/' + URL_PARAMETERS)

    // Shows title
    cy.contains('.title', 'Manuscript No. 1: Gladzor Gospels').should('exist').should('be.visible')

    // Settings Button
    cy.get('button.settings').should('exist').should('be.visible')

    // left panel
    // is visible, first page selected
    cy.get('.leftPanel').should('exist').should('be.visible')

    cy.get('#thumb-0 > .thumb').should('have.class', 'selected')
    // navigate to 3rd page by clicking thumbnail
    cy.get('#thumb-2 > .thumb').should('not.have.class', 'selected')

    cy.get('#thumb-2 img').click()

    cy.get('#thumb-0 > .thumb').should('not.have.class', 'selected')

    cy.get('#thumb-1 > .thumb').should('have.class', 'selected')

    cy.get('#thumb-2 > .thumb').should('have.class', 'selected')
    // navigate to 4th page by clicking thumbnail
    cy.get('#thumb-3 > .thumb')
      .should('not.have.class', 'selected')
      .contains('[Gladzor Gospels: page 2]')
      .click()

    cy.get('#thumb-2 > .thumb').should('not.have.class', 'selected')

    cy.get('#thumb-3 > .thumb').should('have.class', 'selected')

    cy.get('#thumb-4 > .thumb').should('have.class', 'selected')
    // collapse left panel
    cy.get('.expandFullButton').should('exist').should('not.be.visible')

    cy.get('.collapseButton').should('exist').should('be.visible').click()

    cy.get('.leftPanel > .main').should('exist').should('not.be.visible')

    // "Print" is disabled
    cy.contains('Print').should('exist').should('not.be.visible')

    // "Share" is disabled
    cy.contains('Share').should('exist').should('not.be.visible')

    // Fullscreen button
    cy.contains('Full Screen').should('exist').should('be.visible')

    // Download button
    cy.contains('Download').should('exist').should('be.visible')
  })

  it('allows deep linking by canvas index', () => {
    cy.visit('/' + URL_PARAMETERS + '&cv=30')

    cy.get('.leftPanel #thumb-29 > .thumb')
      .should('exist')
      .should('be.visible')
      .should('have.class', 'selected')
  })
})
