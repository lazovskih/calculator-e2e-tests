export class SearchPage {
  constructor() {
    // generate number buttons
    for (let i = 0; i < this.suffixes.length; i += 2) {
      this[`button${this.suffixes[i]}`] = {
        locator: `input[name="${this.suffixes[i]}"]`,
        value: this.suffixes[i + 1],
      };
    }
  }
  url = "https://www.theonlinecalculator.com/";
  //   suffixes = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero"];
  suffixes = [
    "one",
    "1",
    "two",
    "2",
    "three",
    "3",
    "four",
    "4",
    "five",
    "5",
    "six",
    "6",
    "seven",
    "7",
    "eight",
    "8",
    "nine",
    "9",
    "zero",
    "0",
    "decimal",
    ".",
    "add",
    "+",
    "subtract",
    "−",
    "multiply",
    "×",
    "divide",
    "÷",
    "calculate",
    "=",
    "clearButton",
    "AC",
  ];

  // Calculator = {
  //   locator: "div#main",
  // };
  results = {
    locator: "input[name='display']",
    value: " ",
  };
  //   acButton = {
  //     locator: 'button[name="clearButton"]',
  //     value: "AC",
  //   };
  //   ceButton = {
  //     locator: 'button[name="clear_display"]',
  //     value: "CE",
  //   };
  //   divideButton = {
  //     locator: 'button[name="divide"]',
  //     value: "÷",
  //   };
  //   multiplyButton = {
  //     locator: 'button[name="multiply"]',
  //     value: "×",
  //   };
  //   minusButton = {
  //     locator: 'button[name="minus"]',
  //     value: "−",
  //   };
  //   plusButton = {
  //     locator: 'button[name="add"]',
  //     value: "+",
  //   };
  //   pointButton = {
  //     locator: 'button[name="decimal"]',
  //     value: ".",
  //   };
  //   equalsButton = {
  //     locator: 'button[name="equal"]',
  //     value: "=",
  //   };
}
