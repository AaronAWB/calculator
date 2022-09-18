let operandOne = null;
let operandTwo = null;
let operator = null;
let displayValue = 0;

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
        setDisplayValue();
        inputOperand(button.innerText);
    })
})

operatorButtons.forEach(function(button){
    button.addEventListener('click', function(){
        setDisplayValue();
        inputOperator(button.innerText);
    })
})

allClearButton.addEventListener('click', clearDisplay);
backSpaceButton.addEventListener('click', backSpace);
equalsButton.addEventListener('click', performCalculation);

function setDisplayValue() {
    const display = document.querySelector('.display');
    display.value = displayValue
    if (displayValue.length > 10) {
        displayValue = displayValue.substring (0, 10);
    }
}

setDisplayValue();

function inputOperand(operand) {
    operandOne += operand
    displayValue = operandOne
}

function inputOperator() {

}

function performCalculation() {

}

function clearDisplay() {

}

function backSpace() {

}