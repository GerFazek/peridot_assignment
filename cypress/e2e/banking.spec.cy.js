const moment = require('moment');

describe('Banking Project', () => {
  it('Logs in as customer "Harry Potter"', () => {
    cy.visit('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login');

    cy.contains('button', 'Customer Login').click();

    cy.get('#userSelect').select('Harry Potter');

    cy.contains('button', 'Login').click();

    cy.contains('span.fontBig.ng-binding', 'Harry Potter').should('be.visible');

    cy.get('option[selected="selected"]').invoke('prop', 'value').then(value => {
      let accountNumber = value.split('number:')[1];
      return accountNumber;
    }).then((accountNumber) => {
      deposit(100, accountNumber);
      deposit(10, accountNumber);
      deposit(5, accountNumber);
    });

    cy.get('div.center strong.ng-binding:nth-child(2)').should('have.text', "115");
    cy.wait(2000);
    cy.get('button[ng-class="btnClass1"]').click();
    cy.get('tbody').should('be.visible');

    let sum = 0;

    cy.get('tbody tr td:nth-child(2)').each(($element) => {
      const number = parseInt($element.text().trim(), 10);
      if (!isNaN(number)) {
        sum += number;
      }
    }).then(() => {
      expect(sum).to.be.eq(115);
    });
  });
});

function deposit(value, accountNumber) {
  cy.get('button[ng-class="btnClass2"]').click();

  cy.get('input[placeholder="amount"]').type(value);

  cy.get('button[type="submit"]').click();

  cy.get('span.error').should('contain', "Deposit Successful");

  checkLocalStorageForValue(value, accountNumber);
}

function checkLocalStorageForValue(value, accountNumber) {
  cy.window().then((win) => {
    const localStorageValue = win.localStorage.getItem('Transaction');

    const parsedValue = JSON.parse(localStorageValue);

    const dateToFind = new Date();
    const valueDate = moment(dateToFind);

    const keyToFind = accountNumber;

    const valueToFind = {
      date: valueDate.format('DD-MM-YYYY'),
      amount: value
    };

    const result = findObject(parsedValue, keyToFind, valueToFind);
    if (result === null) {
      throw new Error('Object not found.');
    }
  });
}

function findObject(json, key, value) {
  if (typeof json !== 'object' || json === null) {
    return null;
  }

  for (const k in json) {
    if (k == key && Array.isArray(json[k])) {
      for (const obj of json[k]) {
        const objDate = moment(obj.date);
        const objFormattedDate = objDate.format('DD-MM-YYYY');
        if (objFormattedDate === value.date && obj.amount === value.amount) {
          return obj;
        }
      }
    }

    const result = findObject(json[k], key, value);
    if (result !== null) {
      return result;
    }
  }

  return null;
}
