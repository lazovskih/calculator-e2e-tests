import { SearchPage } from "../PageObjects/SearchPageAlternative2.js";
const currentPage = new SearchPage();
beforeEach(() => {
  const url = currentPage.url; //Cypress.env("baseUrl");
  cy.visit(url);
  cy.log("-------- currenPage", JSON.stringify(currentPage));
});

describe("1. Initialization and UI Tests", () => {
  it.only("1.1 Verification that all UI elements are present and rendered correctly", () => {
    for (const key in currentPage) {
      if (currentPage.hasOwnProperty(key) && currentPage[key].locator) {
        cy.log(`Verifying element: |${key}|`);

        // cy.get(currentPage[key].locator).should("have.value", currentPage[key].value);

        console.log("currentPage[key].locator", currentPage[key].locator);
        cy.get(currentPage[key].locator).first().should("be.visible").and("have.value", currentPage[key].value);
      }
    }
  });

  it("1.2 Validation of the default state of the calculator upon load", () => {
    cy.get(currenPage.header).should("be.visible");
    cy.get(currenPage.footer).should("be.visible");
  });

  it("should display the sidebar", () => {
    cy.get(currenPage.sidebar).should("be.visible");
  });
});
