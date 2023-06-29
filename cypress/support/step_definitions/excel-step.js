import { Given, Then, When } from "cypress-cucumber-preprocessor/steps";
const XLSX = require('xlsx');

let workbook;
let worksheet;
let excelHeaders = [];

Given('I have an existing file with name {string}', (filename) => {
    const filePath = `./cypress/fixtures/${filename}`
    cy.readFile(filePath, 'binary').then((excelData) => {
        workbook = XLSX.read(excelData, { type: 'binary' });
    });
});

When('I extract the headers from the sheet {string}', (sheetName) => {
    worksheet = workbook.Sheets[sheetName];

    for (const cell in worksheet) {
        const row = parseInt(cell.substring(1));
        if (row === 1) { // Check if the row is 1 (assuming headers are in the first row)
            excelHeaders.push(worksheet[cell].v);
        } else if (row > 1) {
            break; // Break the loop if we have moved beyond the first row
        }
    }
});

Then('I should see the following headers in the worksheet:', (dataTable) => {
    const expectedHeaders = dataTable.raw()[0];
    expect(excelHeaders).to.deep.equal(expectedHeaders);
});

Then('the file should have more than {int} lines', (rowNumber) => {
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    const rowCount = range.e.r + 1;
    expect(rowCount).to.be.above(10);
});
