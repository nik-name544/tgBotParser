const fs = require("fs");
const puppeteer = require("puppeteer");
const askQuestion = require("./askQuestion");

const parseNewsWebView = async (click, URL) => {
  try {
    let browser = await puppeteer.launch({
      headless: true,
      slowMo: 100,
      devtools: true,
    });

    let page = await browser.newPage();

    await page.setViewport({ width: 1400, height: 900 });
    await page.goto(URL, { waitUntil: "domcontentloaded" });

    await (
      await page.$('input[type="checkbox"].Switcher-module_input__jaMVF')
    ).click();
    await page.waitForSelector("div.Chronology-header");

    for (let i = 0; i < click; i++) {
      const button = await page.$("button.Button-module_root__RpsiW");
      await page.waitForSelector("button.Button-module_root__RpsiW");
      await button.click();
    }

    let html = await page.evaluate(async () => {
      let num = 0;
      let res = [];
      let container = await document.querySelectorAll("div.Chronology-item");
      container.forEach((item) => {
        num++;
        let text = item.innerText;
        let link = item.querySelector("a.ChronologyItem-link").href;
        let title = text.split("\n").length === 3 ? text.split("\n")[0] : "";
        let img;

        try {
          img = item
            .querySelector("div.ChronologyItem-image")
            .getAttribute("style");
        } catch (e) {
          img = "";
        }
        res.push({
          id: num,
          text:
            text.split("\n").length === 3
              ? text.split("\n")[1]
              : text.split("\n")[0],
          link: link,
          title: title,
          img: img.split(" ")[1],
        });
      });
      return res;
    });

    // короче ниже описание перехода по сылкам но мне лень
    // (по сути там то же самое что и сверху только уже по странице поста)
    //
    // for (let i = 0; i < html.length; i++) {
    //   await page.goto(html[i].link, { waitUntil: "domcontentloaded" });
    //   await page
    //     .waitForSelector("div.GeneralMaterial-article")
    //     .catch((e) => console.log(e));
    // }

    console.log("items found: " + html.length);
    console.log();
    let num = click;
    askQuestion("next page? ")
      .then(
        (value) =>
          value
            ? (parseNewsWebView((num = num + 1), URL), console.log(value))
            : (fs.writeFileSync(
                "json/meduza.json",
                JSON.stringify(html, undefined, 2)
              ),
              console.log("news was parsed ")),
        await browser.close()
      )
      .catch(
        (e) => console.log(e, "eee"),
        console.log(),
        console.log(),
        console.log(),

        askQuestion("read news? ").then(
          (value) => value && parseNewsWebView(0, URL)
        )
      );
  } catch (e) {
    askQuestion("read news? ").then(
      (value) => value && parseNewsWebView(0, URL)
    );

    console.log();
    console.log();
    console.log();

    console.log(e);
  }
};

module.exports = function NewsParser(url) {
  askQuestion("read news? ").then((value) => value && parseNewsWebView(0, url));
};
