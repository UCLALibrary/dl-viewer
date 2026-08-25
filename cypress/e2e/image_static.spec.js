describe('A static image', () => {
  // A manifest with a plain image body and no IIIF service.
  const URL_PARAMETERS =
    '#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F13030%252Fm5rc4g26%2Fmanifest'

  it('loads in Universal Viewer with zoom and pan', () => {
    cy.visit('/' + URL_PARAMETERS)

    // Shows title
    cy.contains('.title', "8 March, International Women's Day").should('exist').should('be.visible')

    // Rendered by OpenSeadragon, not a bare <img>
    cy.get('.openseadragon-canvas canvas').should('exist').should('be.visible')
    cy.get('.navigator').should('exist')

    // The image loaded. UV's controls render even when it doesn't, so check the spinner.
    cy.get('.spinner').should('not.be.visible')

    // Download button enabled
    cy.contains('Download').should('exist').should('be.visible')
  })
})
