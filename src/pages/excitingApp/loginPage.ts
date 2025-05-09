// import { expect, Locator, Page } from "@playwright/test";
// import PlaywrightWrapper from "../../helper/wrapper/PlaywrightWrapper";
// import { faker } from '@faker-js/faker';
// import ListPage from "./listPage";
// import { fixture } from "../../hooks/pageFixture";

// const jsonData = require('../../helper/util/testData/testDataEyup.json');


// const title = jsonData.title;
// const name = jsonData.name;
// const surname = jsonData.surname;
// const email = jsonData.email;
// const phone = jsonData.phone;
// const password = jsonData.password;
// const username = jsonData.username;
// let listPage: ListPage;

// export default class LoginPage {
//     private base: PlaywrightWrapper;

//     constructor(private page: Page) {
//         this.base = new PlaywrightWrapper(page);
//     }


//     private Elements = {
//         // Matter Type
//         username: "//label[.='username']", // might be parameterized
//         password: "//label[.='password']", // might be parameterized
//         login: this.page.getByRole('button', { name: 'abc'}),
//     }

//     getElements(){
//         return this.Elements;
//     }

//     async fillLogin(){
//         await this.Elements.login.click();
//         await this.page.waitForLoadState();
//         await this.page.locator(this.Elements.username).fill(username);
//         await this.base.fillText(this.Elements.password, password);
//         console.log("login filled");
//     }

//     async fillType() {
//         await this.page.waitForLoadState();
//         await this.base.fillText(this.Elements.username, username);
//         await this.base.fillText(this.Elements.password, password);
//         await this.base.waitAndClick(this.Elements.username);
//         await this.page.waitForTimeout(500);
//         console.log("credential entered");
//     }

//     async selectAddress() {
//         console.log("Select Address...");
//         const abcTitle = this.page.getByRole('button', { name: 'abc' });
//         const xyzTitle = this.page.getByRole('button', { name: 'xyz' });
//         console.log("saleTitle: " + await abcTitle.isVisible());
//         await abcTitle.click();
//         console.log("purchaseTitle:"  + await xyzTitle.isVisible());
//         await xyzTitle.click();
//         // check Sale and Purchase first
//     }

//     async verifyAddress(page: Page) {
//         listPage = new ListPage(page);
//         const elements = listPage.getListPageElements();
//         const table = await this.page.waitForSelector(elements.table);
//         const rows = await table.$$(elements.tableRows);
//         const columns = await table.$$(elements.tableColumns);
//     }
// }