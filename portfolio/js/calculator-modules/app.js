import { calculate } from './perform-calculations.js';

// Calculator state object
const calculator = {
  displayValue: '0',              // Current value shown on the screen
  firstOperand: null,             // First operand in any expression
  waitingForSecondOperand: false, // Indicates if second operand input is expected
  operator: null,                 // Current operator
};

/**
 * Handles digit input and updates the display value.
 * @param {string} digit
 */
const inputDigit = (digit) => {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
};

/**
 * Handles decimal point input.
 * @param {string} dot
 */
const inputDecimal = (dot) => {
  if (calculator.waitingForSecondOperand) {
    calculator.displayValue = '0.';
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
};

/**
 * Handles arithmetic operator logic.
 * @param {string} nextOperator
 */
const handleOperator = (nextOperator) => {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
};

/**
 * Resets calculator state and display.
 */
const resetCalculator = () => {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
};

/**
 * Updates the screen with the current display value.
 */
const updateDisplay = () => {
  const display = document.querySelector('.calculator-screen');
  display.value = calculator.displayValue;
};

// Initial display
updateDisplay();

// Button event handling
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) return;

  const { classList, value } = target;

  if (classList.contains('operator')) {
    handleOperator(value);
  } else if (classList.contains('decimal')) {
    inputDecimal(value);
  } else if (classList.contains('all-clear')) {
    resetCalculator();
  } else {
    inputDigit(value);
  }

  updateDisplay();
});
