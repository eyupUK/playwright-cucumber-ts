export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: "chromium" | "firefox" | "webkit",
            ENV: "staging" | "prod" | "QA" | "dev",
            BASEURL: string,
            HEAD: "true" | "false",
            TESTDATA_PATH: string
        }
    }
}
