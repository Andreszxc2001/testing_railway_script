import puppeteer from "puppeteer";

async function test() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.goto("https://example.com"); // Web simple de prueba
  await page.screenshot({ path: "resultado.png" });

  console.log("📌 Script ejecutado correctamente en Railway");
  await browser.close();
}

test();
