export class SearchPage {
  constructor() {
    // generate number buttons
    for (let i = 0; i < this.buttons.length; i += 2) {
      this[`button_${this.buttons[i]}`] = {
        locator: `input[name="${this.buttons[i]}"]`,
        value: this.buttons[i + 1],
      };
    }
  }
  url = "https://www.theonlinecalculator.com/";
  //   buttons = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "zero"];
  buttons = [
    "zero",
    "0",
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

  results = {
    locator: "input[name='display']",
    value: " ",
  };
}
