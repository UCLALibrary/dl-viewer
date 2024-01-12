describe('With the `viewer=mirador` parameter set', () => {
  const URL_PARAMETERS = `?viewer=mirador&manifest=${encodeURIComponent("https://sinai-images.library.ucla.edu/iiif/ark:%2F21198%2Fz1bc4wfw/manifest")}`
  
  it('loads Mirador 2 in an iframe', () => {
    // http://localhost:8080/?viewer=mirador&manifest=https%3A%2F%2Fsinai-images.library.ucla.edu%2Fiiif%2Fark%3A%252F21198%252Fz1bc4wfw%2Fmanifest
    cy.visit('/' + URL_PARAMETERS)
    
    cy.frameLoaded("#mirador-iframe", {
      url: '/palimpsest/viewer.html' + URL_PARAMETERS,
    });
  })
  
  it('loads in Mirador2 Viewer!', () => {
    // http://localhost:8080/mirador3.html?viewer=mirador&manifest=https%3A%2F%2Fsinai-images.library.ucla.edu%2Fiiif%2Fark%3A%252F21198%252Fz1bc4wfw%2Fmanifest
    cy.visit('/palimpsest/viewer.html' + URL_PARAMETERS)

    // Shows title
    cy.contains('.window-manifest-title', "Arabic 514").should("exist").should("be.visible")
  })
})
