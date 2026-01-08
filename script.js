// Javascript code to build calculator

//functions for calculations
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b==o) {
        return 'Error: Division by zero';
    } else {
        return a / b;
    }
}

function power(a, b) {
    return a ** b;
}

function sqrt(a) {
    return Math.sqrt(a);
}

function percentage(a, b) {
    return (a / 100) * b;
}

function pi() {
    return Math.PI;
}

function R2(a) {
    return Number(a.toFixed(2));
}

function R0(a) {
    return Math.round(a);
}

//variables to hold values

let firstNumber= 0;
let secondNumber= 0;
let operator= " ";

//function to call appropriate operation

function operate(operator,a,b) {
    switch (operator) {
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
        case "^":
            return power(a,b);
        case "√":
            return sqrt(a);
        case "%":
            return percentage(a,b);
        case "π":
            return pi();
        case "R2":
            return R2(a);
        case "R0":
            return R0(a);
        default:
            return 'Error: Invalid operator';

    }
}

const display=document.createElement('div');
display.classList.add('display');
display.textContent='0';

const btnContainer=document.createElement('div');
btnContainer.classList.add('btn-container');
Btn=[];
for (let i=0;i<28;i++) {
    Btn[i]=document.createElement('button');
    Btn[i].classList.add('btn');
    btnContainer.appendChild(Btn[i]);
}

const container=document.querySelector('.container');
container.appendChild(display);
container.appendChild(btnContainer);

//Button Labels
const btnLabels=[
    'MC','MR','M-','M+', 
    'AC','√x','%','/',
    '7', '8','9', '*',
    '4', '5', '6', '-',
    '1', '2', '3', '+', 
    '0', '.', '+/-','=',
    'π','xy','R2', 'R0'
    ];
 
//Assigning Labels to Buttons

const buttons=document.querySelectorAll('.btn');
buttons.forEach((button,index)=> {
    button.textContent=btnLabels[index];
});








