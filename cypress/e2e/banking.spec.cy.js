describe('Banking Project', () => {
  it('Logs in as customer "Harry Potter"', () => {
    // Open the page
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');

    // Find and click the "Customer Login" button
    cy.contains('button', 'Customer Login').click();

    // Find and select the customer "Harry Potter" from the dropdown
    cy.get('#userSelect').select('Harry Potter');

    // Find and click the "Login" button
    cy.contains('button', 'Login').click();

    // Assert that the user is logged in by verifying the presence of the greeting message
    cy.contains('span.fontBig.ng-binding', 'Harry Potter').should('be.visible');

    deposit(100);
    deposit(10);
    deposit(5);

    cy.get('div.center strong.ng-binding:nth-child(2)').should('have.text',"115");
    cy.wait(2000)
    cy.get('button[ng-class="btnClass1"]').click();
    cy.get('tbody').should('be.visible');

    let sum = 0;

    cy.get('tbody tr td:nth-child(2)').each(($element) => {
      const number = parseInt($element.text().trim(), 10);
      if (!isNaN(number)) {
        sum += number;
      }
    }).then(()=>{
      expect(sum).to.be.eq(115)
    });
  });
});

function deposit(value){
  cy.get('button[ng-class="btnClass2"]').click();

  cy.get('input[placeholder="amount"]').type(value);

  cy.get('button[type="submit"]').click();

  cy.get('span.error').should('contain',"Deposit Successful")

}