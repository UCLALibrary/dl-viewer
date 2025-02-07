describe("A static image", () => {
  const URL_PARAMETERS =
    "?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F13030%252Fm5rc4g26%2Fmanifest"
  it("uses an image tag", () => {
    cy.visit("/" + URL_PARAMETERS)

    // UV loads inside an iframe
    cy.get("img")
      .should(
        "have.attr",
        "src",
        "https://d7rm5xoig729r.cloudfront.net/collectiveaccess/images/7/3/70105_ca_object_representations_media_7324_original.jpg"
      )
      .should("exist")
      .should("be.visible")
  })
})
