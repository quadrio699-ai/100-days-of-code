let currentOperand = '0';
let previousOperand = '';
let operation = undefined;
let shouldResetScreen = false;

const currentOperandEl = document.getElementById('current-operand');
const previousOperandEl = document.getElementById('previous-operand');
const buttonsContainer = document.querySelector('.buttons');

buttonsContainer.addEventListener('click', (e) => {
  const button = e.target.closest('button');
  if (!button) return;

  if ('number' in button.dataset) {
    appendNumber(button.textContent);
  } else if (button.dataset.action === 'operator') {
    chooseOperator(button.dataset.operator);
  } else if (button.dataset.action === 'equals') {
    calculate();
  } else if (button.dataset.action === 'clear') {
    clearAll();
  } else if (button.dataset.action === 'delete') {
    deleteLast();
  }

  updateDisplay();
});

function appendNumber(number) {
  if (number === '.' && currentOperand.includes('.')) return;
  if (shouldResetScreen) {
    currentOperand = '';
    shouldResetScreen = false;
  }
  currentOperand = currentOperand === '0' && number !== '.'
    ? number
    : currentOperand + number;
}

function chooseOperator(op) {
  if (currentOperand === '') return;
  if (previousOperand !== '') calculate();

  operation = op;
  previousOperand = currentOperand;
  shouldResetScreen = true;
}

function calculate() {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  let result;
  switch (operation) {
    case '+': result = prev + current; break;
    case '-': result = prev - current; break;
    case '*': result = prev * current; break;
    case '/': result = current === 0 ? 'Error' : prev / current; break;
    default: return;
  }

  currentOperand = result.toString();
  operation = undefined;
  previousOperand = '';
  shouldResetScreen = true;
}

function clearAll() {
  currentOperand = '0';
  previousOperand = '';
  operation = undefined;
}

function deleteLast() {
  currentOperand = currentOperand.slice(0, -1);
  if (currentOperand === '') currentOperand = '0';
}

function updateDisplay() {
  currentOperandEl.textContent = currentOperand;
  previousOperandEl.textContent = operation
    ? `${previousOperand} ${operation}`
    : '';
}