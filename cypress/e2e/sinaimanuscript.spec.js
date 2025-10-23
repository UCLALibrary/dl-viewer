describe('With the `site=sinai` parameter set', () => {
  const URL_PARAMETERS = `?site=sinai&manifest=${encodeURIComponent('https://iiif.library.ucla.edu/ark%3A%2F21198%2Fz18w4z1w/manifest')}`

  it('loads in Mirador', () => {
    // http://localhost:8080/?site=sinai&manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fz18w4z1w%2Fmanifest
    cy.visit('/' + URL_PARAMETERS)

    cy.contains('.mirador-viewer', 'Sinai, St. Catherine’s Monastery')
      .should('exist')
      .should('be.visible')

    // Image tools loaded
    cy.get('[aria-label="Expand image tools"]').should('exist').should('be.visible')

    // Annotations plugin loaded
    cy.get('button[aria-label="Annotations"]').should('exist').should('be.visible')

    // index panel open on load
    cy.get('.mirador-companion-area-left')
      .contains('h3', 'Index')
      .should('exist')
      .should('be.visible')

    // close window button is present
    cy.get('button[aria-label="Close window"').should('exist').should('be.visible')
  })
})
