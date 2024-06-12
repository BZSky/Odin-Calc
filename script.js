const controlsContainer = document.querySelector(".controls-container");

let currentInput = "";
let prevOperator = null;
let operator = null;
let storedValue = "";
let result = "";
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

function handleDisplayExpression(value) {
  /* TODO
   operator = save 0 & operator
    number -> operator -> number -> operator = calculate prev numbers and save result as stored value & new operator 
      */
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
      //      if (currentInput === "-0") {
      //        currentInput = "-";
      //      }
      if (currentInput.length < 9 && operator != "=") {
        currentInput += value;
        display.textContent = currentInput;
        displayExpression.textContent += `${value}`;
      }
      break;
    case "+":
    case "-":
    case "×":
    case "*":
    case "÷":
    case "/":
      if (value == "×") {
        value = "*";
      } else if (value == "÷") {
        value = "/";
      }
      if (!prevOperator) {
        if (result && storedValue) {
          prevOperator = operator;
          operator = value;
          storedValue = result;
          result = calculate(storedValue, prevOperator, currentInput);
          if (result.toString().length > 9) {
            result = parseFloat(result).toPrecision(4);
          }
          display.textContent = result;
          displayExpression.textContent += ` ${operator} `;

          currentInput = "";
        } else if (storedValue && currentInput) {
          prevOperator = operator;
          operator = value;
          result = calculate(storedValue, prevOperator, currentInput);
          if (result.toString().length > 9) {
            result = parseFloat(result).toPrecision(4);
          }
          display.textContent = result;
          displayExpression.textContent += ` ${operator} `;

          currentInput = "";
        } else if (currentInput) {
          storedValue = currentInput;
          operator = value;
          displayExpression.textContent += ` ${operator} `;

          currentInput = "";
        } else if (displayExpression.textContent.endsWith(`${operator} `)) {
          let arr = displayExpression.textContent.split(" ");
          displayExpression.textContent = arr.slice(0, -2).join(" ");
          operator = value;
          displayExpression.textContent += ` ${operator} `;
        }
      } else if (currentInput) {
        if (result && storedValue) {
          prevOperator = operator;
          operator = value;
          storedValue = result;
          result = calculate(storedValue, prevOperator, currentInput);
          if (result.toString().length > 9) {
            result = parseFloat(result).toPrecision(4);
          }
          currentInput = "";

          display.textContent = result;
          displayExpression.textContent += ` ${operator} `;
        } else if (storedValue) {
          prevOperator = operator;
          operator = value;
          result = calculate(storedValue, prevOperator, currentInput);
          if (result.toString().length > 9) {
            result = parseFloat(result).toPrecision(4);
          }
          currentInput = "";

          display.textContent = result;
          displayExpression.textContent += ` ${operator} `;
        }
      } else if (displayExpression.textContent.endsWith(`${operator} `)) {
        // rewrite with str.slice
        let arr = displayExpression.textContent.split(" ");
        displayExpression.textContent = arr.slice(0, -2).join(" ");
        operator = value;
        displayExpression.textContent += ` ${operator} `;
      }
      break;
    case "AC":
    case "Escape":
      currentInput = "";
      storedValue = "";
      result = "";
      prevOperator = null;
      operator = null;
      display.textContent = "0";
      displayExpression.textContent = "";
      break;
    case "=":
      /*    number & operator & = & = & = ...  => result of num1 + num1 then repeat + num1 with result
    number & operator & number & = => result of num1 + num2 then repeat + num2 with result
    number & operator & number & operator & ... => result of num1 + num2, etc
*/
      if (!displayExpression.textContent.endsWith(`${operator} `)) {
        if (result && storedValue) {
          prevOperator = operator;
          operator = value;
          storedValue = result;
          result = calculate(storedValue, prevOperator, currentInput);
          if (result.toString().length > 9) {
            result = parseFloat(result).toPrecision(4);
          }
          display.textContent = result;
          displayExpression.textContent += ` ${operator} `;

          currentInput = "";
        } else if (storedValue && currentInput) {
          prevOperator = operator;
          operator = value;
          result = calculate(storedValue, prevOperator, currentInput);
          if (result.toString().length > 9) {
            result = parseFloat(result).toPrecision(4);
          }
          display.textContent = result;
          displayExpression.textContent += ` ${operator} `;

          currentInput = "";
        } else if (currentInput) {
          storedValue = currentInput;
          operator = value;
          displayExpression.textContent += ` ${operator} `;

          currentInput = "";
        } else if (displayExpression.textContent.endsWith(`${operator} `)) {
          let arr = displayExpression.textContent.split(" ");
          displayExpression.textContent = arr.slice(0, -2).join(" ");
          operator = value;
          displayExpression.textContent += ` ${operator} `;
        }
      }
      break;
    case "±":
      // not only numbers

      // handle +/- with no input & result several presses
      /* 
    +/- => -0
    number & operator & number & +/- => -num2
    number & +/- =>
*/
      if (
        currentInput &&
        !displayExpression.textContent.endsWith(`${operator} `)
      ) {
        if (currentInput.startsWith("-")) {
          currentInput = currentInput.slice(1);
        } else {
          currentInput = "-" + currentInput;
        }
        display.textContent = currentInput;

        let arr = displayExpression.textContent.split(" ");
        arr[arr.length - 1] = currentInput;
        displayExpression.textContent = arr.join(" ");
      } else if (
        currentInput &&
        displayExpression.textContent.endsWith(`${operator} `)
      ) {
        if (currentInput.startsWith("-")) {
          currentInput = currentInput.slice(1);
        } else {
          currentInput = "-" + currentInput;
        }
        display.textContent = currentInput;

        let arr = displayExpression.textContent.split(" ");
        arr[arr.length - 2] = currentInput;
        displayExpression.textContent = arr.join(" ");
      } /* else if (result && currentInput === "") {
        currentInput = "-0";
        display.textContent = currentInput;
      } */
      break;
    case "←":
    case "Backspace":
      // only numbers
      if (
        currentInput.length > 1 &&
        !displayExpression.textContent.endsWith(`${operator} `)
      ) {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput;
        displayExpression.textContent = displayExpression.textContent.slice(
          0,
          -1
        );
      } else if (
        currentInput.length == 1 &&
        !displayExpression.textContent.endsWith(`${operator} `)
      ) {
        currentInput = "";
        display.textContent = "0";
        displayExpression.textContent = displayExpression.textContent.slice(
          0,
          -1
        );
      }
      break;
    case ".":
      if (
        currentInput &&
        !currentInput.includes(".") &&
        !displayExpression.textContent.endsWith(`${operator} `)
      ) {
        currentInput += ".";
        display.textContent = currentInput;
        displayExpression.textContent += `${value}`;
      } else if (!currentInput.includes(".")) {
        currentInput = "0.";
        display.textContent = currentInput;
        displayExpression.textContent += `${currentInput}`;
      }
      break;
    default:
      console.log("Unknown button:", value);
  }
}

function calculate(firstNum, operator, secondNum) {
  const num1 = parseFloat(firstNum);
  const num2 = parseFloat(secondNum);
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      if (num2 === 0 || num2 === -0) {
        return "Oops! Division by 0!";
      } else return divide(num1, num2);
    default:
      return "Error";
  }
}

controlsContainer.addEventListener("click", (event) => {
  const buttonValue = event.target.textContent;
  handleButtonPress(buttonValue);
});

document.addEventListener("keyup", (event) => {
  const buttonValue = event.key;
  handleButtonPress(buttonValue);
});
