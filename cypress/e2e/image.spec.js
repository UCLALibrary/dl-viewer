describe('A simple image', () => {
  const URL_PARAMETERS =
    '#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fzz00090p17%2Fmanifest'

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
    cy.contains('.title', '1985 - The California Poppy').should('exist').should('be.visible')

    // Settings Button
    cy.get('button.settings').should('exist').should('be.visible')

    // left panel is disabled
    cy.get('.leftPanel').should('exist').should('not.be.visible')

    // "Print" is disabled
    cy.contains('Print').should('exist').should('not.be.visible')

    // "Share" is disabled
    cy.contains('Share').should('exist').should('not.be.visible')

    // Enter / exit fullcreen view
    cy.contains('Full Screen').should('exist').should('be.visible')

    // Download button enabled
    cy.contains('Download').should('exist').should('be.visible')
  })
})
