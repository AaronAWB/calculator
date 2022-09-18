let operandOne = null;
let operandTwo = null;
let storedOperator = null;
// variable stores a string indicating whether firstOperand or secondOperand has been entered.
let displayState = null;
let displayValue = 0;
let displayHasOperator = false;

const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const allClearButton = document.querySelector('.all-clear-button');
const deleteButton = document.querySelector('.delete-button');
const equalsButton = document.querySelector('.equals-button');

const memoryAddButton = document.querySelector(".memory-add-button");
const memoryRemoveButton = document.querySelector(".memory-remove-button");
const memoryRecallButton = document.querySelector(".memory-recall-button");
const memoryClearButton = document.querySelector(".memory-clear-button");
const memoryDisplay = document.querySelector(".memory-display");

numberButtons.forEach(function(button){
    button.addEventListener('click', function(){
        updateDisplayValue();
        inputOperand(button.innerText);
    })
})

operatorButtons.forEach(function(button){
    button.addEventListener('click', function(){
        updateDisplayValue();
        inputOperator(button.innerText);
    })
})

allClearButton.addEventListener('click', clearDisplay);

// backSpaceButton.addEventListener('click', backSpace);
equalsButton.addEventListener('click', performCalculation);

function updateDisplayValue() {
    const display = document.querySelector('.display');
    display.value = displayValue
    if (displayValue.length > 10) {
        displayValue = displayValue.substring (0, 10);
    }
}

updateDisplayValue();

function inputOperand(operand) {
    if (displayState === null) {
        operandOne += operand;
        displayValue = operandOne;
        updateDisplayState('operandOne');
    } else if (displayState === "operandOne" && displayHasOperator) {
        operandTwo += operand;
        displayValue = operandTwo;
        updateDisplayState('OperandTwo');
    }
    updateDisplayValue(); 
}

function updateDisplayState(operandState);
    switch (operandState) {
        'operandOne': displayState = "operandOne";
            break;
        'operator': displayState = "operator";
            break;
        'operandTwo': displayState = "operandTwo"
            break;
    }
    
function inputOperator(operator) {
    if (operandOne !== null && operandTwo === null) {
        storedOperator = operator;
        updateOperatorButton();
        return storedOperator;
    }
}

function updateOperatorButton() {
    // Code to add highlighted class to selected operator button.
}

function performCalculation(operandOne, operandTwo, operator) {
    if (operandOne !== null && operandTwo !== null) {
        switch (operator) {
            '/':
                return operandOne / operandTwo;
                break;
            '*':
                return operandOne * operandTwo;
                break;
            '+':
                return = operandOne + operandTwo;
                break;
            '-':
                return = operandOne - operandTwo;
                break;
        }
        
    }
}

function clearDisplay() {
    displayValue = 0;
    operandOne = null;
    operandTwo = null;
    displayedOperator = null;
    displayHasOperator = false;
    setDisplayValue();
}

// function backSpace() {

// }