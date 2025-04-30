import { SearchPage } from "../PageObjects/SearchPageAlternative2.js";
const currentPage = new SearchPage();
beforeEach(() => {
  const url = currentPage.url; //Cypress.env("baseUrl");
  cy.visit(url);
  // cy.log("-------- currenPage", JSON.stringify(currentPage));
});
context("1. Initialization and UI Tests", () => {
// describe("1. Initialization and UI Tests", () => {
  it("1.1 Validate the default state of the calculator upon load.", () => {
    for (const key in currentPage) {
      if (currentPage.hasOwnProperty(key) && currentPage[key].locator) {
        cy.log(`Verified element is present: |${key}|`);
        // first() is used to select 0 button that has same locator as R2
        cy.get(currentPage[key].locator).first().should("be.visible").and("have.value", currentPage[key].value);
      }
    }
  });

  it("1.2 Validate that pressing numbers buttons updates the display as expected", () => {
    for (const key in currentPage) {
      if (currentPage.hasOwnProperty(key) && Number(currentPage[key].value)) {
        cy.log(`Verified display: ${key} shows value ${currentPage[key].value}`);
        cy.get(currentPage[key].locator).first().click();
        
        // Check if the display shows the correct value
        cy.get(currentPage.results.locator).should("have.value", currentPage[key].value); 
        
        // Clear the display after each button press
        cy.get(currentPage.button_clearButton.locator).click(); 
        
        // Check if the display is cleared
        cy.get(currentPage.results.locator).should("have.value", ""); 
      }
    }
  });

  it("1.3 Validate the calculator prevents entering more than one decimal point.", () => {
    let currentValue = "";
    let round = 0;
    for (const key in currentPage) {
      if (currentPage.hasOwnProperty(key) && key.includes("button") && !isNaN(currentPage[key].value)) {
        round++;
        cy.get(currentPage[key].locator).first().click();
        cy.get(currentPage.button_decimal.locator).first().click(); // Click the decimal button
        
        // Append dot to the current value if it is first time. If not, append the value without dot.
        if (round == 1) {
          currentValue += currentPage[key].value + ".";
        } else {
          currentValue += currentPage[key].value;
        }

        cy.log(`Verified display: ${key} shows value ${currentValue}`);
        
        // Check if the display shows the correct value
        cy.get(currentPage.results.locator).should("have.value", currentValue); 
      }
    }
  });
  it.only("1.4 Validate how the calculator handles leading zeros.", () => {
        cy.log(`Verified display: ${key} shows value ${currentPage[key].value}`);
        const testValue = '00007.001';
        const numKeys = testValue.split("");
        cy.log("numKeys: ", numKeys); // DEBUG
        for (let j = 0; j < numKeys.length; j++) {
          cy.log("numKeys[j]: ", numKeys[j]); // DEBUG
          buttonLocator = currentPage.getButton(numKeys[j]);
          // Click the number/decimal button
          cy.get(buttonLocator).first().click();
        }
        
        // Check if the display shows the correct value
        cy.get(currentPage.results.locator).should("have.value", "7.001"); 
  });
  it("1.5 Check that pressing “CE” button clears display", () => {
    let currentValue = "";
    for (const key in currentPage) {
      if (currentPage.hasOwnProperty(key) && key.includes("button") && !isNaN(currentPage[key].value)) {
        cy.get(currentPage[key].locator).first().click();
        currentValue += currentPage[key].value;
      }
      // Clear the display
      cy.get(currentPage.button_clearButton.locator).click(); 
      
      // Check if the display shows the correct value
      cy.get(currentPage.results.locator).should("have.value", ""); 
    }
  });
});
