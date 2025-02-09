import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../../helper/wrapper/PlaywrightWrapper";
import { faker } from '@faker-js/faker';
import ListQuotesPage from "../excitingApp/listQuotesPage";
import { fixture } from "../../hooks/pageFixture";

const jsonData = require('../../helper/util/test-data/testDataEyup.json');

let listQuotesPage: ListQuotesPage;

const title = jsonData.title.trim();
let name: string;
let surname: string;
const email = jsonData.email;
const phone = jsonData.phone;
const buildingName = jsonData.buildingNumber;
const postcode = jsonData.postcode;
const address = jsonData.address;
const salePrice = jsonData.salePrice;
const purchasePrice = jsonData.purchasePrice;
const allEstateAgents = jsonData.allEstateAgents;
const testNegotiator = jsonData.negotiator;
const testFeeEarner = jsonData.testFeeEarner;
const saleFee = jsonData.saleFee;
const purchaseFee = jsonData.purchaseFee;
const matterTypeSale = jsonData.matterTypeSale;
const sold = jsonData.sold;
const presold = jsonData.presold;
const hmlrFeeTypeElectronic = jsonData.hmlrFeeTypeElectronic;
const hmlrFeeTypePost = jsonData.hmlrFeeTypePost;
const address2 = jsonData.address2;
const buildingNamePP = jsonData.buildingNamePP;
const postcodePP = jsonData.postcodePP;
const addressPP = jsonData.addressPP;
const title2 = jsonData.title2.trim();
const name2 = jsonData.firstName2;
const surname2 = jsonData.lastName2;
const email2 = jsonData.email2;
const phone2 = jsonData.phone2;
const buildingName2 = jsonData.buildingNumber2;
const postcode2 = jsonData.postcode2;

let matterTypeTestData: string;
let soldOrPresoldTestData: string;

