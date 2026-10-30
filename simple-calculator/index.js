let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

const keys = document.querySelector('.calculator-keys');
const display = document.querySelector('.calculator-screen');

keys.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;

    const isSpecial =
        button.classList.contains('operator') ||
        button.classList.contains('decimal') ||
        button.classList.contains('all-clear') ||
        button.classList.contains('equal-sign');

    if (button.classList.contains('all-clear')) {
        // reset everything
        firstNumber = null;
        operator = null;
        waitingForSecondNumber = false;
        display.value = '0';
    }

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

    if (button.classList.contains('equal-sign')) {
    if (operator === null) return;
    const result = calculate(firstNumber, parseFloat(display.value), operator);
    display.value = result;
    firstNumber = null;
    operator = null;
    waitingForSecondNumber = true;
    return;
}

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

function calculate(first, second, operator) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return first / second;
        default:
            return second;
    }
}