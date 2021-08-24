describe('An audio object', () => {
    it('loads in Universal Viewer!', () => {
      cy.visit('/#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fzz002dw04s%2Fmanifest')
  
      // Shows track title
      cy.contains('div.title', "Side A").should("exist").should("be.visible")
  
      // Settings Button
      cy.contains("button", "Settings").should("exist").should("be.visible")
  
      // left panel is enabled
      cy.get(".leftPanel").should("exist").should("be.visible")
  
      // "Print" doesn't exist for audio
      cy.contains("Print").should("not.exist")
  
      // "Share" is disabled
      cy.contains("Share").should("exist").should("not.be.visible")
  
      // Enter / exit fullcreen view
      cy.contains("Full Screen").should("exist").should("be.visible")
  
      // Download is disabled
      cy.contains('Download').should("exist").should('not.be.visible')

      // Displays waveform image
      cy.get("canvas.waveform").should("exist").should("be.visible")
    })
  })
  