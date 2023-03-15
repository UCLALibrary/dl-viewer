describe('An audio object', () => {
  const URL_PARAMETERS = '#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fzz002dw04s%2Fmanifest';

    it('loads Universal Viewer in an iframe', () => {
      cy.visit('/' + URL_PARAMETERS)

      // UV loads inside an iframe
      cy.frameLoaded("#universalviewer-iframe", {
        url: '/uv3.html' + URL_PARAMETERS,
      });
    })
  

    it('loads in Universal Viewer!', () => {
      cy.visit('/uv3.html' + URL_PARAMETERS)

      // Shows track title
      cy.contains("Side A").should("exist").should("be.visible")
  
      // Settings Button
      cy.get("button.settings").should("exist").should("be.visible")
  
      // left panel is enabled
      cy.get(".leftPanel").should("exist").should("be.visible")
  
      // "Print" doesn't exist for audio
      cy.contains("Print").should("not.exist")
  
      // "Share" is disabled
      cy.get("button.share").should("exist").should("not.be.visible")
  
      // Enter / exit fullcreen view
      cy.contains("Full Screen").should("exist").should("be.visible")
  
      // Download is disabled
      // cy.contains('Download').should("exist").should('not.be.visible')

      // Displays waveform image
      cy.get("canvas.waveform").should("exist").should("be.visible")
    })
  })
  