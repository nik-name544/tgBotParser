module.exports = function PercentCalculator(firstNum, secondNum) {
  if ((firstNum !== 0) & (secondNum !== 0)) {
    if (!isNaN(1 + secondNum)) {
      let num = firstNum.split("%");
      return (+secondNum / 100) * +num[0];
    } else if (!isNaN(1 + firstNum)) {
      let num = secondNum.split("%");
      return (+firstNum / 100) * +num[0];
    } else {
      return "smt not ok";
    }
  }
};
