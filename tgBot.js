const TgApi = require("node-telegram-bot-api");
const fs = require("fs");
const {
  options,
  currencies,
  currenciesOptions,
  cryptoConis,
} = require("./tgOptions");
const {
  CryptoBTCURL,
  CryptoETHURL,
  NewsURL,
  CurrenciesUrl,
} = require("./links");
const CryptoParser = require("./CryptoParser");
const CurrenciesParser = require("./CurrenciesParser");
const NewsParser = require("./NewsParser");
const PercentCalculator = require("./PercentCalculator");
const Currencies = require("./CurrenciesParser");
const test = require("./json/currencies.json");

const token = "1824273869:AAE1PQc7uj33jOSplQ2zVpig03t7kpdvmKQ";

const bot = new TgApi(token, { polling: true });

const chats = {};

const run = () => {
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    const first_name = msg.from.first_name;

    bot.setMyCommands([
      { command: "/start", description: "first greeting" },
      { command: "/work", description: "start work" },
    ]);

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "CAACAgIAAxkBAAMsYOyXNmNCmECafX82Y9Sf2zi4cdoAApJYAALgo4IHj6ziY0dH-TcgBA"
      );
      console.log(chatId);
      await bot.sendMessage(chatId, `hi ${first_name})`);
    } else if (text === "/work") {
      await bot.sendMessage(
        chatId,
        "this is what I can do now (there will be more functions in the future)",
        options
      );
      console.log(test[0].title);
    }
  });

  bot.on("callback_query", async (res) => {
    const data = res.data;
    const chatId = res.message.chat.id;
    if (data === "1") {
      await bot.sendMessage(
        chatId,
        "parse currencies or calc currencies?",
        currenciesOptions
      );
      bot.on("callback_query", async (chldRes) => {
        const chldData = chldRes.data;
        if ((chldData === "calc") & (chldData !== 1)) {
          let answ;
          let num = false;

          bot.sendMessage(chatId, "what currency calc?", currencies);
          bot.on("callback_query", async (chldChldChldRes) => {
            answ = [chldChldChldRes.data];
            num = false;

            test.find(
              (item) =>
                item.title === answ[answ.length - 1] &&
                bot.sendMessage(
                  chatId,
                  `how much ${answ[answ.length - 1]} did you have?`
                )
            );
            bot.on("message", async (msg) => {
              if (!isNaN(1 + msg.text) & !!answ[answ.length - 1]) {
                test.filter(
                  (value) =>
                    (value.title === answ[answ.length - 1]) & !num &&
                    bot
                      .sendMessage(
                        chatId,
                        `${msg.text} of ${answ[answ.length - 1]} = ${Math.round(
                          value.NBU * +msg.text
                        )} UAH`
                      )
                      .then((num = true))
                );
              } else {
                bot.sendMessage(chatId, "smth not ok");
              }
            });
          });
        } else if (chldData === "parse") {
          const currencies = (data) => {
            return `
name: <b>${data.title}</b>

bankRate:
    buy: <b>${data.bankRate.buy}</b>
    sell: <b>${data.bankRate.sell}</b>

nbu: <b>${data.NBU}</b>

blackMarket:
    buy: <b>${data.blackMarket.buy}</b>
    sell: <b>${data.blackMarket.sell}</b>
            `;
          };
          test.forEach((item) => {
            bot.sendMessage(chatId, currencies(item), {
              parse_mode: "HTML",
            });
          });
        }
      });
    } else if (data === "3") {
      await bot.sendMessage(chatId, "what coin will we parse?", cryptoConis);
      bot.on("callback_query", async (res) => {
        const crypto = (data) => {
          return `
name: <b>${data[0].title}</b> (<b>${data[0].subTitle}</b>);

price: <b>${data[0].price}</b>;

changes per day: <b>${data[0].change}</b>;
          `;
        };
        const data = res.data;
        if (data === "eth") {
          CryptoParser(CryptoETHURL).then((chldRes) =>
            bot.sendMessage(chatId, crypto(chldRes), { parse_mode: "HTML" })
          );
        } else if (data === "btc") {
          CryptoParser(CryptoBTCURL).then((chldRes) =>
            bot.sendMessage(chatId, crypto(chldRes), { parse_mode: "HTML" })
          );
        }
      });
    } else if (data === "4") {
      let firstNum = 0;
      let secondNum = 0;
      await bot.sendMessage(chatId, "first num");
      bot.on("message", async (msg) => {
        if (
          (firstNum !== 0) & (secondNum === 0) & !isNaN(1 + msg.text) ||
          (firstNum !== 0) &
            (secondNum === 0) &
            (msg.text[msg.text.length - 1] === "%")
        ) {
          secondNum = msg.text;
          await bot.sendMessage(chatId, PercentCalculator(firstNum, secondNum));
        } else if (
          !isNaN(1 + msg.text) ||
          (msg.text[msg.text.length - 1] === "%") &
            (firstNum === 0) &
            (secondNum === 0)
        ) {
          firstNum = msg.text;
          if (secondNum === 0) {
            await bot.sendMessage(chatId, "second num");
          }
        }
      });
    }
  });
};
module.exports = function RunBot() {
  return run();
};
