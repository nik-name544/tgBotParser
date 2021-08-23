const fs = require("fs");
const puppeteer = require("puppeteer");
const askQuestion = require("./askQuestion");

const parseCryptoWebView = async (URL) => {
  try {
    let browser = await puppeteer.launch({
      headless: true,
      slowMo: 100,
      devtools: true,
    });

    let page = await browser.newPage();

    // await page.setViewport({ width: 0, height: 0 });
    await page.setViewport({ width: 1400, height: 900 });
    await page.goto(URL, { waitUntil: "domcontentloaded" });
    let html = await page.evaluate(async () => {
      let res = [];
      let title = await document.querySelector(
        'div[data-bn-type="text"].css-mzoqhr>h1'
      ).textContent;
      let subTitle = await document.querySelector(
        'a[data-bn-type="link"].css-1pb47mc'
      ).textContent;
      let price = await document.querySelector("div.subPrice").textContent;
      let change = await document.querySelector("div.tickerPriceText>span")
        .textContent;
      console.log(title);
      await res.push({
        title: title,
        subTitle: subTitle,
        price: price,
        change: change,
        // title: title.textContent,
        // subTitle: subTitle.textContent,
        // price: price.textContent,
        // change: change.textContent,
      });
      return res;
    });
    console.log(html);
    fs.writeFileSync(
      "json/cryptoСoin.json",
      JSON.stringify(html, undefined, 2)
    );
    await browser.close();
    console.log(`${html[0].title} coin was parsed`);
    return html;
  } catch (e) {
    askQuestion("parse crypto сoin? ").then(
      (value) => value.res && parseNewsWebView(0, URL)
    );
    console.log();
    console.log();
    console.log();
    console.log(e);
  }
};

module.exports = function CryptoParser(url) {
  return parseCryptoWebView(url);
  // askQuestion("parse crypto сoin? ").then(
  //   (value) => value.res && parseCryptoWebView(url)
  // );
};
