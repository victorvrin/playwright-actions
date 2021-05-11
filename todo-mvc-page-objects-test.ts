import { it } from "./fixtures";
import { TodoPage } from "./pages/todoPage"
import { webkit, devices } from "playwright"


it("interacts with todomvc using page objects", async ({ browser }) => {

    const context = await browser.newContext({
        recordVideo: {dir: `output/videos`}
    });
    const page = await context.newPage();

    page.pause();

    let todoPage = new TodoPage(page);
    let items = { 
        pencils: "Buy some pencils",
        tomatoes: "Buy Tomatoes",
        trash: "Take out the trash"
    };

    await page.goto('https://todomvc.com/examples/react/');

    await todoPage.addItem(items.pencils);
    await todoPage.addItem(items.tomatoes);
    await todoPage.addItem(items.trash);
    console.log("Added Items");

    await todoPage.checkItem(items.pencils);
    console.log("Cghecked Items");

    await todoPage.deleteItem(items.tomatoes);
    console.log("Deleted Items");

    await todoPage.checkItem(items.trash);
    await todoPage.checkItem(items.trash);
    console.log("Checked unchecked item");

    await page.screenshot({path: `output/images/todo_mvc_${Date.now()}.png`});

    context.close();
});

it.only("takes a screenshot on ios", async() => {
    const iPhone11 = devices['iPhone 11 Pro'];
    const browser = await webkit.launch({
        headless:false
    });
    const context = await browser.newContext({
      viewport: iPhone11.viewport,
      userAgent: iPhone11.userAgent,
      geolocation: { longitude: 12.492507, latitude: 41.889938 },
      permissions: ['geolocation'],
    });
    const page = await context.newPage();
    await page.goto('https://maps.google.com');
    await page.click('.ml-my-location-fab button');
    await page.waitForRequest(/.*preview\/pwa/);
    await page.screenshot({ path: 'output/images/colosseum-iphone.png' });
    await browser.close();
})