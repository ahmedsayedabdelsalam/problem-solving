import ora from "ora";
// TODO: add url to env file
const url = "https://app.codesignal.com/login";

export const login = async function(page) {
  const spinner = ora(`Opening Login Page: ${url}`).start();
  await openPage(page);
  spinner.succeed("Opening Login Page successful");
  await enterCredentials(page);
  await logIn(page);
}

async function openPage(page) {
  await page.goto(url, { waitUntil: "networkidle0" });
}

async function enterCredentials(page) {
  ora().info(`Using username: ${process.env.USER_NAME}`);
  ora().info(
    `Using password: ${process.env.PASSWORD.split("")
      .map((char, index) => ([0, 1, 2].includes(index) ? char : "*"))
      .join("")}`
  );
  const spinner = ora("Entering credentials...").start();

  const userName = "input[name=username]";
  const password = "input[name=password]";
  await page.waitForSelector(userName);
  await page.waitForSelector(password);
  await page.type(userName, process.env.USER_NAME, { delay: 20 });
  await page.type(password, process.env.PASSWORD, { delay: 20 });

  spinner.succeed("Entering Credentials successful!");
}

async function logIn(page) {
  const signIN = 'div[data-name="signup"]';
  await page.waitForSelector(signIN);
  const spinner = ora("Now logging in...").start();
  await page.click(signIN);
  await page.waitForNavigation({ waitUntil: "networkidle0" });
  spinner.succeed("Login successful!");
}
