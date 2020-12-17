// Declaring Variables for the Display and all the Buttons
const dtop = document.querySelector("#calculator-display-top");
const dbottom = document.querySelector("#calculator-display-bottom");
const numbers = document.querySelectorAll(".number");
const back = document.querySelector("#calculator-back");
const clear = document.querySelector("#calculator-C");
const divide = document.querySelector("#calculator-divide");
const multiply = document.querySelector("#calculator-multiply");
const substrc = document.querySelector("#calculator-substrc");
const add = document.querySelector("#calculator-add");
const equals = document.querySelector("#calculator-equals");
const dot = document.querySelector("#calculator-dot")
let memory = 0;
let operationMemory;
let nextOperation = false;
let middleOperation = false;

// Declaring Functions 
function clearDisplay() {
    dbottom.textContent = "";
}
function fullClear() {
    dbottom.textContent = "";
    dtop.textContent = "";
}
function operation(symbol) {
    memory = Number(dbottom.textContent);
    switch (symbol) {
        case "+":
            operationMemory = "+";
            dtop.textContent = dbottom.textContent + "+";
            break;
        case "-":
            operationMemory = "-";
            dtop.textContent = dbottom.textContent + "-";
            break;
        case "*":
            operationMemory = "*";
            dtop.textContent = dbottom.textContent + "*";
            break;
        case "/":
            operationMemory = "/"
            dtop.textContent = dbottom.textContent + "/";
            break;
    }
    nextOperation = false;
    clearDisplay();
}
function operate() {
    switch (operationMemory) {
            case "+":
                memory = memory + Number(dbottom.textContent);
                break;
            case "-":
                memory = memory - Number(dbottom.textContent);
                break;
            case "*":
                memory = memory * Number(dbottom.textContent);
                break;
            case "/":
                if (dbottom.textContent == 0) {
                    fullClear()
                    memory = 0;
                    operationMemory = "";
                    dbottom.textContent = "ERROR";
                    nextOperation = true;
                    break;
                }
                memory = (memory / Number(dbottom.textContent)).toFixed(2);
                break;
        }
    if (dbottom.textContent !== "ERROR" && memory !== 0) {
          dbottom.textContent = memory;
          operationMemory = "";
          memory = 0;
    }
}

// Buttons Functionality
back.addEventListener("click", () => {
    dbottom.textContent = dbottom.textContent.slice(0, dbottom.textContent.length - 1);
});
clear.addEventListener("click", () => {
    fullClear();
});
numbers.forEach(number => {
    number.addEventListener("click", () => {
        if (nextOperation == true) {
            fullClear();
            nextOperation = false;
        }
        dbottom.textContent += number.textContent;
    });
});
dot.addEventListener("click", () => {
    if(!(dbottom.textContent.includes(dot.textContent))) {
        dbottom.textContent += dot.textContent;
    }
});
add.addEventListener("click", () => {
    if(dtop.textContent.includes("=")) {
        operation("+");
    } else if(dtop.textContent == "") {
        operation("+");
    } else {
        operate();
        operation("+");
    }
});
substrc.addEventListener("click", () => {
     if(dtop.textContent.includes("=")) {
        operation("-");
    } else if(dtop.textContent == "") {
        operation("-");
    } else {
        operate();
        operation("-");
    }
});
multiply.addEventListener("click", () => {
     if(dtop.textContent.includes("=")) {
        operation("*");
    } else if(dtop.textContent == "") {
        operation("*");
    } else {
        operate();
        operation("*");
    }
});
divide.addEventListener("click", () => {
     if(dtop.textContent.includes("=")) {
        operation("/");
    } else if(dtop.textContent == "") {
        operation("/");
    } else {
        operate();
        operation("/");
    }
});
equals.addEventListener("click", () => {
    if(!(dtop.textContent.includes("="))) {
        dtop.textContent += dbottom.textContent + "=";
    }
    operate();
    if (dbottom.textContent !== "ERROR" && memory !== 0) {
          operationMemory = "";
    }
    nextOperation = true;
});