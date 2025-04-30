import { CalculatorPage } from "../PageObjects/CalculatorPage.js";
const currentPage = new CalculatorPage();
beforeEach(() => {
  const url = currentPage.url; 
  cy.visit(url);
});
context("1. Initialization and UI Tests", () => {
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
        cy.get(currentPage.results.locator).scrollIntoView().should("have.value", currentPage[key].value);

        // Clear the display after each button press
        cy.get(currentPage.button_clearButton.locator).click();

        // Check if the display is cleared
        cy.get(currentPage.results.locator).scrollIntoView().should("have.value", "");
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
        cy.get(currentPage.results.locator).scrollIntoView().should("have.value", currentValue);
      }
    }
  });

  it("1.4 Validate how the calculator handles leading zeros.", () => {
    const testValue = "00007.001";
    const numKeys = testValue.split("");
    for (let j = 0; j < numKeys.length; j++) {
      const buttonLocator = currentPage.getButton(numKeys[j]);
      // Click the number/decimal button
      cy.get(buttonLocator).first().click();
    }

    // Check if the display shows the correct value
    cy.get(currentPage.results.locator).scrollIntoView().should("have.value", "7.001");
  });

  it("1.5 Verify  that pressing “CE” button clears current entry", () => {
    const testValueA = "881";
    const numKeysA = testValueA.split("");
    for (let j = 0; j < numKeysA.length; j++) {
      const buttonLocator = currentPage.getButton(numKeysA[j]);
      // Click the number/decimal button
      cy.get(buttonLocator).first().click();
    }
    cy.get(currentPage.button_add.locator).first().click();

    // Check if the display shows the correct value
    cy.get(currentPage.results.locator).scrollIntoView().should("have.value", "881");

    const testValueB = "19";
    const numKeysB = testValueB.split("");
    for (let j = 0; j < numKeysB.length; j++) {
      const buttonLocator = currentPage.getButton(numKeysB[j]);
      // Click the number/decimal button
      cy.get(buttonLocator).first().click();
    }

    // Clear the display
    cy.get(currentPage.button_clearButton.locator).click();
    const testValueC = "119";
    const numKeysC = testValueC.split("");
    for (let j = 0; j < numKeysC.length; j++) {
      const buttonLocator = currentPage.getButton(numKeysC[j]);
      // Click the number/decimal button
      cy.get(buttonLocator).first().click();
    }
    cy.get(currentPage.button_calculate.locator).first().click();
    // Check if the display shows the correct value
    cy.get(currentPage.results.locator).scrollIntoView().should("have.value", "1,000");
  });
});
