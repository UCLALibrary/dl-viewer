describe('A IIIF Collection', () => {
  const URL_PARAMETERS =
    '#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fcollections%2Fark%253A%252F21198%252Fz11c574k'

  it('loads in Universal Viewer!', () => {
    cy.visit('/' + URL_PARAMETERS)
  })
})
