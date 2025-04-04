import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { fixture } from "../../../hooks/pageFixture";
import HomePage from "../../../pages/parabank/homepage";

let homePage: HomePage;
setDefaultTimeout(60 * 1000 * 2)


Given('User goes to home page', async function () {
    homePage = new HomePage(fixture.page);
    await homePage.goto();
  });


  Given('User enters credentials', async function () {
    await homePage.fillLoginCredentials();
  });

  When('User clicks on LOG IN', async function () {
    await homePage.clickLoginButton();
  });

  Then('User should be redirected to the account overview page', async function () {
    await homePage.verifyLogin();
  });