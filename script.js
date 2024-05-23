const controlsContainer = document.querySelector(".controls-container");

let currentInput = "";
let operator = null;
let storedValue = "";
let display = document.querySelector(".results-container").firstElementChild;
let displayExpression =
  document.querySelector(".results-container").lastElementChild;

const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

const sumArr = function (arr) {
  return arr.reduce((acc, item) => acc + item, 0);
};

const multiplyArr = function (arr) {
  return arr.reduce((acc, item) => acc * item);
};

const power = function (a, b) {
  return a ** b;
};

const factorial = function (num) {
  let rval = 1;
  for (let i = 2; i <= num; i++) rval = rval * i;
  return rval;
};

function displayButtonPress(value) {
  /*     if value is number && firstNum === 0
    else if value is number && firstNum !== 0
    else if value is !number && firstNum !== 0
        if value is +-
        else if value is .
        else if value is %
        else if value is +-
        else if value is AC
        else if value is = */
}

function handleButtonPress(value) {
  switch (value) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      currentInput += value;
      display.textContent = currentInput;
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      if (currentInput) {
        storedValue = currentInput;
        operator = value;
        displayExpression.textContent = `${currentInput} ${operator} `;
        currentInput = "";
      }
      break;
    case "AC":
      currentInput = "";
      storedValue = "";
      operator = null;
      display.textContent = "0";
      displayExpression.textContent = "";
      break;
    case "=":
      if (currentInput && storedValue && operator) {
        displayExpression.textContent += currentInput;
        currentInput = calculate(storedValue, operator, currentInput);
        display.textContent = currentInput;
        storedValue = "";
        currentOperator = null;
      }
      break;
    default:
      console.error("Unknown button:", button);
  }
}

function calculate(firstNum, operator, secondNum) {
  const num1 = parseFloat(firstNum);
  const num2 = parseFloat(secondNum);
  switch (operator) {
    case "+":
      return add(num1, num2).toString();
    case "-":
      return subtract(num1, num2).toString();
    case "*":
      return multiply(num1, num2).toString();
    case "/":
      return divide(num1, num2).toString();
    default:
      return "Error";
  }
}

/*
    what should event listener do?
        get value
        evaluate value
        number -> operator -> number -> submit BUT break on AC
        . is a number
        +/- is a sign, can be pressed whenever and next number will be neg
        % makes firstNum / 100 or makes second num = n % of first num
        assign value
        call function with values
        validate event against order
    */

controlsContainer.addEventListener("click", (event) => {
  const buttonValue = event.target.textContent;
  handleButtonPress(buttonValue);

  // display number request in results

  console.log(buttonValue);
});

// when to remove the event listeners?     button.removeEventListener("click", handleButtonPress);
