/*
  THINGS TO BE DONE:
    1. make decimal point working
    2. make clear button clear one number or the operator
*/

const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const percentage = document.querySelector(".percentage");
const equals = document.querySelector(".equals");
const input = document.querySelector(".input");
const result = document.querySelector(".result");
const allClearBtn = document.querySelector(".all-clear");
const followMeBtn = document.querySelector(".follow");

let operandOne;
let operandTwo;
let currentOperator;
let calcResult;
let isEqualsPressed = false;

allClearBtn.addEventListener("click", () => {
  // Plain old all clear button
  console.log("All clear");
  allClear();
});

const allClear = () => {
  operandOne = undefined;
  operandTwo = undefined;
  currentOperator = undefined;
  calcResult = undefined;
  isEqualsPressed = false;

  input.innerText = "";
  result.innerText = "";
};

numberBtns.forEach((numBtn) => {
  return numBtn.addEventListener("click", (e) => {
    if (isEqualsPressed) {
      // If one calculation is done and another calculation starts without pressing AC
      // It automatically clears everything
      result.innerText = undefined;
      allClear();
    }

    if (!!currentOperator) {
      // It checks if the operator is present then save the second value
      if (input.innerText.length < 25) {
        input.innerText += numBtn.innerHTML;
        operandTwo = input.innerText.substring(operandOne.length + 1);
      }
    }

    /*
      Calculator starts here when some number is pressed,
      then it looks for operator
      then it looks for the second value(operandTwo)
    */
    if (
      input.innerText.length < 12 &&
      currentOperator === undefined &&
      !isEqualsPressed
    ) {
      input.innerText += numBtn.innerHTML;
      operandOne = input.innerText;
    }
  });
});

operatorBtns.forEach((symbolBtn) => {
  return symbolBtn.addEventListener("click", (e) => {
    if (isEqualsPressed) {
      /*
        After completion of calculation if any operator is entered then
        the calculation starts again and the previous result becomes operandOne
      */

      input.innerText = "";
      input.innerText += operandOne;
      isEqualsPressed = false;
      calcResult = undefined;
      result.innerText = undefined;
    }

    if (!currentOperator) {
      // Adds operator
      input.innerText += symbolBtn.innerHTML;
      currentOperator = symbolBtn.innerHTML;
    }
  });
});

percentage.addEventListener("click", () => {
  // calculates percentage
  if (calcResult) {
    operandOne = calcResult / 100;
    input.innerText = operandOne;
    result.innerText = "";
  } else if (operandOne) {
    operandOne = operandOne / 100;
    input.innerText = operandOne;
    result.innerText = "";
  }
});

equals.addEventListener("click", () => {
  // completes the calculation
  calcResult = doCalculation(operandOne, currentOperator, operandTwo);
  result.innerText = calcResult;
  operandOne = calcResult.toString(); // because length property is for string
  currentOperator = undefined;
  operandTwo = undefined;

  isEqualsPressed = true;
});

const doCalculation = (operandOne, operator, operandTwo) => {
  switch (operator) {
    case "\u002B":
      return parseFloat(operandOne) + parseFloat(operandTwo);
    case "\u2212":
      return parseFloat(operandOne) - parseFloat(operandTwo);
    case "\u00D7":
      return parseFloat(operandOne) * parseFloat(operandTwo);
    case "\u00F7":
      return parseFloat(operandOne) / parseFloat(operandTwo);
    default:
      return parseFloat(operandOne);
  }
};

// Follow Me
followMeBtn.addEventListener("click", () => {
  window.open("https://twitter.com/PlabanKrMondal");
});
