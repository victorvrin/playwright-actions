import {Page} from "playwright";

class TodoPage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    newItemEdit = async() => this.page.$('[placeholder="What needs to be done?"]');
    listItemLabel = async(t: string) => this.page.$(`//*[text()="${t}"]`);
    checkBoxInput = async(t: string) => this.page.$(`//*[text()="${t}"]/../input`);
    deleteButton = async(t: string) => this.page.$(`//*[text()="${t}"]/../button`);

    public async checkItem(itemText: string) {
        await (await this.checkBoxInput(itemText)).check();
    }

    public async deleteItem(itemText: string) {
        await (await this.listItemLabel(itemText)).hover();
        await (await this.deleteButton(itemText)).click();
    }
    
    public async addItem(itemText: string) {
        await (await this.newItemEdit()).type(itemText);
        await (await this.newItemEdit()).press('Enter');
    }
}

export { TodoPage };