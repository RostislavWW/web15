const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs").promises;

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 300));
}

async function logger(text) {
  console.log(text);
  await fs.appendFile(path.resolve("log.txt"), text);
  await delay();
}

(async () => {
  const pathFileLink = path.resolve("links", "komputery.txt");

  const fileLinks = await fs.readFile(pathFileLink);

  const textLinks = fileLinks.toString();

  const arrLinks = textLinks.split("\n");

  await logger("Массив с ссылками создан");

  for (const link of arrLinks) {
    await logger("Запрос по ссылке: " + link);
    const res = await axios.get(link);

    await logger("Парсим html");
    const $ = cheerio.load(res.data);

    const name = $("h1#card-main-title.card-bundle__title")
      .text()
      .replace(/\s+/g, " ")
      .trim();
    const price = $(
      ".card-bundle-basket__price-wrapper .card-bundle-basket__price"
    )
      .text()
      .replace("₽", "")
      .replace(" ", "");
    const shortText = $("p.card-bundle-short-description__short-text")
      .text()
      .replace(/\s+/g, " ")
      .replace("Коротко о товаре:", "")
      .trim();

    console.log(name);
    console.log(price);
    console.log(shortText);
    break;
  }
})();
