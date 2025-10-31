describe('With the `viewer=mirador` parameter set', () => {
  const URL_PARAMETERS =
    '?site=sinai&manifest=https%3A%2F%2Fsinai-images.library.ucla.edu%2Fiiif%2Fark%3A%252F21198%252Fz1ft92mh%2Fmanifest'

  it('loads in Mirador', () => {
    // http://localhost:8080/?site=sinai&manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fz18w4z1w%2Fmanifest
    cy.visit('/' + URL_PARAMETERS)

    cy.get('.mirador-viewer').should('exist').should('be.visible')

    cy.contains('CPA NF fragment 13').should('exist')

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

    cy.contains('An error occurred').should('not.exist')
  })
})
