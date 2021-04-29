import { it } from "@playwright/test";
import { TodoPage } from "./pages/todoPage"

it("interacts with todomvc using page objects", async ({ browser }) => {

    const context = await browser.newContext({
        recordVideo: {dir: `videos`}
    });
    const page = await context.newPage();

    
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

    await page.screenshot({path: `images/todo_mvc_${Date.now()}.png`});

    context.close();
});