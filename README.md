# Playwright + Cucumber + TS

Cucumber is a popular behavior-driven development (BDD) tool that allows developers and stakeholders to collaborate on defining and testing application requirements in a human-readable format. 
TypeScript is a powerful superset of JavaScript that adds optional static typing, making it easier to catch errors before runtime. By combining these two tools, we can create more reliable and maintainable tests.

## Features

1. Awesome report with screenshots, videos & logs
2. Execute tests on multiple environments 
3. Parallel execution
4. Rerun only failed features
5. Retry failed tests on CI
6. Github Actions integrated with downloadable report
7. Page object model

## Sample report


## Project structure

- .github -> yml file to execute the tests in GitHub Actions
- src -> Contains all the features & Typescript code
- test-results -> Contains all the reports related file

## Reports

1. [Mutilple Cucumber Report](https://github.com/WasiqB/multiple-cucumber-html-reporter)
2. Default Cucumber report
3. [Logs](https://www.npmjs.com/package/winston)
4. Screenshots of failure
5. Test videos of failure
6. Trace of failure

## Get Started

### Setup:

1. Clone or download the project
2. Extract and open in the VS-Code
3. Cmd to install dependencies
```bash
npm i ts-node -D
```
4. to install the dependencies
```bash
npm i
```
5.  to install the browsers
```bash
npx playwright install
```
6. to execute the tests
```bash
npm run test
``` 
7. To run a particular test, change:  
```
  paths: [
            "src/test/features/featurename.feature"
         ] 
```
8. Use tags to run a specific or collection of specs:
```bash
npm run test --tags="@ask"
```
9. Run scenarios on a specific browser, assigning chromium, firefox or webkit(safari) to the key browser:
```bash
BROWSER=firefox npm run test --tags="@admin"
```
if browser kept empty, the framework fetch the browser type from .env file.
If the browser is empty or unassigned in .env file, browserManager.ts will assign the default browser.

10. Rerun failed sceanarios after the test execution by
```bash
npm run test --tags="@regression"
npm run test:failed
```

11. To install Allure Report:
```bash
npm install -g allure-commandline --save-dev
npm install --save-dev @cucumber/cucumber @cucumber/messages allure-cucumberjs
```

12. To generate Allure Report:
```bash
allure serve allure-results
```
13. To run parallel:
```bash
PARALLEL=<numberOfThread> npm run test
```
14. To run tests in headless mode:
```bash
HEAD=false npm run test
```


### Folder structure
0. `src\pages` -> All the page (UI screen)
1. `src\test\features` -> write your features here
2. `src\test\steps` -> Your step definitions goes here
3. `src\hooks\hooks.ts` -> Browser setup and teardown logic
4. `src\hooks\pageFixture.ts` -> Simple way to share the page objects to steps
5. `src\helper\env` -> Multiple environments are handled
6. `src\helper\types` -> To get environment code suggestions
7. `src\helper\report` -> To generate the report
8. `config/cucumber.js` -> One file to do all the magic
9. `package.json` -> Contains all the dependencies
10. `src\helper\auth` -> Storage state (Auth file)
11. `src\helper\util` -> Read test data from json & logger


## Folder Structure

```
Playwright-Cucumber-TS
├── .github
│   └── workflows
│       └── ci.yml
├── src
│   ├── pages
│   │   └── examplePage.ts
│   ├── test
│   │   ├── features
│   │   │   └── example.feature
│   │   ├── steps
│   │   │   └── exampleSteps.ts
│   ├── hooks
│   │   ├── hooks.ts
│   │   └── pageFixture.ts
│   ├── helper
│   │   ├── env
│   │   │   ├── .env.dev
│   │   │   └── .env.test
│   │   ├── types
│   │   │   └── types.ts
│   │   ├── report
│   │   │   └── reportGenerator.ts
│   │   ├── auth
│   │   │   └── auth.ts
│   │   ├── util
│   │   │   ├── testData.ts
│   │   │   └── logger.ts
│   │   ├── wrapper
│   │   │   └── wrapper.ts
│   │   ├── browsers
│   │   │   └── browserManager.ts
│   │   └── util
│   │       └── test-data
│   │           └── exampleData.json
├── config
│   └── cucumber.js
├── test-results
│   └── exampleReport.html
├── package.json
└── README.md
```

