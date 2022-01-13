// taken from: https://github.com/trebeljahr/codesignal-tasks
// thanks for you great work man 🙏

import setUp from "./src/setup.js";
import { fetchLinks, filterLinks } from "./src/fetchLinks.js";
import { login } from "./src/login.js";
import { parseTasks } from "./src/parseTasks.js";

(async () => {
  const { page, browser } = await setUp();
  await login(page);
  const links = await fetchLinks(page);
  const shouldFilter = !process.argv.includes("parseAll");
  const linksToParse = shouldFilter ? filterLinks(links) : links;
  await parseTasks(page, linksToParse);
  await browser.close();
})();