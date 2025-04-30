export class SearchPage {
  constructor() {
    // generate number buttons
    for (let i = 0; i < 10; i++) {
      this[`button${i}`] = {
        locator: `'button[name="cs_${this.suffixes[i]}")`,
        text: `${i}`,
      };
    }
  }
  url = "https://www.calculatorsoup.com/calculators/math/basic.php";
  suffixes = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero"];
  //,'decimal','add','subtract','multiply','divide','equal','clear_display'];

  Calculator = {
    locator: 'form[name="cs_calculator_form"]',
  };
  results = {
    locator: 'input[name="cs_display"]',
  };
  acButton = {
    locator: 'button[name="cs_clear_display"]',
    text: "AC",
  };
  ceButton = {
    locator: 'button[name="cs_clear_display"]',
    text: "CE",
  };
  divideButton = {
    locator: 'button[name="cs_divide"]',
    text: "÷",
  };
  multiplyButton = {
    locator: 'button[name="cs_multiply"]',
    text: "×",
  };
  minusButton = {
    locator: 'button[name="cs_minus"]',
    text: "−",
  };
  plusButton = {
    locator: 'button[name="cs_add"]',
    text: "+",
  };
  pointButton = {
    locator: 'button[name="cs_decimal"]',
    text: ".",
  };
  equalsButton = {
    locator: 'button[name="cs_equal"]',
    text: "=",
  };
}
