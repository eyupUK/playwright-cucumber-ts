import { Locator, Page } from "@playwright/test";

export default class PlaywrightWrapper {
  constructor(private readonly page: Page) {}

  async goto(url: string) {
    await this.page.goto(url, {
        waitUntil: "domcontentloaded"
    });
}

  async waitAndClick(locator: string) {
    const element = this.page.locator(locator);
    await element.waitFor({
      state: "visible",
      timeout: 10000
    });
    await element.click();
  }

  async waitAndClickFirst(locator: string) {
    const element = this.page.locator(locator).first();
    await element.waitFor({
      state: "visible",
      timeout: 10000
    });
    await element.click();
  }

  async waitAndClickFirstLocator(locator: Locator) {
    const element = locator;
    await element.waitFor({
      state: "visible",
      timeout: 10000
    });
    await element.click();
  }

  async navigateTo(link: string) {
    await Promise.all([this.page.waitForNavigation(), this.page.click(link)]);
  }

  async fillText(locator: string, text: string) {
    const element = this.page.locator(locator);
    await element.waitFor({
      state: "visible",
      timeout: 10000
    });
    await element.fill(text);
  }

  async waitForSelector(selector: string) {
    await this.page.waitForSelector(selector, { state: "visible" });
    console.log(`Element located: ${selector}`);
  }
  async waitAndFill(selector: string, text: string) {
    // Wait for the element to be visible
await this.waitForSelector(selector);
    // Fill the text in the element
    const element = this.page.locator(selector);
    await element.fill(text);
    console.log(`Filled text "${text}" in the element: ${selector}`);
  }

    async countOfElements(locator: string){
        return (await this.page.locator(locator).count());
    }

    async getElementText(locator: string) {
        const element = await this.page.locator(locator);
        await element.waitFor({
            state: "visible",
            timeout: 5000
        });
        return await element.innerText();
    }

    async isElementVisible(locator: string){
        return await this.page.locator(locator).first().isVisible();
    }

    async sleep(second: number): Promise<void> {
      return new Promise(resolve => setTimeout(resolve, second * 1000));
    }

    async  waitForIdle (page: Page) {
      await this.page.waitForLoadState("domcontentloaded");
      await this.page.waitForLoadState("load");
      await this.page.waitForLoadState("networkidle");
    };
}
