import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";

const options: LaunchOptions = {
    headless: false,
    slowMo: 50,
    timeout: 60000,
    args: ['--start-fullscreen', '--start-maximized']
}
// args: ['--start-fullscreen', '--start-maximized']
export let browserType: string;
export const invokeBrowser = () => {
    browserType = process.env.npm_config_browser || process.env.BROWSER || "webkit";
    console.log("Launching " + browserType + " browser");
    switch (browserType) {
        case "chromium":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        default:
            throw new Error("Please set the proper browser!")
    }
}
