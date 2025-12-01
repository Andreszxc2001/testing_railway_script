import puppeteer from "puppeteer";
import express from "express";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

async function tomarScreenshot() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.goto("https://andrespushaina.com", { waitUntil: "networkidle2" });

  await page.screenshot({ path: "resultado.png" });

  await browser.close();
  console.log("📸 Screenshot tomado correctamente");
}

// Ejecutar captura al iniciar
tomarScreenshot();

// Endpoint público para ver el screenshot
app.get("/screenshot", (req, res) => {
  if (fs.existsSync("resultado.png")) {
    res.sendFile(process.cwd() + "/resultado.png");
  } else {
    res.send("El screenshot aún no está listo.");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en Railway → Puerto ${PORT}`);
});

