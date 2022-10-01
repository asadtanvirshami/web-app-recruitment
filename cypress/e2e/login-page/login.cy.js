
context('Navigation', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

 
  it('.type()', () => {
    cy.get('.login-input-email')
      .type('asad@gmail.com')

    cy.get('.login-input-password')
    .type('123')
  })

  it('.click()', () => {
    // https://on.cypress.io/click
    cy.get('.form-signin-btn').click()
  })
})

  
  // Prevent TypeScript from reading file as legacy script
  export {}