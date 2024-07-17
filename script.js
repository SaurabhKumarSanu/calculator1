document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = null;
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-num') || this.getAttribute('data-operator') || this.id;

            if (value === 'clear') {
                currentInput = '';
                previousInput = '';
                operator = null;
                display.textContent = '0';
                return;
            }

            if (value === 'equals') {
                if (operator && previousInput && currentInput) {
                    currentInput = operate(previousInput, operator, currentInput).toString();
                    display.textContent = currentInput;
                    previousInput = '';
                    operator = null;
                }
                return;
            }

            if (this.hasAttribute('data-operator')) {
                if (currentInput && previousInput && operator) {
                    previousInput = operate(previousInput, operator, currentInput).toString();
                    display.textContent = previousInput;
                } else {
                    previousInput = currentInput;
                }
                operator = value;
                currentInput = '';
            } else {
                currentInput += value;
                display.textContent = currentInput;
            }
        });
    });

    function operate(num1, operator, num2) {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return 0;
        }
    }
});