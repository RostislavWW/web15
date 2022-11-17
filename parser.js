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

const numberPage = [1, 2, 3, 4, 5, 6, 7, 8, 9];
(async () => {
  for (const numPage of numberPage) {
    const url = `https://www.xcom-shop.ru/catalog/kompyutery_i_noytbyki/kompyutery/?catalog=page-${numPage}`;

    await logger("Посылаем запрос");
    const res = await axios.get(url);

    await logger("Распарсим ответ от сервера");
    const $ = cheerio.load(res.data);

    // Создатим путь к фалу с ссылками
    const putDoFaila = path.resolve("links", "komputery.txt");

    await logger("Ищем ссылки на товары и перебераем их по очереди");
    $("a.catalog_item__name.catalog_item__name--tiles").each(
      async (i, element) => {
        // выковыриваем ссылку на товар
        const link = $(element).attr("href");
        // Делаем ссылку правильной
        const pLinks = "https://www.xcom-shop.ru" + link + "\n";

        // Сохраним ссылку в файл
        await fs.appendFile(putDoFaila, pLinks);

        await logger(link);
      }
    );
  }

  //   console.log(res.data);
})();
