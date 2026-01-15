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
    if (b==0) {
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

function percentage(a) {
    return (a / 100);
}


function R2(a) {
    return  Math.round((a + Number.EPSILON) * 100) / 100;
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
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '*':
            return multiply(a,b);
        case '/':
            return divide(a,b);
        case 'xy':
            return power(a,b);
        case '√x':
            return sqrt(a);
        case '%':
            return percentage(a);
        case 'R2':
            return R2(a);
        case 'R0':
            return R0(a);
        case '+/-':
            return -a;
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

//Adding class to memory buttons

const btnMemoryLabels=[
    'MC','MR','M-','M+'
];

buttons.forEach((button) => {
    if (btnMemoryLabels.includes(button.textContent)) {
        button.classList.add('memory-btn');
    }
    
});

//Adding class to clear button

buttons.forEach((button) => {
    if (button.textContent==='AC') {
        button.classList.add('clear-btn');
    }
    
});

//Adding class to all number, decimal and unary buttons

const btnNumberDecUnaryLabels=[
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+/-','π'
];

buttons.forEach((button) => {
    if (btnNumberDecUnaryLabels.includes(button.textContent)) {
        button.classList.add('number-dec-unary-btn');
    }
    
});

//Adding class to all number buttons

const btnNumberLabels=[
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9','.','π'
];

buttons.forEach((button) => {
    if (btnNumberLabels.includes(button.textContent)) {
        button.classList.add('number-btn');
    }
    
});

//Adding class to all operator buttons

const btnOperatorLabels=[
    '√x', '%', '/', '*', '-', '+','+/-','xy', 'R2', 'R0' 
];

buttons.forEach((button) => {
    if (btnOperatorLabels.includes(button.textContent)) {
        button.classList.add('operator-btn');
    }
    
});

//Adding class to primary operator buttons

const btnPrimaryOperatorLabels=[
    '/', '*', '-', '+', '='
];

buttons.forEach((button) => { 
    if (btnPrimaryOperatorLabels.includes(button.textContent)) {
        button.classList.add('primary-operator-btn');
    }
});


let operatorCounter=0;
let shouldResetDisplay=false;
let lastButtonWasOperator=false;
let memoryValue=0;
let decimalAdded=false;

//Event listeners for buttons

buttons.forEach((button) => {
    button.addEventListener('click',()=> {
        //storing numbers clicked to the number variables and displaying on screen
        if (button.classList.contains('number-btn')) {
            if (button.textContent === 'π') {
                display.textContent = Math.PI.toPrecision(12);
                firstNumber = Math.PI;
                shouldResetDisplay = true;
                lastButtonWasOperator = false;
                return;
            }
            
            if (button.textContent==='.') {
                if (decimalAdded) return;
                decimalAdded = true;

            }


            if (display.textContent==='0'|| shouldResetDisplay) {
                if (button.textContent==='.') {
                    display.textContent='0.';
                    decimalAdded=true;
                } else {
                    display.textContent=button.textContent;
                    decimalAdded=false;
                }
                
                shouldResetDisplay=false;
            } else {
                display.textContent+=button.textContent;
            }
            firstNumber=Number(display.textContent);
            lastButtonWasOperator=false;
    }
        //storing operator clicked to the operator variable
        else if (button.classList.contains('operator-btn')) {
            if (button.textContent=='+/-' || button.textContent=='R2' 
                || button.textContent=='R0' || button.textContent=='%' 
                || button.textContent=='√x') {
                const value = Number(display.textContent);
                const result = operate(button.textContent, value);
                display.textContent=Number(result.toPrecision(12));
                firstNumber=result;
                
                if (operatorCounter===0) {
                    operator=" ";
                    secondNumber=0;
                }
                shouldResetDisplay=true;
                lastButtonWasOperator=false;
                return;
            }
            
            //Consecutive operator clicks handling
            if (lastButtonWasOperator) {
                operator=button.textContent;
                return;
            }
            
            //First operator click handling
            if (operatorCounter==0) {
                operator=button.textContent;
                secondNumber=firstNumber;       
                operatorCounter=1;
                
            
            } else {
                secondNumber = operate(operator,secondNumber,firstNumber);
                display.textContent=secondNumber;
                operator=button.textContent;
            }

            shouldResetDisplay=true;
            lastButtonWasOperator=true;
        }
        //performing calculation when equal button is clicked
        else if (button.textContent==='=') {
            if (operatorCounter>0 && !lastButtonWasOperator) {
            firstNumber=operate(operator,secondNumber,firstNumber);
            display.textContent=Number(firstNumber.toPrecision(12));
            operatorCounter=0;
            shouldResetDisplay=true;
            decimalAdded=false;
            }
        }
        //clearing display and resetting variables when AC button is clicked
        else if (button.classList.contains('clear-btn')) {
            display.textContent='0';
            firstNumber=0;
            secondNumber=0;
            operator=" ";
            operatorCounter=0;
            shouldResetDisplay=false;
            lastButtonWasOperator=false;
            decimalAdded=false;
        }

        else if (button.classList.contains('memory-btn')) {
            if (button.textContent==='M+') {
                memoryValue += Number(display.textContent);
            } else if (button.textContent==='M-') {
                memoryValue-= Number(display.textContent);
            } else if (button.textContent==='MR') {
                display.textContent=Number(memoryValue.toPrecision(12));
                firstNumber=memoryValue;
                lastButtonWasOperator=false;
                shouldResetDisplay=true;
            } else if (button.textContent==='MC') {
                memoryValue=0;
            }
        }


});
});

//Capture key down event in key constant

document.addEventListener('keydown',handleKeyboardInput);

function handleKeyboardInput(e) {
    const key = e.key;



    //to capture numbers 
    if (!isNaN(key)) {
        clickButton(key);
        return;
    }

    //to capture decimals
    if (key==='.') {
        clickButton('.');
        return;
    }

    if (key==='+') clickButton ('+');
    if (key === '-') clickButton('-');
    if (key === '*') clickButton('*');
    if (key === '/') clickButton('/');

    // Equals / Enter
    if (key === 'Enter' || key === '=') {
        e.preventDefault();
        clickButton('=');
    }

    // Clear
    if (key === 'Escape') {
        clickButton('AC');
    }

    // Backspace (optional)
    if (key === 'Backspace') {
        handleBackspace();
    }
}

function clickButton(label) {
    const button = [...buttons].find(btn => btn.textContent === label);
    if  (button) button.click();
}

function handleBackspace() {
    if (shouldResetDisplay) return;

    if (display.textContent.length>1) {
        display.textContent=display.textContent.slice(0,-1);
    } else {
        display.textContent='0';
    }
    firstNumber=Number(display.textContent);
}



