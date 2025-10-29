describe('With the `site=sinai` parameter set', () => {
  const URL_PARAMETERS = `?site=sinai&manifest=${encodeURIComponent("https://iiif.library.ucla.edu/ark%3A%2F21198%2Fz18w4z1w/manifest")}`
  
  it('loads Mirador 3 in an iframe', () => {
    // http://localhost:8080/?site=sinai&manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fz18w4z1w%2Fmanifest
    cy.visit('/' + URL_PARAMETERS)
    
    cy.frameLoaded("#mirador-iframe", {
      url: '/mirador3.html' + URL_PARAMETERS,
    });
  })
  
  it('loads in Mirador 3', () => {
    // http://localhost:8080/mirador3.html?site=sinai&manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fz18w4z1w%2Fmanifest
    cy.visit('/mirador3.html' + URL_PARAMETERS)

    // Shows title
    cy.get(".mirador-viewer").should("exist").should("be.visible")
    cy.contains("h2", "Sinai, St. Catherine’s Monastery, Arabic 1").should("exist").should("be.visible")
  })
})
