import { chromium } from "playwright";

(async() => {
    
    let startTime = Date.now();
    let tries = 10;

    for (let i = 0; i < tries; i++) {
        const browser = await chromium.launch();
    }
    
    let elapsedForBrowsers = Date.now() - startTime;

    console.log(`It took ${elapsedForBrowsers} ms to launch ${tries} browsers`);

    const browser = await chromium.launch();
    for (let i = 0; i < tries; i++) {
        const context = await browser.newContext();
    }

    let elapsedForContexts = Date.now() - startTime - elapsedForBrowsers;

    console.log(`It took ${elapsedForContexts} ms to launch ${tries} contexts`);

    const context = await (await browser).newContext();
    for (let i = 0; i < tries; i++) {
        const page = await context.newPage();
    }

    let elapsedForPages = Date.now() - startTime - elapsedForBrowsers - elapsedForContexts;

    console.log(`It took ${elapsedForPages} ms to launch ${tries} pages`);

    await context.close();
    await browser.close();
})();