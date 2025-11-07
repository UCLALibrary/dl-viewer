describe('A manuscript', () => {
  const URL_PARAMETERS =
    '#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fzz0009gx6g%2Fmanifest'

  it('loads Universal Viewer in an iframe', () => {
    cy.visit('/' + URL_PARAMETERS)

    // UV loads inside an iframe
    cy.frameLoaded('#universalviewer-iframe', {
      url: '/uv.html' + URL_PARAMETERS,
    })
  })

  it('loads in Universal Viewer!', () => {
    cy.visit('/uv.html' + URL_PARAMETERS)

    // Using UV 4.0.21
    cy.get('button.settings').click()
    cy.contains('.version', 'v4.0.21').should('exist').should('be.visible')
    cy.get('.overlay.settings button.close').click()

    // Shows title
    cy.contains('.title', 'Manuscript No. 1: Gladzor Gospels').should('exist').should('be.visible')

    // Settings Button
    cy.get('button.settings').should('exist').should('be.visible')

    // left panel
    // is visible, first page selected
    cy.get('.leftPanel')
      .should('exist')
      .should('be.visible')
      .get('#thumb-0 > .thumb')
      .should('have.class', 'selected')
    // navigate to 3rd page by clicking thumbnail
    cy.get('#thumb-2 > .thumb')
      .should('not.have.class', 'selected')
      .get('#thumb-2 img')
      .click()
      .get('#thumb-0 > .thumb')
      .should('not.have.class', 'selected')
      .get('#thumb-1 > .thumb')
      .should('have.class', 'selected')
      .get('#thumb-2 > .thumb')
      .should('have.class', 'selected')
    // navigate to 4th page by clicking thumbnail
    cy.get('#thumb-3 > .thumb')
      .should('not.have.class', 'selected')
      .contains('[Gladzor Gospels: page 2]')
      .click()
      .get('#thumb-2 > .thumb')
      .should('not.have.class', 'selected')
      .get('#thumb-3 > .thumb')
      .should('have.class', 'selected')
      .get('#thumb-4 > .thumb')
      .should('have.class', 'selected')
    // collapse left panel
    cy.get('.expandFullButton')
      .should('exist')
      .should('not.be.visible')
      .get('.collapseButton')
      .should('exist')
      .should('be.visible')
      .click()
      .get('.leftPanel > .main')
      .should('exist')
      .should('not.be.visible')

    // "Print" is disabled
    cy.contains('Print').should('exist').should('not.be.visible')

    // "Share" is disabled
    cy.contains('Share').should('exist').should('not.be.visible')

    // Fullscreen button
    cy.contains('Full Screen').should('exist').should('be.visible')

    // Download button
    cy.contains('Download').should('exist').should('be.visible')
  })
})
