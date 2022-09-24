let currentOperand = '0';
let previousOperand = '';
let operator = '';

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
}

function inputOperator(selectedOperator) {
    operator = selectedOperator;
    !previousOperand ? updateSecondaryDisplay('firstCalculation') : updateSecondaryDisplay('continuousFunction');  
    updatePrimaryDisplay();
}

function updateSecondaryDisplay(state) {
    const secondaryDisplay = document.querySelector('.secondary-display');
    if (state === 'firstCalculation') {
        previousOperand = currentOperand;
        secondaryDisplay.innerText = previousOperand + " " + operator;
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

equalsButton.addEventListener('click', function() {
   if (operator != '') {
        currentOperand = performCalculation(currentOperand, previousOperand, operator)
        updatePrimaryDisplay();
        updateSecondaryDisplay();
   }
})

function performCalculation(currentOperand, previousOperand, operator) {
    let result = '';
    if (currentOperand && previousOperand) {
        switch (operator) {
            case '/':
                result = previousOperand / currentOperand;
                break;
            case '*':
                result = previousOperand * currentOperand;
                break;
            case '+':
                result = parseInt(previousOperand) + parseInt(currentOperand);
                break;
            case '-':
                result = previousOperand - currentOperand;
                break;
        }
    }
    return result.toString();
}

function allClear() {
    currentOperand = '0';
    previousOperand = ''
    operator = '';
    updateSecondaryDisplay();
    updatePrimaryDisplay();
}

function backSpace() {
    currentOperand = currentOperand.slice(0,-1);
    updatePrimaryDisplay();
}