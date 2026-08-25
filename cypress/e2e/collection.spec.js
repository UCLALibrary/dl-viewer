describe('A IIIF Collection', () => {
  const URL_PARAMETERS =
    '#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fcollections%2Fark%253A%252F21198%252Fz11c574k'

  it('loads in Universal Viewer!', () => {
    cy.visit('/' + URL_PARAMETERS)

    // Collections default to the tree view (UV ships defaultToTreeIfCollection: true)
    cy.get('.leftPanel').should('exist').should('be.visible')
    cy.get('.leftPanel .treeView').should('exist').should('be.visible')

    // Settings Button
    cy.get('button.settings').should('exist').should('be.visible')

    // "Print" is disabled
    cy.contains('Print').should('exist').should('not.be.visible')

    // Enter / exit fullcreen view
    cy.contains('Full Screen').should('exist').should('be.visible')

    // Download button enabled
    cy.contains('Download').should('exist').should('be.visible')
  })
})
