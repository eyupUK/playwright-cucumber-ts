import { BeforeAll, AfterAll, Before, After, Status, BeforeStep, AfterStep } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;
let environment: string;

BeforeAll(async function () {
    environment = getEnv();
    console.log("Env set BEFORE all tests");
});

// It will trigger for non auth scenarios
Before({ tags: "not @auth and not @api" }, async function ({ pickle }) {
    console.log("Browser is set BEFORE for neither auth nor api scenarios");
    browser = await invokeBrowser();
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        viewport: { width: 1470, height: 832 },
        recordVideo: {
            dir: "test-results/videos",
            size: { width: 1470, height: 832 }
        },
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
    fixture.logger.info("Environment set to: " + environment);
    fixture.logger.info("Browser is set to " + browser.browserType);
    fixture.logger.info(`Before Scenario: ${pickle.name}`);
});

// It will trigger for auth scenarios
Before({ tags: '@auth and not @api' }, async function ({ pickle }) {
    console.log("Browser is set BEFORE for auth scenarios");
    browser = await invokeBrowser();
    const scenarioName = pickle.name + pickle.id
    context = await browser.newContext({
        viewport: { width: 1470, height: 832 },
        storageState: getStorageState(pickle.name),
        recordVideo: {
            dir: "test-results/videos",
            size: { width: 1470, height: 832 }
        },
    });
    await context.tracing.start({
        name: scenarioName,
        title: pickle.name,
        sources: true,
        screenshots: true, snapshots: true
    });
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
    // Optional
    // Load the saved authentication state (auth.json)
    //   if(pickle.name.endsWith("admin")){
    //     const authState = require('../helper/auth/adminAgent.json');
    //     await page.context().addCookies(authState.cookies);
    //   }
      fixture.logger.info("Environment set to: " + environment);
      fixture.logger.info("Browser is set to " + browser.browserType);
      fixture.logger.info(`Before Scenario: ${pickle.name}`);
});

After({ tags: 'not @api' }, async function ({ pickle, result }) {
    console.log("Attachments are being processed AFTER non-api scenarios");

    let videoPath: string;
    let img: Buffer;
    const path = `./test-results/trace/${pickle.id}.zip`;
    videoPath = await fixture.page.video().path();

    await context.tracing.stop({ path: path });
    this.attach(
        fs.readFileSync(videoPath),
        'video/webm'
    );

    if (result?.status == Status.FAILED) {
        console.log("this scenario failed at this step");
    }
    const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`
    this.attach(`Trace file: ${traceFileLink}`, 'text/html');
    console.log("Attachments processed AFTER non-api scenarios");
    fixture.logger.info(`After Scenario: ${pickle.name}`);

    await fixture.page.close();
    await context.close();

    // close browser
    console.log("After this SCENARIO");
    if (browser !== null && browser !== undefined) {
        await browser.close();
        console.log("Browser closed");
    }

});

AfterAll(async function () {
    console.log("After All scenarios");
    //await context.close();
    // close browser
    if (browser !== null && browser !== undefined) {
        await browser.close();
        console.log("Browser closed");
    }
});

function getStorageState(user: string): string | { cookies: { name: string; value: string; domain: string; path: string; expires: number; httpOnly: boolean; secure: boolean; sameSite: "Strict" | "Lax" | "None"; }[]; origins: { origin: string; localStorage: { name: string; value: string; }[]; }[]; } {
    if (user.endsWith("admin"))
        return "src/helper/auth/adminAgent.json";
    else if (user.endsWith("user"))
        return "src/helper/auth/userAgent.json";
}

BeforeStep(async function () {
    console.log("Before Step");
});

AfterStep({ tags: "not @api" }, async function ({ pickle }) {
    console.log("After Step");
    let img: Buffer;
    img = await fixture.page.screenshot(
        { path: `./test-results/screenshots/${pickle.name}.png`, type: "png" });

    this.attach(img, "image/png");
    console.log("Screenshot taken after this step");
});
