import { it, expect, test } from "./fixtures";
import fs from "fs";

it("opens a simple web page", async ({ context, browserName }) => {
  console.log('***>>> Starting the web page test for browser: ' + browserName);
  var page = await context.newPage();
  await page.goto('http://google.com');
  await page.close();
});

it("is skipped for firefox", (test, { browserName }) => {
  test.skip(browserName === "firefox", "optional description for the skip")
}, async ({ context, page, browserName }) => {
  console.log("***>>> => Not Skipped" + browserName);
  var page = await context.newPage();
  await page.goto("http://wikipedia.com");
  await page.close();
});

it("gets cookies for the website", async ({ context, page }) => {
  await page.goto('http://wikipedia.com');

  let outputDir = 'output';

  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

  const cookies = await context.cookies();
  const cookiesJSON = JSON.stringify(cookies);

  fs.writeFileSync(`${outputDir}\\wiki_cookies.json`, cookiesJSON, { encoding: 'utf-8' });
});

it("Intercepts network comms - images", async ({ page }) => {
  await page.route('**\/*.{jpg,png,jpeg,svg}', (route, request) => {
    if (request.resourceType() === 'image') {
      console.log(`Aborting requested image ${request.url()}`);
      route.abort();
    } else {
      route.continue();
    }
  })

  await page.on('requestfailed', (request) => {
    console.log(`There was a request failure -> ${request.url()}`);
  });

  await page.goto("http://wikipedia.com");

  await page.type('input[name="search"]', "victor");
  await page.press('input[name="search"]', 'Enter');
  await page.click('//a[text()="Edit"]');
  await page.screenshot({ path: `output\\images\\Edit_wiki_${Date.now()}.png` })
});

it("records a video of the run", async ({browser}) => {
  const context = await browser.newContext({
    recordVideo: {
      dir: 'output\\videos'
    }
  });

  const page = await context.newPage();

  await page.goto('http://wikipedia.org');
  await page.fill('input[name="search"]', 'cheatsheet');
  await page.press('input[name="search"]', 'Enter');
  await page.waitForNavigation();

  context.close();
})

it("uploads a file", async({page}) => {
  await page.goto('https://cgi-lib.berkeley.edu/ex/fup.html');
  let fileName = 'file_to_be_uploaded.txt'

  fs.writeFileSync(fileName, 'This file has been created as part of the test')

  await page.setInputFiles('//input[@name="upfile"]', fileName);
  await page.screenshot({path: `output\\images\\upl_file_screen_${Date.now()}_1.png`})
  await page.click("//input[@value='Press']");
  await page.screenshot({path: `output\\images\\upl_file_screen_${Date.now()}_2.png`})
  fs.unlinkSync(fileName);
})

it("interacts with an iframe", async({page, browser}) => {
  await page.goto("https://demoqa.com/frames");

  const frameElementHandle = await page.$('#frame2');
  const iFrame = await frameElementHandle.contentFrame();

  const innerText = await iFrame.innerText('#sampleHeading');
  const headingHandle = await iFrame.$('#sampleHeading');

  await headingHandle.screenshot({path: `output/images/inside_iframe_${Date.now()}.png`});

  expect(innerText).toBe('This is a sample page');
});