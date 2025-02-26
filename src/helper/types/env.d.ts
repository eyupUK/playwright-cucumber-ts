export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: "chromium" | "firefox" | "webkit",
            ENV: "staging" | "prod" | "QA" | "dev",
            BASEURL: string,
            HEAD: "true" | "false",
            TESTDATA_PATH_A_APP: string
            TESTDATA_PATH_B_APP: string
        }
    }
}