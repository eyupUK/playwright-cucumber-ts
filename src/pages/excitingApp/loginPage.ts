import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../../helper/wrapper/PlaywrightWrapper";
import { faker } from '@faker-js/faker';
import ListQuotesPage from "./listQuotesPage";
import { fixture } from "../../hooks/pageFixture";

const jsonData = require('../../helper/util/test-data/testDataEyup.json');


const title = jsonData.title;
const name = jsonData.name;
const surname = jsonData.surname;
const email = jsonData.email;
const phone = jsonData.phone;
const password = jsonData.password;
const username = jsonData.username;
let listQuotesPage: ListQuotesPage;

export default class GiveAQuotePage {
    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        // Matter Type
        username: "//label[.='username']", // might be parameterized
        password: "//label[.='password']", // might be parameterized   
    }

    getElements(){
        return this.Elements;
    }

    async fillType() {
        await this.page.waitForLoadState();
        await this.base.fillText(this.Elements.username, username);
        await this.base.fillText(this.Elements.password, password);
        console.log("credential entered");
    }

    async selectAddress() {
        console.log("Select Address...");
        const abcTitle = this.page.getByRole('button', { name: 'abc' });
        const xyzTitle = this.page.getByRole('button', { name: 'xyz' });
        console.log("saleTitle: " + await abcTitle.isVisible());
        await abcTitle.click();
        console.log("purchaseTitle:"  + await xyzTitle.isVisible());
        await xyzTitle.click();
        // check Sale and Purchase first
    }

    async verifyAddress(page: Page) {
        listQuotesPage = new ListQuotesPage(page);
        const elements = listQuotesPage.getListPageElements();
        const table = await this.page.waitForSelector(elements.table);
        const rows = await table.$$(elements.tableRows);
        const columns = await table.$$(elements.tableColumns);
    }
}