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

    if (isSpecial) return;

    if (display.value === '0') {
        display.value = button.value;
    } else {
        display.value += button.value;
    }
});