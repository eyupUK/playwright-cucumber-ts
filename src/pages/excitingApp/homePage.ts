// import { expect, Page } from "@playwright/test";
// import PlaywrightWrapper from "../../helper/wrapper/PlaywrightWrapper";
// import { faker } from '@faker-js/faker';
// import ListPage from "./listPage";
// import { fixture } from "../../hooks/pageFixture";

// const jsonData = require('../../helper/util/testData/testDataEyup.json');

// let listPage: ListPage;

// const title = jsonData.title.trim();
// let name: string;
// let surname: string;
// const email = jsonData.email;
// const phone = jsonData.phone;


// let matterTypeTestData: string;
// let soldOrPresoldTestData: string;

// export default class HomePage {
//     private base: PlaywrightWrapper;

//     constructor(private page: Page) {
//         this.base = new PlaywrightWrapper(page);
//     }

//     private Elements = {
//         // Matter Type
//         sale: "//label[.='Sale']", // might be parameterized
//         purchase: "//label[.='Purchase']", // might be parameterized
//     }

//     getElements(){
//         return this.Elements;
//     }

//     async fillType() {
//         await this.page.waitForLoadState();
//         await this.base.waitAndClick(this.Elements.sale);
//         await this.base.waitAndClick(this.Elements.purchase);
//         console.log("matter type selected");

//     }
    
//     async selectAddress() {
//         console.log("Select Address...");
//         const saleTitle = this.page.getByRole('button', { name: 'Sale Property' });
//         const purchaseTitle = this.page.getByRole('button', { name: 'Purchase Property' });
//         console.log("saleTitle: " + await saleTitle.isVisible());
//         console.log("purchaseTitle:"  + await purchaseTitle.isVisible());
//         // check Sale and Purchase first
//     }

// }
