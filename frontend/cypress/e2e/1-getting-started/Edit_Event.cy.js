/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
    it('should click a button and stay on the login page', () => {
      cy.visit("localhost:3000")
    // Überprüfen Sie, ob die URL vor dem Klicken auf die Schaltfläche nicht auf "/login" endet.
   

    // Klicken Sie auf die Schaltfläche
    cy.get('.MuiButtonBase-root').click();

    // Überprüfen Sie, ob sich die URL nach dem Klicken auf die Schaltfläche auf "/login" ändert.
   

    // Fügen Sie weitere Assertions hinzu, um das erwartete Verhalten auf der Seite "/login" zu überprüfen.
  });
});

describe('Login Page', () => {
it('should fill in email and password fields', () => {
  cy.visit("localhost:3000/login")
 
  // Geben Sie "sairam@example.com" in das Email-Feld ein
  cy.get('#email').type('noah@example.com');

  // Geben Sie "1234" in das Passwort-Feld ein
  cy.get('#password').type('1234');

  // Führen Sie ggf. weitere Assertions durch, um sicherzustellen,
  // dass die Eingaben korrekt sind.
  // Zum Beispiel, um sicherzustellen, dass die eingegebenen Werte
  // tatsächlich in den Eingabefeldern stehen:
  cy.get('#email').should('have.value', 'noah@example.com');
  cy.get('#password').should('have.value', '1234');
  cy.wait(2000)
  cy.get('.MuiButtonBase-root').click();

  cy.get(".css-gflbrf > .MuiBox-root > :nth-child(1)").click();
  cy.wait(2000)
  cy.get(".MuiButton-containedSuccess").click();


  cy.get('#\\:r5\\:').type('Ruben');
  cy.get('#\\:r7\\:').type('2001-12-20');
  cy.get('#\\:r9\\:').type('Züri');
  cy.wait(2000)
  cy.get(".MuiBox-root > .MuiButtonBase-root").click();
  cy.wait(2000)
  cy.get(":nth-child(4) > .MuiPaper-root > :nth-child(6)").click();
  cy.wait(2000)
  cy.get('#\\:rb\\:').type('Noah');
  cy.get('#\\:rd\\:').type('2002-12-21');
  cy.get('#\\:rf\\:').type('Wädi');

 
  cy.get(".MuiBox-root > .MuiButtonBase-root").click();
 


});


});











