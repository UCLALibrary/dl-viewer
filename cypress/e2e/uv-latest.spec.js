describe('The latest UV', () => {
  it('loads a simple image', () => {
    cy.visit(
      '/?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fzz00090p17%2Fmanifest&viewer=uv-latest',
    )

    // Uses a newer UV
    cy.get('button.settings').click()
    cy.contains('.version', 'v4.0.21').should('not.exist')
    cy.get('.overlay.settings button.close').click()

    // Shows title
    cy.contains('.title', '1985 - The California Poppy').should('exist').should('be.visible')

    // Settings Button
    cy.get('button.settings').should('exist').should('be.visible')

    // left panel is disabled
    cy.get('.leftPanel').should('exist').should('not.be.visible')

    // "Print" is disabled
    cy.contains('Print').should('exist').should('not.be.visible')

    // XFAIL "Share" is disabled
    // cy.contains('Share').should('exist').should('not.be.visible')

    // Enter / exit fullcreen view
    cy.contains('Full Screen').should('exist').should('be.visible')

    // Download button enabled
    cy.contains('Download').should('exist').should('be.visible')

    // No right panel
    cy.get('.rightPanel').should('not.be.visible')
  })

  it('loads a static image', () => {
    cy.visit(
      '/?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F13030%252Fm5rc4g26%2Fmanifest&viewer=uv-latest',
    )

    // Uses a newer UV
    cy.get('button.settings').click()
    cy.contains('.version', 'v4.0.21').should('not.exist')
    cy.get('.overlay.settings button.close').click()

    // Shows title
    cy.contains('.title', '"8 آذار يوم المرأة العالمي"، ملصق صادر عن الاتحاد العام للمرأة الإرترية')
      .should('exist')
      .should('be.visible')

    // Settings Button
    cy.get('button.settings').should('exist').should('be.visible')

    // left panel is disabled
    cy.get('.leftPanel').should('exist').should('not.be.visible')

    // "Print" is disabled
    cy.contains('Print').should('exist').should('not.be.visible')

    // XFAIL "Share" is disabled
    // cy.contains('Share').should('exist').should('not.be.visible')

    // Enter / exit fullcreen view
    cy.contains('Full Screen').should('exist').should('be.visible')

    // Download button enabled
    cy.contains('Download').should('exist').should('be.visible')
  })

  it('loads a manuscript', () => {
    cy.visit(
      `/?manifest=https%3A%2F%2Fiiif.library.ucla.edu%2Fark%253A%252F21198%252Fzz0009gx6g%2Fmanifest&viewer=uv-latest`,
    )

    // Uses a newer UV
    cy.get('button.settings').click()
    cy.contains('.version', 'v4.0.21').should('not.exist')
    cy.get('.overlay.settings button.close').click()

    // Shows title
    cy.contains('.title', 'Manuscript No. 1: Gladzor Gospels').should('exist').should('be.visible')

    // Settings Button
    cy.get('button.settings').should('exist').should('be.visible')

    // left panel
    // is visible, first page selected
    cy.get('.leftPanel').should('exist').should('be.visible')
    cy.get('#thumb-0 > .thumb').should('have.class', 'selected')
    // navigate to 3rd page by clicking thumbnail
    cy.get('#thumb-2 > .thumb').should('not.have.class', 'selected')
    cy.get('#thumb-2 img').click()
    cy.get('#thumb-0 > .thumb').should('not.have.class', 'selected')
    cy.get('#thumb-1 > .thumb').should('have.class', 'selected')
    cy.get('#thumb-2 > .thumb').should('have.class', 'selected')
    // navigate to 4th page by clicking thumbnail
    cy.get('#thumb-3 > .thumb')
      .should('not.have.class', 'selected')
      .contains('[Gladzor Gospels: page 2]')
      .click()
    cy.get('#thumb-2 > .thumb').should('not.have.class', 'selected')
    cy.get('#thumb-3 > .thumb').should('have.class', 'selected')
    cy.get('#thumb-4 > .thumb').should('have.class', 'selected')
    // collapse left panel
    cy.get('.expandFullButton').should('exist').should('not.be.visible')
    cy.get('.leftPanel .collapseButton').should('exist').should('be.visible').click()
    // cy.get('.leftPanel > .main').should('exist').should('not.be.visible')

    // "Print" is disabled
    cy.contains('Print').should('exist').should('not.be.visible')

    // XFAIL "Share" is disabled
    // cy.contains('Share').should('exist').should('not.be.visible')

    // Fullscreen button
    cy.contains('Full Screen').should('exist').should('be.visible')

    // Download button
    cy.contains('Download').should('exist').should('be.visible')
  })
})
