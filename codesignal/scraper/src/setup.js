import dotenv from 'dotenv'
dotenv.config();
import ora from "ora";
import puppeteer from 'puppeteer'
import fs from 'fs'
import util from 'util'
import { parsedLinksPath } from "./fileExtensions.js";

const mkdir = util.promisify(fs.mkdir);
// TODO: add url to env file
const url = "https://app.codesignal.com";

export default async function() {
  const browser = await puppeteer.launch();
  const context = browser.defaultBrowserContext();
  context.overridePermissions(url, ["clipboard-read", "clipboard-write"]);

  const page = await browser.newPage();
  ora().info(`Saving output files to ./out/`);

  await setupDirectory("out/");
  await setupDirectory("temp/");
  await setupAlreadyParsedLinksFile();
  return { page, browser };
}

async function setupAlreadyParsedLinksFile() {
  if (process.argv.includes("parseAll")) {
    if (fs.existsSync(parsedLinksPath)) {
      ora.info("Deleting alreadyParsedLinks file");
      await fs.promises.unlink(parsedLinksPath);
    }
  }

  if (!fs.existsSync(parsedLinksPath)) {
    console.error('here')
    fs.closeSync(fs.openSync(parsedLinksPath, 'w'))
  }
}

async function setupDirectory(dir) {
  const shouldClean = process.argv.includes("parseAll");
  if (shouldClean) {
    fs.rmdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dir)) {
    await mkdir(dir);
  }
}
