module.exports = function askQuestionFunc(answer) {
  return new Promise((resolve, reject) => { 
    if (answer === "cry") {
      return resolve({ res: true, text: "crypto" });
    } else if (answer === "new") {
      return resolve({ res: true, text: "news" });
    } else if (answer === "cur") {
      return resolve({ res: true, text: "currencies" });
    }
    if (answer === "btc") {
      return resolve({ res: true, text: "btc" });
    }
    if (answer === "calc") {
      return resolve({ res: true, text: "calcCurrencies" });
    }
    if (answer === "usd") {
      return resolve({ res: true, text: "USD" });
    } else if (answer === "eur") {
      return resolve({ res: true, text: "EUR" });
    } else if (answer === "rub") {
      return resolve({ res: true, text: "RUB" });
    } else if (answer === "pln") {
      return resolve({ res: true, text: "PLN" });
    } else if (answer === "gbp") {
      return resolve({ res: true, text: "GBP" });
    } else if (answer === "chf") {
      return resolve({ res: true, text: "CHF" });
    }
    if (!answer || answer === "y") {
      return resolve({ res: true, text: "" });
    }
    if (!isNaN(1 + answer)) {
      return resolve({ res: true, text: answer });
    }
    return resolve(false);
  });
};
