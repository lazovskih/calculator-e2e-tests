export class CalculatorPage {
  constructor() {
    // Generate number buttons dynamically as object properties
    for (let i = 0; i < this.buttons.length; i += 2) {
      this[`button_${this.buttons[i]}`] = {
        name: this.buttons[i],
        locator: `input[name="${this.buttons[i]}"]`,
        value: this.buttons[i + 1],
      };
    }
  }
  /**
   * Returns the locator for a button based on its name or value.
   * @param {string} arg - The name or value of the button to get the locator for.
   * @returns {string} - The locator string for the button.
   */
  getButton(arg) {
    if (isNaN(Number(arg))) {
      // Handle negative button
      arg = arg == "!" ? "+/-" : arg;
    }
    return Object.values(this).find((prop) => prop.value === arg)?.locator;
  }
  /**
   * @param {string} buttons - string with button values
   * @returns undefined
   */
  clickButtons(buttons) {
    const buttonsArr = buttons.split("");
    for (let i = 0; i < buttonsArr.length; i++) {
      const buttonLocator = this.getButton(buttonsArr[i]);
      // Click the button
      cy.get(buttonLocator).first().click();
    }
  }
  buttons = [ "zero", "0", "one", "1", "two", "2", "three", "3", "four", "4", "five", "5",
    "six", "6", "seven", "7", "eight", "8", "nine", "9", "decimal", ".", "add", "+", "subtract", "−",
    "multiply", "×", "divide", "÷", "calculate", "=", "clearButton", "AC", "negateButton", "+/-" ];

  results = {
    locator: "input[name='display']",
    value: " ",
  };
}
