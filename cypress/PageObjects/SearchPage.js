export class SearchPage {
  constructor() {
    // generate buttons
    for (let i = 0; i < 10; i++) {
      this[`button${i}`] = {
        locator: `div[role="button"]:contains("${i}")`,
        text: `${i}`,
      };
    }
  }
  searchInput = {
    locator: 'textarea[name="q"]',
  };
  Calculator = {
    locator: 'div[data-async-context="query:calculator"]',
  };
  results = {
    locator: 'span#id="cwos"', //div[jsname="a1lrmb"] span#cwos
  };
  acButton = {
    locator: 'div[aria-label="all clear"]',
    text: "AC",
  };
  ceButton = {
    locator: 'div[aria-label="clear entry"]',
    text: "CE",
  };
  divideButton = {
    locator: 'div[aria-label="divide"]',
    text: "÷",
  };
  multiplyButton = {
    locator: 'div[aria-label="multiply"]',
    text: "×",
  };
  minusButton = {
    locator: 'div[aria-label="minus"]',
    text: "−",
  };
  plusButton = {
    locator: 'div[aria-label="plus"]',
    text: "+",
  };
  pointButton = {
    locator: 'div[aria-label="point"]',
    text: ".",
  };
  equalsButton = {
    locator: 'div[aria-label="equals"]',
    text: "=",
  };
}
