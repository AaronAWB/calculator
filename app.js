let currentOperand = '0';
let previousOperand = '';
let currentOperator = '';
let previousOperator = '';
let currentTotal = '';
let totalIsDisplayed = false;
let isContinuousFunction = false;
let memory = '';

const primaryDisplay = document.querySelector('.primary-display');
const secondaryDisplay = document.querySelector('.secondary-display');

const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');

const decimalButton = document.querySelector('.decimal-button');
const allClearButton = document.querySelector('.all-clear-button');
const backSpaceButton = document.querySelector('.backspace-button');
const equalsButton = document.querySelector('.equals-button');

const memoryAddButton = document.querySelector(".memory-add-button");
const memorySubtractButton = document.querySelector(".memory-remove-button");
const memoryRecallButton = document.querySelector(".memory-recall-button");
const memoryClearButton = document.querySelector(".memory-clear-button");

numberButtons.forEach(function(button){
    button.addEventListener('click', function(){
        inputNumber(button.innerText);
    })
})

operatorButtons.forEach(function(button){
    button.addEventListener('click', function(){
        inputOperator(button.innerText);
    })
})

decimalButton.addEventListener('click', inputDecimal);
allClearButton.addEventListener('click', allClear);
backSpaceButton.addEventListener('click', backSpace);

memoryAddButton.addEventListener('click', addToMemory);
memorySubtractButton.addEventListener('click', subtractFromMemory);
memoryRecallButton.addEventListener('click', recallMemory)
memoryClearButton.addEventListener('click', clearMemory)


function updatePrimaryDisplay() {
    primaryDisplay.innerText = currentOperand;
    if (currentOperand.length > 10) {
        currentOperand = currentOperand.substring (0, 11);
    }
}

updatePrimaryDisplay();

function inputNumber(number) {
    if (!currentOperator) {
        currentOperand === '0' ? currentOperand = number.toString() : currentOperand += number.toString();
    } else {
        currentOperand += number.toString();
    }
    updatePrimaryDisplay();
}

function inputOperator(selectedOperator) {
    currentOperator = selectedOperator;
    previousOperand = currentOperand;
    totalIsDisplayed = false;
    updateSecondaryDisplay();
    updateCurrentTotal();
    if (currentOperator) {
        previousOperator = currentOperator;
        isContinuousFunction = true;
    }
    updatePrimaryDisplay();
}

function inputDecimal() {
    if (!currentOperand.includes('.') && !totalIsDisplayed) {
        currentOperand += "."
        updatePrimaryDisplay();
    }
}

function updateSecondaryDisplay() {
    if (!isContinuousFunction) {
        secondaryDisplay.innerText = previousOperand + " " + currentOperator;
        clearCurrentOperand();
    } else {
        secondaryDisplay.innerText += " " + currentOperand + " " + currentOperator;
        clearCurrentOperand();
    }
}

function clearSecondaryDisplay() {
    secondaryDisplay.innerText = '';
}

function clearCurrentOperand() {
    currentOperand = '';
    updatePrimaryDisplay();
}

function clearPreviousOperand() {
    previousOperand = '';
}

function updateCurrentTotal() {
    if (!isContinuousFunction && !totalIsDisplayed) {
        currentTotal = previousOperand;
    } else if (!isContinuousFunction && totalIsDisplayed) {
        currentTotal = formatNumber(performCalculation(currentTotal, currentOperand, currentOperator));
    } else {
        currentTotal = formatNumber(performCalculation(currentTotal, previousOperand, previousOperator));
    }
}  

function displayResult() {
    currentOperand = currentTotal;
    updatePrimaryDisplay();
}

equalsButton.addEventListener('click', equals)

function equals() {
    if (currentOperator && currentOperand != '') {
        totalIsDisplayed = true;
        isContinuousFunction = false;
        updateCurrentTotal();
        updatePrimaryDisplay();
        clearSecondaryDisplay();
        clearOperators();
        displayResult();
       }
}
  
function performCalculation(number1, number2, operator) {
    let result = '';
    switch (operator) {
        case '/':
            result = number1 / number2;
            break;
        case '*':
            result = number1 * number2;
            break;
        case '+':
            result = parseInt(number1) + parseInt(number2);
            break;
        case '-':
            result = number1 - number2;
            break;
        }
    return result.toString();
}

function formatNumber(number) {
    let formattedNumber = number;
    if (number.includes('.')) formattedNumber = Math.round(number * 1000) / 1000;
    return formattedNumber.toString();
}

function clearOperators() {
    currentOperator = '';
    previousOperator = '';
}

function allClear() {
    currentOperand = '0'
    previousOperand = '';
    currentTotal = '';
    totalIsDisplayed = false;
    isContinuousFunction = false;
    updatePrimaryDisplay();
    clearSecondaryDisplay();
    clearOperators();
}

function backSpace() {
    if (!totalIsDisplayed) {
        currentOperand = currentOperand.slice(0,-1);
        updatePrimaryDisplay();
    }
}

function updateMemoryDisplay() {
    const memoryDisplay = document.querySelector(".memory-display");
    memory === '' ? memoryDisplay.innerText = '' : memoryDisplay.innerText = `Memory: ${memory}`;
}

function addToMemory() {
    memory = currentOperand;
    updateMemoryDisplay();
}

function subtractFromMemory() {
    memory = memory - currentOperand;
    updateMemoryDisplay();
}

function recallMemory() {
    currentOperand = memory;
    updatePrimaryDisplay();
}

function clearMemory() {
    memory = '';
    updateMemoryDisplay();
}