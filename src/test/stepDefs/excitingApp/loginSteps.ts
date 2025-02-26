import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { fixture } from "../../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)

let baseUrl: string = process.env.BASEURL; 
const testdata = process.env.TESTDATA_PATH;
const jsonData = require(testdata);
const username = jsonData.username;
const password = jsonData.password;

  // Add your step definitions here

Given('I am on the login page', async function () {
  // code to navigate to login page
});

When('I enter valid credentials', async function () {
  // code to enter valid credentials
});

Then('I should be logged in', async function () {
  // code to verify successful login
});

When('I enter invalid credentials', async function () {
  // code to enter invalid credentials
});

Then('I should see an error message', async function () {
  // code to verify error message
});