let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

const keys = document.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-screen');

// add an event listener to the keys container to handle button clicks
keys.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (display.value === 'Error' && !button.classList.contains('all-clear')) return;

    // check if the button is a special button (operator, decimal, all-clear, equal-sign)
    const isSpecial =
        button.classList.contains('operator') ||
        button.classList.contains('decimal') ||
        button.classList.contains('all-clear') ||
        button.classList.contains('equal-sign');

        // for the all-clear button (AC), we need to reset everything
    if (button.classList.contains('all-clear')) {
        // reset everything
        firstNumber = null;
        operator = null;
        waitingForSecondNumber = false;
        display.value = '0';
    }

    // for the operator buttons, we need to store the first number and the operator, and set waitingForSecondNumber to true
    if (button.classList.contains('operator')) {
        if (operator && waitingForSecondNumber) {
            operator = button.value;
            return;
        }
        if (firstNumber === null) {
            firstNumber = parseFloat(display.value);
        } else if (operator) {
            const result = calculate(firstNumber, parseFloat(display.value), operator);
            display.value = result;
            firstNumber = result;
        }
        operator = button.value;
        waitingForSecondNumber = true;
    }

    // for the equal sign, we need to calculate the result and display it
    if (button.classList.contains('equal-sign')) {
    if (operator === null) return;
    const result = calculate(firstNumber, parseFloat(display.value), operator);
    display.value = result;
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;
    return;
    }

// for the decimal button, we need to add a decimal point to the display value if it doesn't already have one
    if (button.classList.contains('decimal')) {
        if (waitingForSecondNumber) {
            display.value = '0.';
            waitingForSecondNumber = false;
        } else if (!display.value.includes('.')) {
            display.value += '.';
        }
        return;
    }

    

    // for the number buttons, we need to update the display value
    if (isSpecial) return;

    if (waitingForSecondNumber) {
        display.value = button.value;
        waitingForSecondNumber = false;
    } else if (display.value === '0') {
        display.value = button.value;
    } else {
        display.value += button.value;
    }
});

// function to perform the calculation based on the operator
function calculate(first, second, operator) {
    switch (operator) {
        case '+':
            return Math.round((first + second) * 1e10) / 1e10; // to avoid floating point precision issues
        case '-':
            return Math.round((first - second) * 1e10) / 1e10; // to avoid floating point precision issues
        case '*':
            return Math.round((first * second) * 1e10) / 1e10; // to avoid floating point precision issues
        case '/':
            if (second === 0) return 'Error'; // to stop division by zero and not show infinity
            return Math.round((first / second) * 1e10) / 1e10; // to avoid floating point precision issues
        default:
            return second;
    }
}