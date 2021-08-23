const fs = require("fs");
const askQuestion = require("./askQuestion");
const CryptoParser = require("./CryptoParser");
const CurrenciesParser = require("./CurrenciesParser");
const NewsParser = require("./NewsParser");
const PercentCalculator = require("./PercentCalculator");
const Currencies = require("./CurrenciesParser");
const askQuestionFunc = require("./askQuestionFunc");
const RunBot = require("./tgBot");
const {
  CryptoBTCURL,
  CryptoETHURL,
  NewsURL,
  CurrenciesUrl,
} = require("./links");
// const CryptoBTCURL =
//   "https://www.binance.com/ru/trade/BTC_RUB?theme=dark&type=spot";
// const CryptoETHURL =
//   "https://www.binance.com/ru/trade/ETH_RUB?theme=dark&type=spot";
// const NewsURL = "https://meduza.io/";
// const CurrenciesUrl = "https://minfin.com.ua/currency/";

// fs.stat("./json", function (err) {
//   if (!err) {
//     console.log();
//   } else if (err.code === "ENOENT") {
//     fs.mkdirSync("json");
//   }
// });
// askQuestion("what we will parse? ").then((value) => {
//   if (value.text === "crypto") {
//     askQuestion("what coin will we parse? ").then((res) => {
//       if (res.text === "btc") {
//         CryptoParser(CryptoBTCURL);
//       } else {
//         CryptoParser(CryptoETHURL);
//       }
//     });
//   } else if (value.text === "news") {
//     NewsParser(NewsURL);
//   } else if (value.text === "calcCurrencies") {
//     CurrenciesParser(CurrenciesUrl);
//     console.log(Currencies());
//   } else {
//     CurrenciesParser(CurrenciesUrl);
//   }
// });

let start = true;

if (start) { 
  CurrenciesParser(CurrenciesUrl);
  start = false;
}
//
RunBot();

// askQuestion но как функция для работы с тг
// console.log(test("cry") );
// калькулятор процентов
// console.log(PercentCalculator("8%", "800"));
// console.log(PercentCalculator("800", "%10"));
// console.log(PercentCalculator("17%", "200"));
// console.log(PercentCalculator("120%", "20"));
// console.log(PercentCalculator("120%", "20%"));
