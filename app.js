let currentOperand = '0';
let previousOperand = '';
let operator = '';
let currentContinuousFunctionTotal = '';
let displayedTotal = '';

const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const allClearButton = document.querySelector('.all-clear-button');
const backSpaceButton = document.querySelector('.backspace-button');
const equalsButton = document.querySelector('.equals-button');

const memoryAddButton = document.querySelector(".memory-add-button");
const memoryRemoveButton = document.querySelector(".memory-remove-button");
const memoryRecallButton = document.querySelector(".memory-recall-button");
const memoryClearButton = document.querySelector(".memory-clear-button");
const memoryDisplay = document.querySelector(".memory-display");

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

allClearButton.addEventListener('click', allClear);
backSpaceButton.addEventListener('click', backSpace);

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
    }
    updatePrimaryDisplay();
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
    currentOperand = '0';
    previousOperand = ''
    operator = '';
    currentContinuousFunctionTotal = '';
    updateSecondaryDisplay();
    updatePrimaryDisplay();
}

function backSpace() {
    currentOperand = currentOperand.slice(0,-1);
    updatePrimaryDisplay();
}