const controlsContainer = document.querySelector(".controls-container");

let currentInput = "";
let repeatInput = "";
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

const calcPercentage = function (a, b) {
  return parseFloat(parseFloat((a / 100) * b).toPrecision(5));
};

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
    case "%":
      return calcPercentage(num1, num2);
    default:
      return "Error";
  }
}

function handleCalculation(
  passedValue,
  passedCurrentInput,
  passedOperator,
  passedResult
) {
  prevOperator = passedOperator;
  operator = passedValue;
  if (passedResult !== "") {
    storedValue = passedResult;
  }
  result = calculate(storedValue, prevOperator, passedCurrentInput);
  if (result.toString().length > 21) {
    result = parseFloat(parseFloat(result).toPrecision(5));
  }
  display.textContent = result;
  displayExpression.textContent += ` ${operator} `;
  handleDisplayExpression(displayExpression.textContent);

  currentInput = "";
}

function handleDisplayExpression(expression) {
  while (expression.length > 60) {
    let arr = expression.split(" ");
    expression = arr.slice(2).join(" ");
  }
  displayExpression.textContent = expression;
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
      if (currentInput === "0" && !operator) {
        currentInput = value;
        display.textContent = currentInput;
        displayExpression.textContent = `${currentInput}`;
      } else if (currentInput === "-0") {
        currentInput = `-${value}`;
        display.textContent = currentInput;
        displayExpression.textContent = `${currentInput}`;
      } else if (repeatInput) {
        repeatInput = "";
        currentInput += value;
        display.textContent = currentInput;
        displayExpression.textContent += `${value}`;
      } else if (currentInput.length < 15) {
        currentInput += value;
        display.textContent = currentInput;
        displayExpression.textContent += `${value}`;
      }
      handleDisplayExpression(displayExpression.textContent);
      break;
    case "+":
    case "−":
    case "-":
    case "×":
    case "*":
    case "÷":
    case "/":
      if (value == "×") {
        value = "*";
      } else if (value == "÷") {
        value = "/";
      } else if (value == "−") {
        value = "-";
      }
      if (displayExpression.textContent.endsWith(`${operator} `)) {
        displayExpression.textContent = displayExpression.textContent.slice(
          0,
          -3
        );
        operator = value;
        displayExpression.textContent += ` ${operator} `;
      } else if (currentInput && !storedValue) {
        storedValue = currentInput;
        operator = value;
        repeatInput = currentInput;
        displayExpression.textContent += ` ${operator} `;
        currentInput = "";
      } else if (!currentInput && !storedValue) {
        storedValue = "0";
        operator = value;
        display.textContent = storedValue;
        displayExpression.textContent = `${storedValue} ${operator} `;
      } else {
        handleCalculation(value, currentInput, operator, result);
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
      repeatInput = "";
      break;
    case "=":
    case "Enter":
      if (value == "Enter") {
        value = "=";
      }
      if (result && !currentInput && !repeatInput) {
        value = operator;
        currentInput = result;
        repeatInput = currentInput;
        displayExpression.textContent += currentInput;
        handleCalculation(value, currentInput, operator, result);
      } else if (repeatInput) {
        currentInput = repeatInput;
        value = operator;
        displayExpression.textContent += currentInput;
        handleCalculation(value, currentInput, operator, result);
      } else if (currentInput && !storedValue && operator) {
        storedValue = currentInput;
        repeatInput = currentInput;
        value = operator;
        handleCalculation(value, currentInput, operator, result);
      } else if (currentInput && storedValue) {
        repeatInput = currentInput;
        value = operator;
        handleCalculation(value, currentInput, operator, result);
      }
      break;
    case "±":
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
      }
      break;
    case "←":
    case "Backspace":
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
        //maybe show back the previous result?
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
      } else if (!currentInput.includes(".") && operator != "=") {
        currentInput = "0.";
        display.textContent = currentInput;
        displayExpression.textContent += `${currentInput}`;
      }
      break;
    case "%%":
      if (storedValue && currentInput) {
        // Use the stored value as the basis and convert currentInput into a percentage of it.
        const percentageValue = calcPercentage(
          parseFloat(storedValue),
          parseFloat(currentInput)
        );
        currentInput = percentageValue.toString();
        display.textContent = currentInput;
        // Update the expression display by replacing the last token with the calculated percentage.
        let parts = displayExpression.textContent.trim().split(" ");
        parts[parts.length - 1] = currentInput;
        displayExpression.textContent = parts.join(" ");
      } else if (currentInput) {
        // Fallback: if there's no stored value, simply convert current input into its percentage.
        currentInput = (parseFloat(currentInput) / 100).toString();
        display.textContent = currentInput;
        let parts = displayExpression.textContent.trim().split(" ");
        parts[parts.length - 1] = currentInput;
        displayExpression.textContent = parts.join(" ");
      } else if (result) {
        // If no current input but we have a result, update that instead.
        result = (parseFloat(result) / 100).toString();
        display.textContent = result;
        let parts = displayExpression.textContent.trim().split(" ");
        parts[parts.length - 1] = result;
        displayExpression.textContent = parts.join(" ");
        currentInput = result;
      }
      break;
    case "%":
      // If an operator was pressed and we have a stored value and a current input,
      // treat the current input as a percentage of the stored value.
      if (operator && storedValue && currentInput) {
        // Calculate percentage: storedValue * (currentInput / 100)
        const pctValue = calcPercentage(
          parseFloat(storedValue),
          parseFloat(currentInput)
        );
        currentInput = pctValue.toString();
        display.textContent = currentInput;
        // Update the expression display: replace the last token with the calculated percentage
        let tokens = displayExpression.textContent.trim().split(" ");
        tokens[tokens.length - 1] = currentInput;
        displayExpression.textContent = tokens.join(" ");
      }
      // If there is no stored value but there's a current input, apply the unary conversion.
      else if (currentInput) {
        currentInput = (parseFloat(currentInput) / 100).toString();
        display.textContent = currentInput;
        let tokens = displayExpression.textContent.trim().split(" ");
        tokens[tokens.length - 1] = currentInput;
        displayExpression.textContent = tokens.join(" ");
      }
      // If there is no current input but a result exists, treat the result as the operand.
      else if (result) {
        // In this case, consider result as the number to be converted.
        result = (parseFloat(result) / 100).toString();
        currentInput = result;
        storedValue = result;
        display.textContent = result;
        let tokens = displayExpression.textContent.trim().split(" ");
        tokens[tokens.length - 1] = result;
        displayExpression.textContent = tokens.join(" ");
      }
      break;
    default:
      console.log("Unknown button:", value);
  }
}

controlsContainer.addEventListener("click", (event) => {
  const buttonValue = event.target.textContent;
  handleButtonPress(buttonValue);
});

document.addEventListener("keydown", (event) => {
  const buttonValue = event.key;
  if (buttonValue === "Escape" || buttonValue === "Enter") {
    event.preventDefault();
  }
  handleButtonPress(buttonValue);
});
