let operandOne = null;
let operandTwo = null;
let storedOperator = null;
// variable stores a string indicating whether firstOperand or secondOperand has been entered.
let displayState = null;
let displayValue = 0;
let displayHasOperator = false;
let result = null;

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
        inputOperand(button.innerText);
        updateDisplay();
    })
})

operatorButtons.forEach(function(button){
    button.addEventListener('click', function(){
        inputOperator(button.innerText);
        updateDisplay();
    })
})

allClearButton.addEventListener('click', clearDisplay);
backSpaceButton.addEventListener('click', deleteLastDigit);
equalsButton.addEventListener('click', displayResult);

function updateDisplay() {
    const display = document.querySelector('.display');
    display.innerText = displayValue
    if (displayValue.length > 10) {
        displayValue = displayValue.substring (0, 10);
    }
}

updateDisplay();

function inputOperand(operand) {
    if (displayState === null) {
        operandOne = operand;
        displayValue = operandOne;
        updateDisplayState('operandOne');
    } else if (displayState === 'operandOne' && !displayHasOperator) {
        operandOne += operand;
        displayValue = operandOne;
    } else if (displayState === 'operandOne' && displayHasOperator) {
        updateDisplayState('operandTwo');
        operandTwo = operand;
        displayValue = operandTwo;
    } else if (displayState === 'operandTwo') {
        operandTwo += operand;
        displayValue = operandTwo;
    } else if (displayState === 'result' && displayHasOperator) {
        operandTwo += operand;
        displayValue = operandTwo;
        updateDisplayState('operandTwo');
    }
    updateDisplay(); 
}

function updateDisplayState(operandState) {
    switch (operandState) {
        case 'operandOne': displayState = 'operandOne';
            break;
        case 'operandTwo': displayState = 'operandTwo';
            break;
        case 'result': displayState = 'result';
    }
}

function inputOperator(operator) {
    if (operandOne != null && operandTwo === null) {
        storedOperator = operator;
        displayHasOperator = true; 
    } else if (result != null && operandTwo === null) {
        storedOperator = operator;
        displayHasOperator = true;
    }
    // updateOperatorButton();
}

// function updateOperatorButton() {
//     // Code to add highlighted class to selected operator button.
// }

function performCalculation(operandOne, operandTwo, storedOperator) {
    if (operandOne != null && operandTwo != null) {
        switch (storedOperator) {

            case '/':
                 return operandOne / operandTwo;
            case '*':
                return operandOne * operandTwo;
            case '+':
                return parseInt(operandOne) + parseInt(operandTwo);
            case '-':
                return operandOne - operandTwo;
        }
    }
}

function displayResult() {
    if (result === null) {
        let calculation = performCalculation(operandOne, operandTwo, storedOperator);
        result = calculation.toString();
        displayValue = result;
        updateDisplay();
        updateDisplayState(result);
        displayHasOperator = false;
        displayedOperator = null;
        operandTwo = null;
        operandOne = null;
    } else {
        let calculation = performCalculation(result, operandTwo, storedOperator);
        result = calculation.toString();
        displayValue = result;
        updateDisplay();
        updateDisplayState(result);
        displayHasOperator = false;
        diplayedOperator = null;
        operandTwo = null;
        operandOne = null;
    }
}

function clearDisplay() {
    displayValue = 0;
    operandOne = null;
    operandTwo = null;
    displayedOperator = null;
    displayState = null;
    displayHasOperator = false;
    result = null;
    updateDisplay();
}

function deleteLastDigit() {
    displayValue = displayValue.slice(0, -1);
}

function showValues() {
    console.log(`OperandOne = ${operandOne}`);
    console.log(`OperandTwo = ${operandTwo}`);
    console.log(`storedOperator = ${storedOperator}`);
    console.log(`displayState = ${displayState}`);
    console.log(`displayValue = ${displayValue}`);
    console.log(`displayHasOperator = ${displayHasOperator}`);
    console.log(`result = ${result}`);
}