export default class GiveAQuotePage {
    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        // Matter Type
        sale: "//label[.='Sale']", // might be parameterized
        purchase: "//label[.='Purchase']", // might be parameterized
        saleAndPurchase: "//label[.='Sale & Purchase']", // might be parameterized
        sold: "//label[.='Sold']",  // might be parameterized
        preSold: "//label[.='Pre Sold']",  // might be parameterized
        hmlrFeeTypeArrow: "//div[@class='el-col el-col-24 el-col-md-24 el-col-lg-10 is-guttered']//i[@class='el-icon el-select__caret el-select__icon']",
        hmlrFeeTypeElectOpt: "//li[.='" + hmlrFeeTypeElectronic + "']",
        hmlrFeeTypePostOpt: "//li[.='" + hmlrFeeTypePost + "']",
        makeACall: "//button[.='Make a Call / Take a Call']",
        callClient: "//label[.='Client']",      // might be parameterized
        callAgent: "//label[.='Estate Agent']",     // might be parameterized
        callDetails: "textarea.el-textarea__inner[rows='2']",
        callConfirm: "//button[.='Confirm']",
        // this is a common button for all sections
        nextButton: "//button[.='Next']",
        // Client Details
        client1: "//button[.=' Client 1']",
        title: "(//div[.='Title'])[1]",
        titleOptions: "//li[.='" + title + ".']",
        name: "input[placeholder='Name']",
        surname: "input[placeholder='Surname']",
        email: "input[placeholder='E-Mail']",
        phone: "input[placeholder='Mobile Number']",
        isThereAnotherClient: "//label[.='Is there another client?']",
        // Client 2 details
        client2: "//button[.=' Client 2']",
        title2: "//button[.=' Client 2']/following-sibling::div//div[@class='el-form-item__content' and .='Title']",
        titleOptions2: "(//li[.='" + title2 + ".'])[2]",
        name2: "(//input[@placeholder='Name'])[2]",
        surname2: "(//input[@placeholder='Surname'])[2]",
        email2: "(//input[@placeholder='E-Mail'])[2]",
        phone2: "(//input[@placeholder='Phone Number'])[2]",
        buildingName: "(//label[.='Building Name']/following-sibling::div//input)[1]",
        buildingNameSale: "(//label[.='Building Name']/following-sibling::div//input)[2]",
        buildingNamePurchase: "//button[.=' Purchase Property ']/following-sibling::div//label[.='Building Name']/following-sibling::div//input",
        postcode: "(//div[@id='addressChecker']//input[@class='el-input__inner' and @type='text'])[2]",
        postcodeSale: "(//label[.='Postcode']/following-sibling::div//input)[2]",
        postcodePurchase: "//button[.=' Purchase Property ']/following-sibling::div//label[.='Postcode']/following-sibling::div//input",
        searchForAddressButton: "//button[.='Search for Address']",
        searchForAddressBtnClient: "//button[@class='el-button el-button--primary w-full sm:w-auto' and .='Search for Address']",
        searchForAddressButtonPurchase: "//button[.=' Purchase Property ']/following-sibling::div//button[.='Search for Address']",
        serverError: "//span[.='Server Error']",
        addressNotFoundClient1: "//button[.=' Client 1']/following-sibling::div//label[.='Did you not find the address?' and @class='el-checkbox col-span-2']",
        addressNotFoundPurchase: "//button[.=' Purchase Property ']/following-sibling::div//label[.='Did you not find the address?' and @class='el-checkbox col-span-2']",
        addressNotFoundSale: "//button[.=' Sale Property ']/following-sibling::div//label[.='Did you not find the address?' and @class='el-checkbox col-span-2']",
        addressInput: "input[placeholder='Enter Client Address']",
        addressInputSale: "input[placeholder='Enter Sale Address']",
        addressInputPurchase: "input[placeholder='Enter Purchase Address']",
        addressFound: "//li[.='" + address + "']",
        selectAddressTitle: "(//div[.='Select Title'])[2]",
        selectAddress: "(//div[@class='flex-1 font-semibold'])[1]",
        selectAddressPurchase: "//div[@class='flex-1 font-semibold' and contains(text(), " + buildingNamePP + ")]", // "div.flex-1.font-semibold",
        buildingName2: "(//label[.='Building Name']/following-sibling::div//input)[2]",
        postcode2: "(//div[@id='addressChecker']//input[@class='el-input__inner' and @type='text'])[4]",
        searchForAddressButton2: "(//button[.='Search for Address'])[2]",
        serverError2: "//span[.='Server Error']",
        addressNotFoundClient2: "//button[.=' Client 2']/following-sibling::div//label[.='Did you not find the address?' and @class='el-checkbox col-span-2']",
        addressInput2: "input[placeholder='Enter Client Address']",
        addressFound2: "//li[.='" + address2 + "']",
        selectAddressTitle2: "(//div[.='Select Title'])[2]",
        selectAddress2: "//div[contains(text(), '"+buildingName+"')]",// "(//div[@class='flex-1 font-semibold'])[1]",
        // Sale Property
        salePropertyButton: "//button[.=' Sale Property ']",
        salePrice: "//div[@class='el-form-item is-error is-required asterisk-left el-form-item--label-top']//input[@inputmode='decimal']",
        typeFreeholdSale: "//label[.='Freehold']",
        typeLeaseholdSale: "//label[.='Leasehold']",
        isSameAddressYes: "(//div[@class='el-radio-group w-full']/label[@class='el-radio is-bordered'])[2]",
        isSameAddressNo: "(//div[@class='el-radio-group w-full']/label[@class='el-radio is-bordered'])[3]",
        addLenderFee: "//label[.='Add Lender Fee']",
        addLeaseholdFee: "//label[.='Add Leasehold Fee']",
        // Purchase Property
        purchasePropertyButton: "//button[.=' Purchase Property ']",
        purchasePrice: "//div[@class='el-form-item is-error is-required asterisk-left el-form-item--label-top']//input[@inputmode='decimal']",
        typeFreeholdPurchase: "//label[.='Freehold']",
        typeLeaseholdPurchase: "//label[.='Leasehold']",
        noPurchaseAddress: "//label[.='No Purchase Address?']",
        // Additional Property
        secondPropertyYes: "//label[.='Will the buyer own second property on completion?']/following-sibling::div//label[.='Yes']",
        secondPropertyNo: "//label[.='Will the buyer own second property on completion?']/following-sibling::div//label[.='No']",
        firstTimeBuyerYes: "//label[.='First Time Buyer']/following-sibling::div//label[.='Yes']",
        firstTimeBuyerNo: "//label[.='First Time Buyer']/following-sibling::div//label[.='No']",
        buildingNamePP: "(//div[@id='addressChecker']//input[@class='el-input__inner' and @type='text'])[1]",
        postcodePP: "(//div[@id='addressChecker']//input[@class='el-input__inner' and @type='text'])[2]",
        searchForAddressButtonPP: "(//button[.='Search for Address'])[2]",
        selectAddressTitlePP: "(//div[.='Select Title'])[2]",
        selectAddressPP: "(//div[@class='flex-1 font-semibold'])[3]",
        serverErrorPP: "//span[.='Server Error']",
        addressNotFoundPP: "(//label[@class='el-checkbox col-span-2'])[3]",
        addressFoundPP: "//li[.='" + addressPP + "']",
        addressInputPP: "input[placeholder='Enter Purchase Address']",
        // Estate Agent Details EAR
        iconEstateAgentBranch: "(//i[@class='el-icon el-select__caret el-input__icon'])[1]",
        estateAgentBranch: "(//div[@class='el-select w-full'])[2]", //"(//div[.='Estate Agent Branch'])[3]",
        optionEstateAgentBranch: "(//li[.='" + allEstateAgents + "'])[1]",
        negotiatorBox: "(//div[.='Negotiator'])[2]",
        negotiatorArrow: "(//i[@class='el-icon el-select__caret el-select__icon'])[2]",
        negotiator: "(//li[.='" + testNegotiator + "'])[1]",
        feeEarnerArrow: "(//i[@class='el-icon el-select__caret el-select__icon'])[3]",
        feeEarnerBox: "(//div[@class='el-select__wrapper is-filterable el-tooltip__trigger el-tooltip__trigger'])[2]",
        testFeeEarner: "//li[.='" + testFeeEarner + "']",
        iconDatePicker: "(//span[@class='el-input__prefix-inner']/i)[3]",
        now: "//button[.='OK']",
        iconTimePicker: "(//span[@class='el-input__prefix-inner']/i)[4]",
        buttonOKtoTimePicker: "//button[.='OK' and @class='el-time-panel__btn confirm']",
        telVoiceEmailArrow: "(//div/i[@class='el-icon el-select__caret el-select__icon'])[4]",
        telVoiceEmailBox: "(//div[@class='el-select__selected-item el-select__placeholder is-transparent'])[2]",
        emailOnly: "//li[.='Email only']",
        telephoneFirst: "//li[.='Telephoned First']",
        voiceAndEmail: "//li[.='Voicemail & Email']",
        iconBestTimeToCall: "(//span[@class='el-input__prefix-inner']/i)[5]",
        buttonOKtoCall: "//button[.='OK' and @class='el-time-panel__btn confirm']",
        saleFee: "//label[.='Sale Fee']/following-sibling::div//input",
        purchaseFee: "//label[.='Purchase Fee']/following-sibling::div//input",
        didYouCallYes: "(//label[@class='el-radio is-bordered el-radio--large w-full'])[4]",
        didYouCallNo: "(//label[@class='el-radio is-bordered el-radio--large w-full'])[5]",
        noCallReason: "//div[@class='el-textarea el-input--large w-full']/textarea",
        chaseTime: "//div[@class='el-input el-input--large w-full']//input[@class='el-input__inner']",
        agentSaid: "//div[@class='el-textarea el-input--large w-full']/textarea",
        // EAS & EAP
        estateAgent: "//div[.='Estate Agent']",
        textTitleSale: "//div[.='Sale Estate Agent']",
        saleEstateAgentArrow: "//div[.='Sale Estate Agent']/following-sibling::div//i[@class='el-icon el-select__caret el-input__icon']",
        saleOptionEstateAgent: "(//li[.='" + allEstateAgents + "'])[2]",
        estateAgentPP: "(//div[.='Estate Agent'])[2]",
        textTitlePurchase: "//div[.='Purchase Estate Agent']",
        purchaseEstateAgentArrow: "//div[.='Purchase Estate Agent']/following-sibling::div//i[@class='el-icon el-select__caret el-input__icon']",
        purchaseOptionEstateAgent: "//li[.='" + allEstateAgents + "']",
        // instruct
        instructQuoteButton: "//button[.=' Instruct the Quote NOW! ']",
        checkboxesTsAndCs: "//label[@class='el-checkbox w-full']", // returns 5 elements\
        cb1: "(//label[@class='el-checkbox w-full'])[1]",
        cb2: "(//label[@class='el-checkbox w-full'])[2]",
        cb3: "(//label[@class='el-checkbox w-full'])[3]",
        cb4: "(//label[@class='el-checkbox w-full'])[4]",
        cb5: "(//label[@class='el-checkbox w-full'])[5]",
        // Payment Options
        confirmButton: "//footer[@class='el-dialog__footer']//button[.='Confirm']",
        warningYes: "//div[@class='el-message-box']//button[.='YES']",
        warningNo: "(//button[.='Cancel'])[2]",
        successOK: "//div[@class='el-message-box__btns']//button[.='OK']",
        sendFreeEstimateButton: "//button[.=' Send Free Estimate ']",
        successEstimateOK: "(//button[.='OK'])[2]"
    }

    getElements(){
        return this.Elements;
    }

    async fillMatterType() {
        await this.page.waitForLoadState();
        //await this.page.waitForSelector(this.Elements.sale);
        await this.base.waitAndClick(this.Elements.sale);
        await this.base.waitAndClick(this.Elements.sold);
        console.log("matter type selected");

    }
    async fillMatterTypeOptions(matterType: string, soldOrPresold: string, hmlrFeeType: string) {
        await this.page.waitForLoadState();
        await this.selectMatterType(matterType, hmlrFeeType);
        await this.selectSoldPresold(soldOrPresold);
    }

    async selectMatterType(matterType: string, hmlrFeeType: string) {
        matterTypeTestData = matterType;
        if (matterType === "Sale") {
            await this.base.waitAndClick(this.Elements.sale);
        }
        else if (matterType === "Purchase") {
            await this.base.waitAndClick(this.Elements.purchase);
            await this.selectHMLRFeeType(hmlrFeeType);
        }
        else if (matterType === "PurchaseSale") {
            await this.base.waitAndClick(this.Elements.saleAndPurchase);
            await this.selectHMLRFeeType(hmlrFeeType);
        }
        else {
            console.log("Invalid matter type provided");
            fixture.logger.error("Invalid matter type provided");
        }
    }

    async selectSoldPresold(soldOrPresold: string) {
        soldOrPresoldTestData = soldOrPresold;
        if (soldOrPresold === "Sold") {
            await this.base.waitAndClick(this.Elements.sold);
        }
        else if (soldOrPresold === "PreSold") {
            await this.base.waitAndClick(this.Elements.preSold);
        }
        else {
            console.log("Invalid sold or presold provided");
            fixture.logger.error("Invalid sold or presold provided");
        }
    }
    async selectHMLRFeeType(hmlrFeeType: string) {
        await this.base.waitAndClick(this.Elements.hmlrFeeTypeArrow);

        if (hmlrFeeType === "Post") {
            await this.base.waitAndClick(this.Elements.hmlrFeeTypePostOpt);
        }
        else if (hmlrFeeType === "Electronic") {
            await this.base.waitAndClick(this.Elements.hmlrFeeTypeElectOpt);
        }
        else {
            console.log("Invalid HMLR fee type provided");
            fixture.logger.error("Invalid HMLR fee type provided");
        }
    }

    async makeACall() {
        await this.base.waitAndClick(this.Elements.makeACall);
        await this.base.waitAndClick(this.Elements.callClient);
        await this.base.fillText(this.Elements.callDetails, "Test Call Details: Client called");
        await this.base.waitAndClick(this.Elements.callConfirm);
        console.log("Make a Call done");
    }

    async makeACallOptions(clientOrAgent: string) {
        await this.base.waitAndClick(this.Elements.makeACall);
        if (clientOrAgent === "client") {
            await this.base.waitAndClick(this.Elements.callClient);
            await this.base.fillText(this.Elements.callDetails, "Test Call Details: Client called");
            console.log("Client called");
        }
        else if (clientOrAgent === "agent") {
            await this.base.waitAndClick(this.Elements.callAgent);
            await this.base.fillText(this.Elements.callDetails, "Test Call Details: Agent called");
            console.log("Agent called");
        }
        await this.base.waitAndClick(this.Elements.callConfirm);
        console.log("Call confirmed");
        await this.clickNextButton();
        console.log("Next button of Matter Type clicked")
    }

    async clickNextButton() {
        await this.base.waitAndClick(this.Elements.nextButton);
    }

    async enterAddressManuallyClient1() {
        await this.base.waitAndClick(this.Elements.addressNotFoundClient1);
        await this.base.fillText(this.Elements.addressInput, address);
        await this.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.addressFound);
        console.log("Adress manually found");
        await this.page.waitForTimeout(1000);
    }

    async enterAddressManuallyClient2() {
        await this.base.waitAndClick(this.Elements.addressNotFoundClient2);
        await this.base.fillText(this.Elements.addressInput2, address2);
        await this.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.addressFound2);
        console.log("Adress2 manually found");
        await this.page.waitForTimeout(1000);
    }

    async enterAddressManuallyPurchase() {
        await this.base.waitAndClick(this.Elements.addressNotFoundPurchase);
        await this.base.fillText(this.Elements.addressInputPurchase, address);
        await this.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.addressFound);
        console.log("Adress manually found");
        await this.page.waitForTimeout(1000);
    }

    async enterAddressManuallySale() {
        await this.base.waitAndClick(this.Elements.addressNotFoundSale);
        await this.base.fillText(this.Elements.addressInputSale, address);
        await this.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.addressFound);
        console.log("Adress manually found");
        await this.page.waitForTimeout(1000);
    }

    async fillClientDetails() {
        name = jsonData.firstName + faker.person.firstName();
        surname = jsonData.lastName + faker.person.lastName();
        await this.base.waitAndClick(this.Elements.client1);
        await this.page.waitForLoadState();
        await this.base.waitAndClick(this.Elements.title);
        await this.base.waitAndClick(this.Elements.titleOptions);
        await this.base.fillText(this.Elements.name, name);
        await this.base.fillText(this.Elements.surname, surname);
        await this.base.fillText(this.Elements.email, email);
        await this.base.fillText(this.Elements.phone, phone);
        console.log("client details filled");
        await this.selectAddress();
    }

    async selectAddress() {
        console.log("Select Address...");
        const saleTitle = this.page.getByRole('button', { name: 'Sale Property' });
        const purchaseTitle = this.page.getByRole('button', { name: 'Purchase Property' });
        console.log("saleTitle: " + await saleTitle.isVisible());
        console.log("purchaseTitle:"  + await purchaseTitle.isVisible());
        // check Sale and Purchase first

        if (await purchaseTitle.isVisible() ) {
            console.log("Purchase property address being filled");
            await this.base.fillText(this.Elements.buildingNamePurchase, buildingNamePP);
            await this.base.fillText(this.Elements.postcodePurchase, postcodePP);
            await this.page.waitForTimeout(500);
            await this.page.locator(this.Elements.searchForAddressButtonPurchase).waitFor({state: "attached", timeout:3000});
            await this.base.waitAndClick(this.Elements.searchForAddressButtonPurchase);
        }

         // await page.getByRole('textbox', { name: 'Building Name' }).click();
        else if(await saleTitle.isVisible()){
            console.log("Sale property address being filled");
            await this.base.fillText(this.Elements.buildingNameSale, buildingName);
            await this.base.fillText(this.Elements.postcodeSale, postcode);
            await this.page.waitForTimeout(500);
            try {
                await this.page.getByRole('button', { name: 'Search for Address' }).waitFor({ state: 'attached', timeout: 5000 });
                await this.page.getByRole('button', { name: 'Search for Address' }).click();
            } catch (error) {
                await this.base.waitAndClick("//div[@class='el-col el-col-24 el-col-md-24 is-guttered']//button[.='Search for Address']");
            }
        }
        else{
            console.log("No Sale or Purchase Property found");
            await this.page.getByRole('textbox', { name: 'Building Name' }).fill(buildingName);
            await this.page.getByRole('textbox', { name: 'Postcode' }).fill(postcode);
            await this.page.waitForTimeout(500);
            await this.page.getByRole('button', { name: 'Search for Address' }).click();
        }

        await this.page.waitForTimeout(2000);
        const serverError = await this.page.locator(this.Elements.serverError);
        if (await serverError.isVisible()) {
            if (await this.page.locator(this.Elements.addressNotFoundClient1).isVisible()) {
                await this.enterAddressManuallyClient1();
            }
            if (await this.page.locator(this.Elements.addressNotFoundClient2).isVisible()) {
                await this.enterAddressManuallyClient1();
            }
            if (await this.page.locator(this.Elements.addressNotFoundPurchase).isVisible()) {
                await this.enterAddressManuallyPurchase();
            }
            if (await this.page.locator(this.Elements.addressNotFoundSale).isVisible()) {
                await this.enterAddressManuallySale();
            }
        }
        else {
            await this.page.locator('span').filter({ hasText: 'Select Title' }).click(); //await this.base.waitAndClick(this.Elements.selectAddressTitle);
            console.log("address title clicked");
            if (await this.page.getByRole('button', { name: 'Sale Property' }).isVisible()) {
                console.log("sale address is being selected");
                await this.page.getByRole('option', { name: buildingName }).click(); //await this.base.waitAndClick(this.Elements.selectAddress2);
                console.log("sale address selected");
            }
            else if (await this.base.isElementVisible(this.Elements.purchasePropertyButton)) {
                console.log("purchase address is being selected");
                await this.page.locator(this.Elements.selectAddressPurchase).click();
                console.log("purchase address selected");
            }
            else if( await this.page.getByRole('button', { name: 'Client' }).isVisible){
                console.log("Client1 address being selected");
                await this.page.getByRole('option', { name: buildingName }).click();
                console.log("Client1 address selected");
            }
            else {
                console.log("address title not selected");
            }
        }
    }

    async clickSearchForAddressBtn(){
        try {
            await this.page.getByRole('button', { name: 'Search for Address' }).click();
            console.log("Search for Address button clicked in try");
        } catch (error) {
            await this.base.waitAndClick(this.Elements.searchForAddressBtnClient);
            console.log("Search for Address button clicked in catch");
        }
    }

    async fillClientDetailsOptions(countOfClients: number) {
        name = jsonData.firstName + faker.person.firstName();
        surname = jsonData.lastName + faker.person.lastName();
        await this.base.waitAndClick(this.Elements.client1);
        await this.page.waitForLoadState();
        await this.base.waitAndClick(this.Elements.title);
        await this.base.waitAndClick(this.Elements.titleOptions);
        await this.base.fillText(this.Elements.name, name);
        await this.base.fillText(this.Elements.surname, surname);
        await this.base.fillText(this.Elements.email, email);
        await this.base.fillText(this.Elements.phone, phone);
        await this.base.fillText(this.Elements.buildingName, buildingName);
        await this.base.fillText(this.Elements.postcode, postcode);
        //await this.base.waitAndClick(this.Elements.searchForAddressButton);
        await this.page.waitForTimeout(500);
        await this.clickSearchForAddressBtn();
        await this.page.waitForTimeout(2000);
        const serverError = await this.page.locator(this.Elements.serverError);
        if (await serverError.isVisible()) {
            await this.enterAddressManuallyClient1();
        }
        else {
            // await this.base.waitAndClick(this.Elements.selectAddressTitle);
            fixture.logger.info("search for address button of client1 details being clicked");
            const btnSelectTitle = this.page.locator(this.Elements.selectAddressTitle);
            await btnSelectTitle.waitFor({state: "attached", timeout: 3000});
            fixture.logger.info("btnSelectTitle.isVisible: " + await btnSelectTitle.isVisible());
            if (await btnSelectTitle.isVisible()) {
                await btnSelectTitle.click();
            } else {
                fixture.logger.info("btnSelectTitle.isVisible: " + await btnSelectTitle.isVisible() + ". Click search for addres button one more time...");
                try {
                    await this.page.locator(this.Elements.searchForAddressButton).nth(1).click(); // search
                } catch (error) {
                    await this.page.locator(this.Elements.searchForAddressButton).nth(1).click(); // search
                }
                await this.page.waitForTimeout(2000);
                const serverError = await this.page.locator(this.Elements.serverError);
                if (await serverError.isVisible()) {
                    await this.enterAddressManuallySale();
                }
                else{
                    await btnSelectTitle.click();
                }
            }
            await this.base.waitAndClick(this.Elements.selectAddress); // alternatively use: await this.page.getByRole('option', { name: buildingName }).click(); // await this.base.waitAndClick(this.Elements.selectAddress);
        }
        console.log("Client1 filled");

        if (countOfClients == 2) {
            console.log("Details of Client 2 being filled");
            await this.base.waitAndClick(this.Elements.isThereAnotherClient);
            console.log("isThereAnotherClient clicked");
            await this.base.waitAndClick(this.Elements.client2);
            console.log("client2 button clicked");
            await this.page.waitForLoadState();
            await this.base.waitAndClick(this.Elements.title2);
            console.log("title2 clicked");
            await this.base.waitAndClick(this.Elements.titleOptions2);
            console.log("titleOptions2 clicked");
            await this.base.fillText(this.Elements.name2, name2);
            console.log("name2 filled");
            await this.base.fillText(this.Elements.surname2, surname2);
            await this.base.fillText(this.Elements.email2, email2);
            await this.base.fillText(this.Elements.phone2, phone2);
            await this.base.fillText(this.Elements.buildingName2, buildingName2);
            await this.base.fillText(this.Elements.postcode2, postcode2);
            await this.page.waitForTimeout(500);
            await this.base.waitAndClick(this.Elements.searchForAddressButton2);
            await this.page.waitForTimeout(2000);
            const serverError = await this.page.locator(this.Elements.serverError);
            if (await serverError.isVisible()) {
                await this.enterAddressManuallyClient2();
            }
            else {
                await this.base.waitAndClick(this.Elements.selectAddressTitle2);
                await this.base.waitAndClick(this.Elements.selectAddress2);
            }
            console.log("Client2 filled");

        }
        await this.clickNextButton();
        console.log("Next button of Client Details clicked");
    }

    async fillPropertyDetails() {
        await this.page.waitForLoadState();
        await this.base.fillText(this.Elements.salePrice, salePrice);
        await this.base.waitAndClick(this.Elements.typeFreeholdSale);
        await this.base.waitAndClick(this.Elements.isSameAddressYes);
        await this.base.waitAndClick(this.Elements.addLenderFee);
    }

    async fillPropertyDetailsOptions(freeholdOrLeasehold: string, secondPropertyOrNot: string, firstTimeBuyerOrNot: string) {
        const sale = this.page.locator(this.Elements.salePropertyButton);
        const purchase = this.page.locator(this.Elements.purchasePropertyButton);
        console.log("sale: "+ await sale.isVisible());
        console.log("purchase: "+await purchase.isVisible());
        if(await sale.isVisible() && await purchase.isVisible()){
            console.log("Sale and Purchase Property Details being filled");
            await this.bothPropertyDetailsOptions(freeholdOrLeasehold, secondPropertyOrNot, firstTimeBuyerOrNot);
            console.log("Sale and Purchase Property Details filled");
        }
        
        else if (await sale.isVisible()) {
            await this.fillSalePropertyDetailsOptions(freeholdOrLeasehold);
            console.log("Sale Property Details filled");
        }

        else if (await purchase.isVisible()) {
            await this.fillPurchasePropertyDetailsOptions(freeholdOrLeasehold, secondPropertyOrNot, firstTimeBuyerOrNot);
            console.log("Purchase Property Details filled");
        }
        await this.clickNextButton();
        console.log("Next button of PIP clicked");

    }
    async bothPropertyDetailsOptions(freeholdOrLeasehold: string, secondPropertyOrNot: string, firstTimeBuyerOrNot: string) {
        console.log("Fill Both Property Details");
        await this.page.waitForLoadState();
        // sale property fields and options
        await this.page.getByRole('textbox', { name: '*Price' }).fill(salePrice);//await this.base.fillText(this.Elements.salePrice, salePrice);
        if (freeholdOrLeasehold === "freehold") {
            await this.page.getByLabel('Sale Property', { exact: true }).locator('label').filter({ hasText: 'Freehold' }).click();
        }
        else {
            await this.page.getByLabel('Sale Property', { exact: true }).locator('label').filter({ hasText: 'Leasehold'}).click();
            await this.page.getByLabel('Sale Property', { exact: true }).locator('label').filter({ hasText: 'Leasehold'}).click(); // await this.base.waitAndClick(this.Elements.addLeaseholdFee);
        }
        await this.base.waitAndClick(this.Elements.isSameAddressNo);
        // find address
        await this.base.fillText(this.Elements.buildingNameSale, buildingName);
        await this.base.fillText(this.Elements.postcodeSale, postcode);
        await this.page.waitForTimeout(500);
        await this.page.locator(this.Elements.searchForAddressButton).nth(1).click(); // search

        await this.page.waitForTimeout(2000);
        const serverError = await this.page.locator(this.Elements.serverError);
        if (await serverError.isVisible()) {
            await this.enterAddressManuallySale();
        }
        else {
            const btnSelectTitle = this.page.locator(this.Elements.selectAddressTitle);
            if (await btnSelectTitle.isVisible()) {
                await btnSelectTitle.click();
            } else {
                await this.page.locator(this.Elements.searchForAddressButton).nth(1).click(); // search

                await this.page.waitForTimeout(2000);
                const serverError = await this.page.locator(this.Elements.serverError);
                if (await serverError.isVisible()) {
                    await this.enterAddressManuallySale();
                }
                else{
                    await btnSelectTitle.click();
                }
            }
            await this.page.getByRole('option', { name: buildingName }).click(); // await this.base.waitAndClick(this.Elements.selectAddress);
        }
        await this.page.getByLabel('Sale Property', { exact: true }).locator('label').filter({ hasText: 'Add Lender Fee' }).click(); //await this.base.waitAndClick(this.Elements.addLenderFee);
        console.log("Sale Property Details filled");
        // purchase property fields and options
        await this.page.locator(this.Elements.purchasePropertyButton).click();
        await this.page.getByLabel('Purchase Property').getByLabel('Price').fill(purchasePrice);// await this.page.locator(this.Elements.purchasePrice).nth(1).fill(purchasePrice);
        // this defines the property as being freehold or leasehold
        if (freeholdOrLeasehold === "freehold") {
            console.log("freeholdOrLeasehold: " + freeholdOrLeasehold);
            await this.page.locator(this.Elements.typeFreeholdPurchase).nth(1).click();
            await this.page.locator(this.Elements.addLenderFee).nth(1).click();
        } else {
            console.log("freeholdOrLeasehold: " + freeholdOrLeasehold);
            await this.page.locator(this.Elements.typeLeaseholdPurchase).nth(1).click();
            await this.page.locator(this.Elements.addLeaseholdFee).nth(1).click();
        }

        if (secondPropertyOrNot === "Yes") {
            console.log("secondPropertyOrNot: " + secondPropertyOrNot);
            await this.page.locator(this.Elements.secondPropertyYes).nth(0).click();
        } else {
            console.log("secondPropertyOrNot: " + secondPropertyOrNot);
            await this.page.getByLabel('Will the buyer own second').locator('label').filter({ hasText: 'No' }).click();

        }
        await this.base.waitAndClick(this.Elements.noPurchaseAddress);
        console.log("noPurchaseAddress clicked");

    }
    async fillSalePropertyDetailsOptions(freeholdOrLeasehold: string) {
        console.log("fill sale property details options");
        await this.page.waitForLoadState();
        await this.page.getByRole('textbox', { name: '*Price' }).fill(salePrice);//await this.base.fillText(this.Elements.salePrice, salePrice);
        if (freeholdOrLeasehold === "freehold") {
            console.log("freeholdOrLeasehold: " + freeholdOrLeasehold);
            await this.page.getByLabel('Sale Property', { exact: true }).locator('label').filter({ hasText: 'Freehold' }).click();
        }
        else {
            console.log("freeholdOrLeasehold: " + freeholdOrLeasehold);
            await this.page.getByLabel('Sale Property', { exact: true }).locator('label').filter({ hasText: 'Leasehold' }).click();
            await this.page.getByLabel('Sale Property', { exact: true }).locator('label').filter({ hasText: 'Leasehold' }).click(); // await this.base.waitAndClick(this.Elements.addLeaseholdFee);
        }
        await this.base.waitAndClick(this.Elements.isSameAddressNo);
        await this.selectAddress();
        await this.base.waitAndClick(this.Elements.addLenderFee);
        //await this.selectAddress();

    }
    async fillPurchasePropertyDetailsOptions(freeholdOrLeasehold: string, secondPropertyOrNot: string, firstTimeBuyerOrNot: string) {
        console.log("Fill Purchase Property Details");
        await this.page.waitForLoadState();
        const countOfElements = await this.base.countOfElements(this.Elements.purchasePrice);
        // countOfElements === 2 means Matter Type is Sale and Purchase
        // countOfElements === 1 means Matter Type is one of Sale or Purchase only
        if (countOfElements === 2) {
            await this.page.locator(this.Elements.purchasePrice).nth(1).fill(purchasePrice);
            // this defines the property as being freehold or leasehold
            if (freeholdOrLeasehold === "freehold") {
                console.log("freeholdOrLeasehold: " + freeholdOrLeasehold);
                await this.page.locator(this.Elements.typeFreeholdPurchase).nth(1).click();
                await this.page.locator(this.Elements.addLenderFee).nth(1).click();
            } else {
                console.log("freeholdOrLeasehold: " + freeholdOrLeasehold);
                await this.page.locator(this.Elements.typeLeaseholdPurchase).nth(1).click();
                await this.page.locator(this.Elements.addLeaseholdFee).nth(1).click();
            }

            if (secondPropertyOrNot === "Yes") {
                console.log("secondPropertyOrNot: " + secondPropertyOrNot);
                await this.page.locator(this.Elements.secondPropertyYes).nth(0).click();
            } else {
                console.log("secondPropertyOrNot: " + secondPropertyOrNot);
                await this.page.locator(this.Elements.secondPropertyNo).nth(0).click();
            }
            await this.base.waitAndClick(this.Elements.noPurchaseAddress);
            console.log("noPurchaseAddress clicked");
        }
        else {
            await this.base.fillText(this.Elements.purchasePrice, purchasePrice);
            if (freeholdOrLeasehold === "freehold") {
                console.log("freeholdOrLeasehold: " + freeholdOrLeasehold);
                await this.base.waitAndClick(this.Elements.typeFreeholdPurchase);
                await this.base.waitAndClick(this.Elements.addLenderFee);
            }
            else {
                console.log("freeholdOrLeasehold: " + freeholdOrLeasehold);
                await this.base.waitAndClick(this.Elements.typeLeaseholdPurchase);
                await this.base.waitAndClick(this.Elements.addLeaseholdFee);
            }
            if (secondPropertyOrNot === "Yes") {
                console.log("secondPropertyOrNot: " + secondPropertyOrNot);
                await this.base.waitAndClick(this.Elements.secondPropertyYes);
            } else {
                console.log("secondPropertyOrNot: " + secondPropertyOrNot);
                await this.base.waitAndClick(this.Elements.secondPropertyNo);
                if (firstTimeBuyerOrNot === "Yes") {
                    console.log("firstTimeBuyerOrNot: " + firstTimeBuyerOrNot);
                    await this.base.waitAndClick(this.Elements.firstTimeBuyerYes);
                } else {
                    console.log("firstTimeBuyerOrNot: " + firstTimeBuyerOrNot);
                    await this.base.waitAndClick(this.Elements.firstTimeBuyerNo);
                }
            }

            // is same address? not a case for purchase
            // await this.base.waitAndClick(this.Elements.isSameAddressYes);
            // console.log("isSameAddressYes checked");
        }
        await this.selectAddress();
        console.log("address selected");
    }

    async fillEstateAgentDetailsEAR() {
        await this.page.waitForLoadState();
        await this.base.waitAndClick(this.Elements.iconEstateAgentBranch);
        //await this.base.fillText(this.Elements.estateAgentBranch, allEstateAgents);
        await this.base.waitAndClick(this.Elements.optionEstateAgentBranch);
        await this.page.waitForTimeout(1500);
        try {
            await this.base.waitAndClick(this.Elements.negotiatorBox);
            console.log("negotiator box clicked");
        } catch (error) {
            await this.base.waitAndClick(this.Elements.negotiatorArrow);
            console.log("negotiator arrow clicked");
        }
        console.log("test negotiator: " + testNegotiator);
        await this.base.waitAndClick(this.Elements.negotiator);
        await this.base.waitAndClick(this.Elements.feeEarnerBox);
        await this.base.waitAndClick(this.Elements.testFeeEarner);
        await this.base.fillText(this.Elements.saleFee, saleFee);
        await this.base.waitAndClick(this.Elements.iconDatePicker);
        await this.base.waitAndClick(this.Elements.now);
        await this.base.waitAndClick(this.Elements.iconTimePicker);
        await this.base.waitAndClick(this.Elements.buttonOKtoTimePicker);
        await this.page.keyboard.press("Tab");
        await this.page.waitForTimeout(200);
        await this.page.keyboard.press("Enter");
        await this.base.waitAndClick(this.Elements.emailOnly);
        await this.base.waitAndClick(this.Elements.iconBestTimeToCall);
        await this.base.waitAndClick(this.Elements.buttonOKtoCall);
        await this.didYouCall();
    }

    async clickOkForNowDate(){
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async clickOkForNowTime(){
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async fillEstateAgentDetailsEAROptions(telOrVoiceOrEmail: string) {
        await this.page.waitForLoadState();
        await this.base.waitAndClick(this.Elements.iconEstateAgentBranch);
        //await this.base.fillText(this.Elements.estateAgentBranch, allEstateAgents);
        await this.base.waitAndClick(this.Elements.optionEstateAgentBranch);
        await this.page.waitForTimeout(1500);
        try {
            await this.base.waitAndClick(this.Elements.negotiatorBox);
            console.log("negotiator box clicked");
        } catch (error) {
            await this.base.waitAndClick(this.Elements.negotiatorArrow);
            console.log("negotiator arrow clicked");
            console.log(error.message);
        }
        console.log("test negotiator: " + testNegotiator);
        await this.base.waitAndClick(this.Elements.negotiator);
        await this.base.waitAndClick(this.Elements.feeEarnerBox);
        await this.base.waitAndClick(this.Elements.testFeeEarner);
        if (await this.page.locator(this.Elements.saleFee).isVisible()) {
            await this.base.fillText(this.Elements.saleFee, saleFee);
        }
        if (await this.page.locator(this.Elements.purchaseFee).isVisible()) {
            await this.base.fillText(this.Elements.purchaseFee, purchaseFee);
        }
        await this.page.getByPlaceholder('Select a Date').click(); //await this.base.waitAndClick(this.Elements.iconDatePicker);
        await this.base.waitAndClick(this.Elements.now); //await this.clickOkForNowDate(); 
        await this.page.getByPlaceholder(':05:00').click(); //await this.base.waitAndClick(this.Elements.iconTimePicker);
        await this.base.waitAndClick(this.Elements.buttonOKtoTimePicker); //await this.clickOkForNowTime();// 
        await this.page.locator('div').filter({ hasText: 'Select' }).nth(3).click();
        if (telOrVoiceOrEmail === "Email") {
            await this.base.waitAndClick(this.Elements.emailOnly);
            await this.didYouCall();
        }
        else if (telOrVoiceOrEmail === "Voice") {
            await this.base.waitAndClick(this.Elements.voiceAndEmail);
            await this.didYouCall();
        }
        else {
            await this.base.waitAndClick(this.Elements.telephoneFirst);
        }
        await this.page.getByPlaceholder('Best Time To Call?').click(); // await this.base.waitAndClick(this.Elements.iconBestTimeToCall);
        await this.base.waitAndClick(this.Elements.buttonOKtoCall);
        await this.clickNextButton();
        console.log("Next button clicked in fillEstateAgentDetailsEAROptions");
    }

    async didYouCall() {
        await this.page.waitForLoadState();
        await this.base.waitAndClick(this.Elements.didYouCallYes);
        await this.base.fillText(this.Elements.chaseTime, "12:00 pm");
        await this.base.fillText(this.Elements.agentSaid, "I am testing this feature");
    }

    async fillEstateAgentDetailsEAS() {
        await this.page.waitForLoadState();
        const salePropertyTitle = this.page.locator(this.Elements.textTitleSale);
        const purchasePropertyTitle = await this.page.locator(this.Elements.textTitlePurchase);
        console.log("Estate Agents being selected salePropertyTitle purchasePropertyTitle: " + await salePropertyTitle.isVisible() + ", "+  await purchasePropertyTitle.isVisible());
        if(!(await salePropertyTitle.isHidden()) && !(await purchasePropertyTitle.isHidden())){
            console.log("Both sale and purchase property titles found, selecting agents");
            console.log("sale agent being selected");
            await this.base.waitAndClick(this.Elements.saleEstateAgentArrow);
            await this.base.waitAndClick(this.Elements.saleOptionEstateAgent);
            console.log("sale agent selected");
            await this.page.waitForTimeout(1000);
            console.log("purchase agent being selected");
            await this.base.waitAndClick(this.Elements.purchaseEstateAgentArrow);
            await this.page.locator(this.Elements.purchaseOptionEstateAgent).nth(2).click();;
            console.log("purchase agent selected");
        }
        else if (!(await salePropertyTitle.isHidden())) {
            console.log("sale agent being selected");
            await this.base.waitAndClick(this.Elements.saleEstateAgentArrow);
            await this.base.waitAndClick(this.Elements.saleOptionEstateAgent);
            console.log("sale agent selected");
        }
        else if (!(await purchasePropertyTitle.isHidden())) {
            console.log("purchase agent being selected");
            await this.base.waitAndClick(this.Elements.purchaseEstateAgentArrow);
            try {
                await this.page.locator(this.Elements.purchaseOptionEstateAgent).nth(1).click();;
                //await this.page.locator('#el-id-8574-142 li').filter({ hasText: allEstateAgents }).click();
            } catch (error) {
                await this.page.locator(this.Elements.purchaseOptionEstateAgent).nth(2).click();;
            }
            console.log("purchase agent selected");
        }
        else{
            console.log("No property title found, unable to select agent");
            throw new Error("No property title found, unable to select agent");
        }

    }

    async clickInstructQuoteButton() {
        await this.page.waitForLoadState();
        console.log("clickInstructQuoteButton");
        await this.base.waitAndClick(this.Elements.instructQuoteButton);
        console.log("Instruct quote button clicked");
    }

    async clickSendFreeEstimateButton() {
        await this.page.waitForLoadState();
        await this.base.waitAndClick(this.Elements.sendFreeEstimateButton);
    }

    async clickConfirmButton() {
        await this.page.getByRole('button', { name: 'Confirm' }).waitFor({ state: 'visible', timeout: 10000 });
        await this.page.getByRole('button', { name: 'Confirm' }).click();
        console.log("Ts and Cs Confirm button clicked");
    }

    async confirmWarning() {
        try {
            await this.base.waitAndClick(this.Elements.warningYes);
        } catch (error) {
            await this.page.getByText('YES', { exact: true }).waitFor({ state: 'visible', timeout: 10000 });
            await this.page.getByRole('button').filter({ hasText: 'YES'}).click();
        }
        console.log("Warning message confirmed");
    }
    async confirmSuccessMessage() {
        await this.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.successOK);
        console.log("Success message confirmed");
    }

    async checkTsAndCs() {
        await this.page.waitForLoadState();  // Ensure the page is fully loaded
        let checkboxes = await this.page.locator(this.Elements.checkboxesTsAndCs);
        let count = await checkboxes.count(); // Get the number of checkboxes dynamically
        console.log("Number of checkboxes: ", count);
        for (let i = 0; i < count; i++) {
            await this.page.waitForTimeout(300);
            await this.base.waitAndClick(this.Elements.cb1);
            console.log("Checkbox clicked: ", i + 1);
        }
        await this.clickConfirmButton();
        console.log("Ts&Cs checked");
    }

    async checkTsAndCsOptions() {
        await this.page.waitForLoadState();  // Ensure the page is fully loaded
        await this.page.waitForLoadState('networkidle');
        await this.page.getByText('I accept the terms and conditions').waitFor({ state: 'visible', timeout: 10000 });
        await this.page.getByText('I accept the terms and conditions').click();
        console.log("first check done");
        await this.page.waitForLoadState('networkidle');
        await this.page.getByText('I accept no move no cost').waitFor({ state: 'visible', timeout: 10000 });
        await this.page.getByText('I accept no move no cost').click();
        console.log("second check done");
        await this.page.getByText('I accept fast track to exchange').waitFor({ state: 'visible', timeout: 10000 });
        await this.page.getByText('I accept fast track to exchange').click();
        console.log("third check done");
        await this.page.getByText('I accept mortgage lender').waitFor({ state: 'visible', timeout: 10000 });
        await this.page.getByText('I accept mortgage lender').click();
        console.log("fourth check done");
        await this.page.getByText('Has Client 1 got a valid Passport').waitFor({ state: 'visible', timeout: 10000 });
        await this.page.getByText('Has Client 1 got a valid Passport').click();
        console.log("fifth check done");
        await this.clickConfirmButton();
        console.log("Ts&Cs checked");
    }

    async checkTsAndCsOptions2(){
        await this.page.waitForLoadState();  // Ensure the page is fully loaded
        await this.page.getByText('I accept the terms and conditions').waitFor({ state: 'visible', timeout: 10000 });
        const firstCheckbox =  this.page.getByText('I accept the terms and conditions');
        await this.base.waitAndClickFirstLocator(firstCheckbox);
        console.log("first checkbox checked");
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Tab');
        console.log("Tab key pressed");
        await this.page.waitForTimeout(500);
        //await this.page.getByText('I accept the terms and conditions').focus();
        await this.page.keyboard.press('Space');
        console.log("Space key pressed");
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(500);
        //await this.page.getByText('I accept no move no cost').focus();
        await this.page.keyboard.press('Space');
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Tab');
        //await this.page.getByText('I accept fast track to exchange').focus();
        await this.page.keyboard.press('Space');
        await this.page.waitForTimeout(500);
        await this.page.keyboard.press('Tab');
        await this.page.waitForTimeout(500);
        //await this.page.getByText('I accept mortgage lender').focus();
        await this.page.keyboard.press('Space');
        await this.page.waitForTimeout(500);

        console.log("fifth check done");
        await this.clickConfirmButton();
        console.log("Ts&Cs checked");
    }


    async completeQuotationOptions(instructOrEstimate: string) {
        await this.page.waitForLoadState();
        if (instructOrEstimate === "Instruct") {
            await this.clickInstructQuoteButton();
            await this.page.waitForTimeout(1000);
            await this.base.waitForIdle(this.page);
            await this.checkTsAndCsOptions();
            await this.confirmWarning();
            await this.confirmSuccessMessage();
        }
        else if (instructOrEstimate === "Estimate") {
            await this.clickSendFreeEstimateButton();
            await this.confirmWarning();
            await this.confirmSuccessMessage();
            console.log("Send Free Estimate completed");
        }
        else {
            console.log("Invalid option");
        }

    }

    public async verifyQuoteDeatils(page: Page) {
        // listQuotesPage = new ListQuotesPage(page);
        // await this.page.waitForTimeout(4000);
        // const fullName = name + " " + surname;
        // await listQuotesPage.searchByClientName(fullName);
        // // verify quote details here
        // await this.page.waitForLoadState();
        // await this.page.waitForTimeout(2000);
        // console.log("Verification started...");
        // fixture.logger.info("Test full name: ", fullName);
        // console.log("Test Full Name: ", fullName);
        // const clientName = await this.page.locator(listQuotesPage.getListPageElements().clientName).innerText();
        // await expect(clientName).toContain(fullName);
        // const referralAgent = await this.page.locator(listQuotesPage.getListPageElements().referralAgent).innerText();
        // await expect(referralAgent).toBe(allEstateAgents);
        // const mobile = await this.page.locator(listQuotesPage.getListPageElements().mobile);
        // await mobile.scrollIntoViewIfNeeded();
        // await this.page.waitForTimeout(1000);
        // const phoneNumber = await mobile.innerText();
        // await expect(phoneNumber).toBe(phone);
        // const emailAddress = await this.page.locator(listQuotesPage.getListPageElements().email).innerText();
        // await expect(emailAddress).toBe(email);
        // const matterType = await this.page.locator(listQuotesPage.getListPageElements().matterType).innerText();
        // console.log("matterType: " + matterType);
        // //await expect(matterType).toBe(matterTypeTestData);
        // const soldOrPresold = await this.page.locator(listQuotesPage.getListPageElements().soldOrPresold);
        // await soldOrPresold.scrollIntoViewIfNeeded();
        // await this.page.waitForTimeout(1000);
        // const SoP = await soldOrPresold.innerText();
        // await expect(SoP).toBe(soldOrPresoldTestData);
        // const feeEarner = await this.page.locator(listQuotesPage.getListPageElements().feeEarner);
        // await feeEarner.scrollIntoViewIfNeeded();
        // await this.page.waitForTimeout(1000);
        // const feeEarnerName = await feeEarner.innerText();
        // await expect(feeEarnerName).toBe(testFeeEarner);
        // const negotiator = await this.page.locator(listQuotesPage.getListPageElements().negotiator);
        // await negotiator.scrollIntoViewIfNeeded();
        // await this.page.waitForTimeout(1000);
        // const negotiatorName = await negotiator.innerText();
        // await expect(negotiatorName).toBe(testNegotiator);
        // await listQuotesPage.resetFilter();
    }

}
