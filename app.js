const display = document.querySelector('.display');

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

numberButtons.forEach (function(button){
    button.addEventListener ('click', function() {
        const ButtonValue = button.innerText;
        displayInfo(ButtonValue)
    })
})

function displayInfo () {
    console.log('clicked')
    console.log(buttonValue);
    console.log(buttonValue.target);
    console.log(buttonValue.target.innerText);
}