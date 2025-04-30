import { SearchPage } from "../PageObjects/SearchPageAlternative2.js";
import TestData from "../fixtures/TestData.json";
// import TestData from "../fixtures/TestDataOne.json"; // DEBUG
const currentPage = new SearchPage();
beforeEach(() => {
  const url = currentPage.url; //Cypress.env("baseUrl"); // DEBUG OR CHANGE TO CONFIG
  cy.visit(url);
});

context("2.	Functional Tests", () => {
  // Iterate through all sets in TestData
  for (let n = 0; n < TestData.length; n++) {
    const operation = TestData[n].operation;
    const dataValues = TestData[n].dataValues;
    describe(`2.${n + 1} Verify operation "${operation}" of ${dataValues} values.`, () => {
      // Iterate through all test cases in the test set
      const testCases = TestData[n].testCases;
      for (let test = 0; test < testCases.length; test++) {
        // Get the args from the test set
        const args = testCases[test].args;
        const expectedResult = testCases[test].result;
        it.only(`2.${n + 1}.${test + 1} Validate correct results "${operation}" of ${dataValues} values.`, () => {
          cy.log("testCases[test].args: ", testCases[test].args); // DEBUG

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
              cy.log("numKeys: ", numKeys); // DEBUG
              for (let j = 0; j < numKeys.length; j++) {
                cy.log("numKeys[j]: ", numKeys[j]); // DEBUG
                buttonLocator = currentPage.getButton(numKeys[j]);
                // Click the number/decimal button
                cy.get(buttonLocator).first().click();
              }
            }
            cy.get(currentPage.results.locator).scrollIntoView();
          }
          // Click the "equal" button
          cy.get(currentPage.button_calculate.locator).click();
          cy.get(currentPage.results.locator)
            .scrollIntoView()
            .invoke("val")
            .then((actualResult) => {
              // Get the result from the display
              cy.log("-------- expectedResult:", expectedResult, " actualResult: ", actualResult); // DEBUG
              // Check if the result is correct
              expect(expectedResult, "Confirmed result is valid").to.equal(actualResult);
            });
        });
      }
    });
  }
});
