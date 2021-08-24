describe('A simple image', () => {
  it('loads in Universal Viewer!', () => {
    cy.visit('/#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fzz00090p17%2Fmanifest')

    // Shows title
    cy.contains('div.title', "1985 - The California Poppy").should("exist").should("be.visible")

    // Settings Button
    cy.contains("button", "Settings").should("exist").should("be.visible")

    // left panel is disabled
    cy.get(".leftPanel").should("exist").should("not.be.visible")

    // "Print" is disabled
    cy.contains("Print").should("exist").should("not.be.visible")

    // "Share" is disabled
    cy.contains("Share").should("exist").should("not.be.visible")

    // Enter / exit fullcreen view
    cy.contains("Full Screen").should("exist").should("be.visible")

    // Download button enabled
    cy.contains('Download').should("exist").should("be.visible")
  })
})
