describe('A manuscript', () => {
  const URL_PARAMETERS =
    '#?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fcollections%2Fark%253A%252F21198%252Fz14q9t15'

  it('loads in Universal Viewer!', () => {
    cy.visit('/' + URL_PARAMETERS)

    // Shows title
    cy.contains('.title', 'No. 01').should('exist').should('be.visible')

    // Settings Button
    cy.get('button.settings').should('exist').should('be.visible')

    // left panel
    // is visible, in tree view
    cy.get('.leftPanel').should('exist').should('be.visible')
    cy.get('.leftPanel .treeView').should('exist').should('be.visible')
    cy.get('.leftPanel .treeView').contains('a', 'No. 01').should('have.class', 'selected')

    // Choose a different issue from tree view
    cy.get('.leftPanel .treeView').contains('a', 'No. 17').click()
    cy.contains('.title', 'No. 17').should('exist').should('be.visible')
    cy.contains('.title', 'No. 01').should('not.exist')
    cy.get('.leftPanel .treeView').contains('a', 'No. 17').should('have.class', 'selected')

    // Go to thumbnail view
    cy.get('.leftPanel').contains('a', 'Thumbnails').click()

    cy.get('#thumb-0 > .thumb').should('have.class', 'selected')
    // navigate to 3rd page by clicking thumbnail
    cy.get('#thumb-2 > .thumb').should('not.have.class', 'selected')
    cy.get('#thumb-2 img').click()
    cy.get('#thumb-0 > .thumb')
      .should('not.have.class', 'selected')
      .get('#thumb-1 > .thumb')
      .should('have.class', 'selected')
      .get('#thumb-2 > .thumb')
      .should('have.class', 'selected')
    // navigate to 4th page by clicking thumbnail
    cy.get('#thumb-3 > .thumb').should('not.have.class', 'selected').contains('Page 4').click()
    cy.get('#thumb-2 > .thumb')
      .should('not.have.class', 'selected')
      .get('#thumb-3 > .thumb')
      .should('have.class', 'selected')
      .get('#thumb-4 > .thumb')
      .should('have.class', 'selected')
    // collapse left panel
    cy.get('.expandFullButton').should('exist').should('not.be.visible')
    cy.get('.collapseButton').should('exist').should('be.visible').click()
    cy.get('.leftPanel > .main').should('exist').should('not.be.visible')

    // "Print" is disabled
    cy.contains('Print').should('exist').should('not.be.visible')

    // "Share" is disabled
    cy.contains('Share').should('exist').should('not.be.visible')

    // Fullscreen button
    cy.contains('Full Screen').should('exist').should('be.visible')

    // Download button
    cy.contains('Download').should('exist').should('be.visible')
  })
})
