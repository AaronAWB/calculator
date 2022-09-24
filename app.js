let currentOperand = '0';
let previousOperand = '';
let operator = '';
let currentContinuousFunctionTotal = '';
let totalIsDisplayed = false;
let memory = '';

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
    const primaryDisplay = document.querySelector('.primary-display');
    primaryDisplay.innerText = currentOperand;
    if (currentOperand.length > 10) {
        currentOperand = currentOperand.substring (0, 11);
    }
}

updatePrimaryDisplay();

function inputNumber(number) {
    if (!operator) {
        currentOperand === '0' ? currentOperand = number.toString() : currentOperand += number.toString();
    } else {
        currentOperand += number.toString();
    }
    updatePrimaryDisplay();
    updateContinousFunction();
}

function inputOperator(selectedOperator) {
    if (!operator) {
        operator = selectedOperator;
        updateSecondaryDisplay('firstCalculation')
    } else {
        operator = selectedOperator;
        updateSecondaryDisplay('continuousFunction');
        totalIsDisplayed = false;
    }
    updatePrimaryDisplay();
}

function inputDecimal() {
    if (!currentOperand.includes('.') && !totalIsDisplayed) {
        currentOperand += "."
        updatePrimaryDisplay();
    }
}

function updateSecondaryDisplay(state) {
    const secondaryDisplay = document.querySelector('.secondary-display');
    if (state === 'firstCalculation') {
        previousOperand = currentOperand;
        secondaryDisplay.innerText = previousOperand + " " + operator;
        updateContinousFunction('firstOperator');
        clearCurrentOperand();
    } else if (state === 'continuousFunction') {
        secondaryDisplay.innerText += " " + currentOperand + " " + operator;
        clearCurrentOperand();
    } else {
        secondaryDisplay.innerText = ''
    }
}

function clearCurrentOperand() {
    currentOperand = '';
    updatePrimaryDisplay();
}

function updateContinousFunction (state) {
    if (state === 'firstOperator') {
        currentContinuousFunctionTotal = previousOperand;
    } else if (state === 'equals') {
        currentContinuousFunctionTotal = currentOperand;
    } else {
        currentContinuousFunctionTotal = performCalculation(currentOperand, currentContinuousFunctionTotal, operator)
    }
}  

equalsButton.addEventListener('click', function() {
   if (operator) {
    currentOperand = currentContinuousFunctionTotal;
    totalIsDisplayed = true;
    updateContinousFunction('equals');
    updatePrimaryDisplay();
    updateSecondaryDisplay();
   }
})

function performCalculation(currentOperand, currentContinuousFunctionTotal, operator) {
    let result = '';
    if (currentOperand && currentContinuousFunctionTotal) {
        switch (operator) {
            case '/':
                result = currentContinuousFunctionTotal / currentOperand;
                break;
            case '*':
                result = currentContinuousFunctionTotal * currentOperand;
                break;
            case '+':
                result = parseInt(currentContinuousFunctionTotal) + parseInt(currentOperand);
                break;
            case '-':
                result = currentContinuousFunctionTotal - currentOperand;
                break;
        }
    }
    return result.toString();
}

function allClear() {
    currentOperand = '0'
    previousOperand = ''
    operator = '';
    currentContinuousFunctionTotal = '';
    totalIsDisplayed = false;
    updatePrimaryDisplay();
    updateSecondaryDisplay();
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