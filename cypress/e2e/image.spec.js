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

    // "Share" is hidden. NB this is done with CSS in UniversalViewer.vue, not config —
    // footerPanel.options.shareEnabled is ignored from UV 4.1/4.2 onward.
    cy.get('button.share').should('exist').should('not.be.visible')

    // Enter / exit fullcreen view
    cy.contains('Full Screen').should('exist').should('be.visible')

    // Download button enabled
    cy.contains('Download').should('exist').should('be.visible')

    // No right panel
    cy.get('.rightPanel').should('not.be.visible')
  })
})
