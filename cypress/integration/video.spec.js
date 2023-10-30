describe("A video", () => {
  it("loads VideoJS", () => {
    cy.visit(
      "/#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fzz002hdsj2%2Fmanifest"
    );

    // Shows track title
    cy.get(".vjs-poster").should("be.visible");
    cy.get(".vjs-poster img")
      .should("exist")
      .should(
        "have.attr",
        "src",
        "https://static.library.ucla.edu/video_icon.svg"
      );
    cy.get(".vjs-big-play-button").should("exist").should("exist");
  });
});
