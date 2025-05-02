import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../../helper/wrapper/PlaywrightWrapper";
import { faker } from '@faker-js/faker';
import { fixture } from "../../hooks/pageFixture";
import APIUtils from "../../helper/util/apiUtils";

const registerParabank = require("../../helper/util/testData/registerParabank.json");

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
        passwordLocator: this.page.locator("//input[@name='password']").waitFor({ state: "visible", timeout: 10000 }),
        loginButton: "//input[@value='Log In']",
        loginButtonLocator: this.page.locator("//input[@value='Log In']"),
    }

    public getHomePageElements(){
        return this.Elements;
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
        const headers = {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Host": "parabank.parasoft.com",
            "Origin": "https://parabank.parasoft.com",
            "Referer": "https://parabank.parasoft.com/parabank/register.htm",
            "cookie": "JSESSIONID=" + await this.fetchJSessionId(),
        }
        const response = await APIUtils.sendRequest(process.env.REGISTERURL_PARABANK, "post", "", registerParabank.body, headers, {});
        expect(response.status).toBe(200);
        expect(response.data).toBeDefined();
        // expect(response.data.customer.firstName).toBe(registerParabank.body.customer.firstName);
        // expect(response.data.customer.lastName).toBe(registerParabank.body.customer.lastName);
        // expect(response.data.customer.username).toBe(registerParabank.body.customer.username);
        // expect(response.data.customer.password).toBe(registerParabank.body.customer.password);
        // expect(response.data.customer.email).toBe(registerParabank.body.customer.email);
        // expect(response.data.customer.phoneNumber).toBe(registerParabank.body.customer.phoneNumber);
        // expect(response.data.customer.address.street).toBe(registerParabank.body.customer.address.street);
    }

    async fetchJSessionId(){
        const response = await APIUtils.sendRequest(process.env.REGISTERURL_PARABANK, "get", "", {}, {}, {});
        const cookies = response.headers['set-cookie'];
        const jsessionid = cookies[0].split(';')[0].split('=')[1];
        console.log("JSESSIONID: ", jsessionid);
        return jsessionid;
    }
}
