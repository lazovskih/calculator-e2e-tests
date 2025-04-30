import { SearchPage } from "../PageObjects/SearchPageAlternative2.js";
const currentPage = new SearchPage();
beforeEach(() => {
  const url = currentPage.url; //Cypress.env("baseUrl");
  cy.visit(url);
  // cy.log("-------- currenPage", JSON.stringify(currentPage));
});
context("2.	Functional Tests", () => {
  describe("2.1. Addition (Summary) Tests", () => {
    it.only("Validate correct results for sum of integers and decimal values.", () => {
      cy.fixture("additionTestData.json").then((dataSet)=>{
        cy.log("-------- dataSet", dataSet);
        for (let i = 0; i < dataSet.length; i++) {
          const set = dataSet[i];
          cy.log("-------- set", JSON.stringify(set));
        }
      })
    });
  });
  // it("Validate correct results for a range of addition operations involving integers and decimal values")
});
