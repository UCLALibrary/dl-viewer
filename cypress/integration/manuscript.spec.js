describe('A manuscript', () => {
  it('loads in Universal Viewer!', () => {
    cy.visit('/#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fzz0009gx6g%2Fmanifest')

    // Shows title
    cy.contains('div.title', "Manuscript No. 1: Gladzor Gospels").should("exist").should("be.visible")

    // Settings Button
    cy.contains("button", "Settings").should("exist").should("be.visible")

    // left panel
    // is visible, first page selected
    cy.get(".leftPanel").should("exist").should("be.visible")
      .get("#thumb0").should("have.class", "selected")
    // navigate to 3rd page by clicking thumbnail
    cy.get("#thumb2").should("not.have.class", "selected")
      .get("#thumb2 > div.wrap.loaded > img").click()
      .get("#thumb0").should("not.have.class", "selected")
      .get("#thumb1").should("have.class", "selected")
      .get("#thumb2").should("have.class", "selected")
    // navigate to 4th page by clicking thumbnail
    cy.get("#thumb3").should("not.have.class", "selected")
      .contains("[Gladzor Gospels: page 2]").click()
      .get("#thumb2").should("not.have.class", "selected")
      .get("#thumb3").should("have.class", "selected")
      .get("#thumb4").should("have.class", "selected")
    // collapse left panel
    cy.get(".expandFullButton").should("exist").should("not.be.visible")
      .get(".collapseButton").should("exist").should("be.visible").click()
      .get(".leftPanel > .main").should("exist").should("not.be.visible")

    // "Print" is disabled
    cy.contains("Print").should("exist").should("not.be.visible")

    // "Share" is disabled
    cy.contains("Share").should("exist").should("not.be.visible")

    // Fullscreen button
    cy.contains("Full Screen").should("exist").should("be.visible")

    // Download button
    cy.contains('Download').should("exist").should("be.visible")
  })
})
