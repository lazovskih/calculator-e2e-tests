import { CalculatorPage } from "../PageObjects/CalculatorPage.js";
import TestData from "../fixtures/TestData.json";
const currentPage = new CalculatorPage();
beforeEach(() => {
  const url = Cypress.env("baseUrl"); 
  cy.visit(url);
});

context("2.	Functional Tests", () => {
  // Iterate through all sets in TestData
  for (let n = 0; n < TestData.length; n++) {
    const operation = TestData[n].operation;
    const dataValues = TestData[n].dataValues;
    describe(`2.${n + 1} Verify "${operation}" operation with${dataValues} values.`, () => {
      // Iterate through all test cases in the test set
      const testCases = TestData[n].testCases;
      for (let test = 0; test < testCases.length; test++) {
        // Get the args from the test set
        const args = testCases[test].args;
        const expectedResult = testCases[test].result;
        it.only(`2.${n + 1}.${test + 1} Validate correct results of "${operation}" with${dataValues} values.`, () => {
          // Iterate through all args in set
          for (let i = 0; i < args.length; i++) {
            let buttonLocator;
            // Check if the value is a number or a string corresponding to a operation
            if (isNaN(Number(args[i]))) {
              buttonLocator = currentPage.getButton(args[i]);
              // Click the operation button
              cy.get(buttonLocator).first().click();
            } else {
              // If the value is a number, split it into digits and click each digit button
              const numKeys = args[i].split("");
              // Check if number is negative add negative sign at the end
              if (numKeys.includes("-")) {
                numKeys.shift();
                numKeys.push("-");
              }
              for (let j = 0; j < numKeys.length; j++) {
                buttonLocator = currentPage.getButton(numKeys[j]);
                // Click the number/decimal button
                cy.get(buttonLocator).first().click();
              }
            }
            cy.get(currentPage.results.locator).scrollIntoView();
          }
          // Click the "equal" button
          cy.get(currentPage.button_calculate.locator).click();
          // Get the result from the display
          cy.get(currentPage.results.locator)
            .scrollIntoView()
            .invoke("val")
            .then((actualResult) => {
              // Confirm actual result is equal to expected result
              expect(expectedResult, "Confirmed actual result is equal to expected result").to.equal(actualResult);
              cy.wait(1000); // Wait for 1 second before clearing the display
            });
        });
      }
    });
  }
});
