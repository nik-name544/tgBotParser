const fs = require("fs");
const puppeteer = require("puppeteer");
const askQuestion = require("./askQuestion");

const externalCurrencies = [];

const parseCurrenciesWebView = async (URL, calc, carrency, num) => { 
  try {
    let browser = await puppeteer.launch({
      headless: true,
      slowMo: 100,
      devtools: true,
    });

    let page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 900 });
    await page.goto(URL, { waitUntil: "domcontentloaded" });

    let html = await page.evaluate(async () => {
      let res = [];
      let container = await document.querySelectorAll(
        "table.table-response>tbody"
      );

      let containerTr = container[0].querySelectorAll("tr");
      containerTr.forEach((item) => {
        let bankAndBlackMarket = item.querySelectorAll("td.mfm-text-nowrap");
        let title = item.querySelector("td.mfcur-table-cur>a").innerText;
        let bankRate = {
          buy: bankAndBlackMarket[0].innerText.split("/")[0],
          sell: bankAndBlackMarket[0].innerText.split("/")[1],
        };
        let NBU = item.querySelector("span.mfcur-nbu-full-wrap").innerText;
        let blackMarket = {
          buy: bankAndBlackMarket[1].innerText.split("/")[0],
          sell: bankAndBlackMarket[1].innerText.split("/")[1],
        };
        // test.push({ title: title, NBU: NBU });

        res.push({
          title: title,
          bankRate: bankRate,
          NBU: NBU.split("\n")[0],
          blackMarket: blackMarket,
        });
      });

      return res;
    });
    for (let i = 0; i < html.length; i++) {
      externalCurrencies.push({ title: html[i].title, value: html[i].NBU });
    }
    if (!!calc) {
      let test = 0;

      const calc = (item, num) => {
        externalCurrencies.forEach((value) =>
          !!num
            ? (test += Math.round(value.title === item && value.value * +num))
            : value.title === item &&
              askQuestion(`how much ${value.title} did you have? `)
                .then(
                  (chldValue) =>
                    (test += Math.round(value.value * +chldValue.text))
                )
                .then(() => {
                  fs.writeFileSync(
                    "json/currency.json",
                    JSON.stringify(test, undefined, 2)
                  );

                  console.log(`currency was counted, result ${test}`);
                })
        );
      };
      if (!!carrency & !!num) {
        calc(carrency, num);
      } else {
        askQuestion("what currency calc? ").then((value) => {
          calc(value.text);
        });
      }
      return test;
    } else {
      // console.log(html);

      fs.writeFileSync(
        "json/currencies.json",
        JSON.stringify(html, undefined, 2)
      );
      await browser.close();

      console.log("currencies was parsed ");
      return true;
    }
  } catch (e) {
    console.log();
    console.log();
    console.log(e);
    console.log();
  }
};

module.exports = async function CurrenciesParser(url, calc, carrency, num) {
  return !!carrency & !!num
    ? parseCurrenciesWebView(url, calc, carrency, num)
    : parseCurrenciesWebView(url, calc);
};
