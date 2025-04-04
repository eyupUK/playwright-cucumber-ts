import { BeforeAll, AfterAll, Before, After, Status, BeforeStep, AfterStep } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser, browserType } from "../helper/browsers/browserManager";
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
Before({ tags: "not @auth" }, async function ({ pickle }) {
    console.log("Scenario: " + pickle.name);
    console.log("Browser is set BEFORE for non-auth scenarios");
    browser = await invokeBrowser();
    console.log("Browser is set to " + browserType);
    console.log("Scenario: " + pickle.name);
    const scenarioName = pickle.name + pickle.id;
    context = await browser.newContext({
        //viewport: { width: 1470, height: 832 },
        recordVideo: {
            dir: "test-results/videos",
            //size: { width: 1470, height: 832 }
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
    fixture.logger.info("Browser is set to " + browserType);
    fixture.logger.info(`Before Scenario: ${ pickle.name }`);
});


// It will trigger for auth scenarios
Before({ tags: '@auth' }, async function ({ pickle }) {
    console.log("Scenario: " + pickle.name);
    console.log("Browser is set BEFORE for auth scenarios");
    browser = await invokeBrowser();
    console.log("Browser is set to " + browserType);
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
    fixture.logger.info("Environment set to: " + environment);
    fixture.logger.info("Browser is set to " + browserType);
    fixture.logger.info(`Before Scenario: ${ pickle.name }`);
});

After(async function ({ pickle, result }) {
    console.log("Attachments are being processed in AFTER");

    let videoPath: string;
    let img: Buffer;
    const path = `./ test - results / trace / ${ pickle.id }.zip`;
    videoPath = await fixture.page.video().path();

    await context.tracing.stop({ path: path });
    await this.attach(
        fs.readFileSync(videoPath),
        'video/webm'
    );

    if (result?.status == Status.FAILED) {
        console.log("this scenario failed at this step");
    }
    const bashCommandTrace = `npx playwright show-trace ${ path }`;
    const traceFileLink = `<a href="https://trace.playwright.dev/" > Open ${ path } </a>`
    await this.attach(`Trace file: ${ traceFileLink }`, 'text/html');
    await this.attach(`Command for Trace File: ${ bashCommandTrace }`, 'text/html');
console.log("Attachments processed AFTER non-api scenarios");
fixture.logger.info(`After Scenario: ${ pickle.name }`);

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
    // close browser
    if (browser !== null && browser !== undefined) {
        await browser.close();
        console.log("Browser closed");
    }
});

function getStorageState(user: string): string | { cookies: { name: string; value: string; domain: string; path: string; expires: number; httpOnly: boolean; secure: boolean; sameSite: "Strict" | "Lax" | "None"; }[]; origins: { origin: string; localStorage: { name: string; value: string; }[]; }[]; } {
    if (user.endsWith("admin")) {
        return "src/helper/auth/admin.json";
    }
    else if (user.endsWith("user")) {
        return "src/helper/auth/user.json";
    }
}

BeforeStep(async function () {
    console.log("Before Step");
});

AfterStep({ tags: "not @api" }, async function ({ pickle }) {
    console.log("After Step");
    let img: Buffer;
    img = await fixture.page.screenshot(
        { path: `./ test - results / screenshots / ${ pickle.name }.png`, type: "png" });

await this.attach(img, "image/png");
console.log("Screenshot taken after this step");
});