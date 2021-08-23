module.exports = {
  options: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "parse currencies", callback_data: "1" },
          { text: "parse crypto coin", callback_data: "3" },
        ],
        [{ text: "calculate percents", callback_data: "4" }],
      ],
    }),
  },
  currenciesOptions: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "calc currencies", callback_data: "calc" },
          { text: "parse currencies", callback_data: "parse" },
        ],
      ],
    }),
  },
  currencies: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "USD", callback_data: "USD" },
          { text: "EUR", callback_data: "EUR" },
          { text: "RUB", callback_data: "RUB" },
        ],
        [
          { text: "PLN", callback_data: "PLN" },
          { text: "GBP", callback_data: "GBP" },
          { text: "CHF", callback_data: "CHF" },
        ],
      ],
    }),
  },
  cryptoConis: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          { text: "Ethereum", callback_data: "eth" },
          { text: "Bitcoin", callback_data: "btc" },
        ],
      ],
    }),
  },
};
