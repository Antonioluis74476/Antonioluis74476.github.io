/**
 * Performs a basic arithmetic operation on two operands.
 *
 * @param {number} firstOperand - The first number in the calculation.
 * @param {number} secondOperand - The second number in the calculation.
 * @param {string} operator - One of: '+', '-', '*', '/'.
 * @returns {number} - The result of the calculation.
 */
export function calculate(firstOperand, secondOperand, operator) {
  switch (operator) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/':
      return secondOperand !== 0 ? firstOperand / secondOperand : NaN; // Avoid divide-by-zero
    default:
      console.warn(`Unsupported operator: ${operator}`);
      return secondOperand;
  }
}