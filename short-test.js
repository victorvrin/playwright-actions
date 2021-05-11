import {chromium} from "playwright";

(async() => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://latest.oscarcommerce.com/en-gb/catalogue/');
    await page.click('text=Login or register');
    await page.screenshot({path: '/output/images/temp_screen.png'});
    
    page.close();
    context.close();
    browser.close();

    //todo add code

})();