import ora from "ora";
import fs from "fs";
import { parsedLinksPath } from "./fileExtensions.js";
// TODO: add username and app url to env file
const tasksUrl = "https://app.codesignal.com/profile/ahmedsayedll/tasks";

export const fetchLinks = async function(page) {
  const spinner = ora("Fetching Tasks").start();
  await page.goto(tasksUrl, { waitUntil: "networkidle0" });
  const links = await fetchRecursively(page);
  spinner.succeed("Done fetching Tasks. Found the following Tasks:");
  return links;
}

async function fetchRecursively(page) {
  let allLinks = [];
  while (true) {
    const foundLinks = await findLinks(page);
    allLinks = [...allLinks, ...foundLinks];
    const canGoToNextTask = await goToNextTaskIfPossible(page);
    if (!canGoToNextTask) {
      break;
    }
  }
  return allLinks;
}

async function goToNextTaskIfPossible(page) {
  const nextPageSelector = 'div[aria-label="Go to the next page"]';
  await page.waitForSelector(nextPageSelector);
  const nextPageButton = await page.$(nextPageSelector);
  const className = await page.evaluate((el) => el.className, nextPageButton);
  if (!className.includes("-disabled")) {
    await page.click(nextPageSelector);
    return true;
  }
  return false;
}

async function findLinks(page) {
  const linkSelector = "a.card-task-link";
  await page.waitForSelector(linkSelector);
  const foundLinks = await page.$$eval(linkSelector, (am) =>
    am.filter((e) => e.href).map((e) => e.href)
  );
  return foundLinks;
}

export const filterLinks = (links) => {
  const alreadyParsedLinks = fs
    .readFileSync(parsedLinksPath)
    .toString()
    .replace(/\r\n/g, "\n")
    .split("\n");
  return links.filter((link) => !alreadyParsedLinks.includes(link));
};
