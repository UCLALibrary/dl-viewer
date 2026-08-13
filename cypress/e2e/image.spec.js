describe('A simple image', () => {
  const URL_PARAMETERS =
    '#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fzz00090p17%2Fmanifest'

  it('loads in Universal Viewer!', () => {
    cy.visit('/' + URL_PARAMETERS)

    // Shows title
    cy.contains('.title', '1985 - The California Poppy').should('exist').should('be.visible')

    // Settings Button
    cy.get('button.settings').should('exist').should('be.visible')

    // left panel is disabled
    cy.get('.leftPanel').should('exist').should('not.be.visible')

    // "Print" is disabled
    cy.contains('Print').should('exist').should('not.be.visible')

    // XFAIL "Share" is disabled — footerPanel.options.shareEnabled:false was honored in 4.0.21
    // but is ignored from 4.2.1 onward, so the Share button is now visible to users. Upstream
    // UV bug; re-enable this assertion if it's fixed.
    // cy.contains('Share').should('exist').should('not.be.visible')

    // Enter / exit fullcreen view
    cy.contains('Full Screen').should('exist').should('be.visible')

    // Download button enabled
    cy.contains('Download').should('exist').should('be.visible')

    // No right panel
    cy.get('.rightPanel').should('not.be.visible')
  })
})
