import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../../helper/wrapper/PlaywrightWrapper";
import { faker } from '@faker-js/faker';
import { fixture } from "../../hooks/pageFixture";
import APIUtils from "../../helper/util/apiUtils";



export default class HomePage {
    private base: PlaywrightWrapper;

    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        // Matter Type
        usernameInput: "//input[@name='username']",
        usernameLocator: this.page.locator("//input[@name='username']"),
        passwordInput: "//input[@name='password']",
        passwordLocator: this.page.locator("//input[@name='password']"),
        loginButton: "//input[@value='Log In']",
        loginButtonLocator: this.page.locator("//input[@value='Log In']"),
    }

    async goto() {
        await this.page.goto(process.env.BASEURL);
        await this.page.waitForLoadState();
    }

    async fillLoginCredentials() {
        await this.page.waitForLoadState();
        await this.Elements.usernameLocator.fill(process.env.USERNAME);
        await this.base.fillText(this.Elements.passwordInput, process.env.PASSWORD);
        console.log("Credentials entered");
    }

    async clickLoginButton() {
        await this.base.waitAndClickOnElement(this.Elements.loginButton);
        console.log("Login button clicked");
    }

    async verifyLogin() {
        const title = await this.page.title();
        expect(title).toContain("ParaBank | Accounts Overview");
        console.log("Login successful");
    }

    async registerParaBank() {
        const form =
        {
            "customer.firstName": "E",
            "customer.lastName": "T",
            "customer.address.street": "Upper",
            "customer.address.city": "Richmo",
            "customer.address.state": "Great",
            "customer.address.zipCode": "SW147JG",
            "customer.phoneNumber": "078434564567",
            "customer.ssn": "1234567890",
            "customer.username": "eyup",
            "customer.password": "qaz",
            "repeatedPassword": "qaz"
        };
        const response = await APIUtils.sendRequest(process.env.REGISTERURL_PARABANK, "post", "", form, {}, {});
        expect(await response.status).toBe(200);
    }
}
