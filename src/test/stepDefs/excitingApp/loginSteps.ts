import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

import { expect } from "@playwright/test";
import { fixture } from "../../../hooks/pageFixture";

setDefaultTimeout(60 * 1000 * 2)


  Given('I am on the login page', async function () {

  });


  When('I enter valid credentials', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });

  Then('I should be logged in', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });


  When('I enter invalid credentials', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });


  Then('I should see an error message', async function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });