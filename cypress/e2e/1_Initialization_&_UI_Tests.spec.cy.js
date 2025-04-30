import { SearchPage } from "../PageObjects/SearchPageAlternative2.js";
const currentPage = new SearchPage();
beforeEach(() => {
  const url = currentPage.url; //Cypress.env("baseUrl");
  cy.visit(url);
  // cy.log("-------- currenPage", JSON.stringify(currentPage));
});

describe("1. Initialization and UI Tests", () => {
  it("1.1 Verification that all UI elements are present and rendered correctly", () => {
    for (const key in currentPage) {
      if (currentPage.hasOwnProperty(key) && currentPage[key].locator) {
        cy.log(`Verified element is present: |${key}|`);
        // first() is used to select 0 button that has same locator as R2
        cy.get(currentPage[key].locator).first().should("be.visible").and("have.value", currentPage[key].value);
      }
    }
  });

  it("1.2 Check that pressing numbers buttons updates the display as expected", () => {
    for (const key in currentPage) {
      if (currentPage.hasOwnProperty(key) && Number(currentPage[key].value)) {
        cy.log(`Verified display: ${key} shows value ${currentPage[key].value}`);
        cy.get(currentPage[key].locator).first().click();
        cy.get(currentPage.results.locator).should("have.value", currentPage[key].value); // Check if the display shows the correct value
        cy.get(currentPage.button_clearButton.locator).click(); // Clear the display after each button press
        cy.get(currentPage.results.locator).should("have.value", ""); // Check if the display is cleared
      }
    }
  });

  it("1.3 Check that pressing “point” button post number with only 1 ‘dot’ char in display", () => {
    let currentValue = "";
    let round = 0;
    for (const key in currentPage) {
      if (currentPage.hasOwnProperty(key) && key.includes("button") && !isNaN(currentPage[key].value)) {
        round++;
        cy.get(currentPage[key].locator).first().click();
        cy.get(currentPage.button_decimal.locator).first().click(); // Click the decimal button
        // Append dot to the current value if it is first time
        if (round == 1) {
          currentValue += currentPage[key].value + ".";
        } else {
          currentValue += currentPage[key].value;
        }

        cy.log(`Verified display: ${key} shows value ${currentValue}`);
        cy.get(currentPage.results.locator).should("have.value", currentValue); // Check if the display shows the correct value
      }
    }
  });
  it("1.4 Check that pressing “CE” button clears display", () => {
    let currentValue = "";
    for (const key in currentPage) {
      if (currentPage.hasOwnProperty(key) && key.includes("button") && !isNaN(currentPage[key].value)) {
        cy.get(currentPage[key].locator).first().click();
        currentValue += currentPage[key].value;
      }
      cy.get(currentPage.button_clearButton.locator).click(); // Clear the display
      cy.get(currentPage.results.locator).should("have.value", ""); // Check if the display shows the correct value
    }
  });
  // it("Validate correct results for a range of addition operations involving integers and decimal values")
});
