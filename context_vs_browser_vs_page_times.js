import { chromium, webkit, firefox } from "playwright";

(async() => {
    
    let tries = 10;
    let startTime;
    let elapsed;

    for (const browserType of [chromium, webkit, firefox]) {

        startTime = Date.now();
        for (let i = 0; i < tries; i++) {
            const browser = await browserType.launch();
        }
        console.log(`It took ${Date.now() - startTime} ms to launch ${tries} ${browserType.name()} browsers`);

        // Measure Contexts launch time
        const browser = await browserType.launch();

        startTime = Date.now();
        for (let i = 0; i < tries; i++) {
            const context = await browser.newContext();
        }
        console.log(`It took ${Date.now() - startTime} ms to launch ${tries} ${browserType.name()} contexts`);

        // Measure Page launch time
        const context = await (await browser).newContext();

        startTime = Date.now();
        for (let i = 0; i < tries; i++) {
            const page = await context.newPage();
        }
        console.log(`It took ${Date.now() - startTime} ms to launch ${tries} ${browserType.name()} pages`);

        await context.close();
        await browser.close();
    }
})();