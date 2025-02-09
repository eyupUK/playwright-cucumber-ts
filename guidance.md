# Automation Framework Guidance
This document provides an overview of the automation framework used in this project, covering its components, structure, and how to extend or implement new features. This will serve as a guide for any new automation test engineer joining the team.

Creating a guidance.md file for our automation framework is a great idea to ensure that future automation engineers can easily understand and work with our framework. Since our framework uses Playwright, Cucumber BDD, TypeScript, and is integrated with GitHub Actions for CI/CD, we’ll break the guidance down into sections that address these key aspects of our setup.

## Contents
### [Overview](#1-framework-overview)
### [Directory Structure](#2-directory-structure)
### [Setting Up The Framework](#3-setting-up-the-framework)
### [Explanation of All Components](#4-explanation-of-all-components)
### [Conventions and Restraints](#5-conventions-and-restraints)
### [API Testing Restrains](#api-testing) 
### [UI Testing Restrains](#ui-testing) 
### [Picking of Environment, Browser, or Scenarios](#6-picking-of-specific-environment-browser-or-scenarios)

## 1. Framework Overview
### Purpose
This automation framework is built using Playwright, Cucumber BDD, and TypeScript. It is designed to facilitate the automation of end-to-end tests with clear, readable, and maintainable code. The framework also integrates with GitHub Actions to run continuous integration (CI) pipelines.

**Key Technologies:**

**•	Playwright:** Used for browser automation and interacting with web pages.

**•	Cucumber BDD:** Implements Behavior-Driven Development (BDD) for writing human-readable test scenarios.

**•	TypeScript:** Ensures type safety and better maintainability.

**•	GitHub Actions:** Automates the running of tests during CI/CD.

## 2. Directory Structure
Here is an overview of the project directory structure, which will help us understand where the different components are located:

### Playwright-TS-Cucumber project
```console
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
│   │   │   └── environment.ts
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

## 3. Setting Up the Framework
To get started, follow these steps to set up the project locally:

**Clone the Repository:**
```bash
git clone https://github.com/AVRillo-RD/qa-automation-legacy.git
cd <project-directory>
```
**Install Dependencies**

Make sure we have Node.js and npm/yarn installed, then run:
```bash
npm i
```

**Install ts-node:**
```bash
npm i ts-node -D
```

**To run:**
```bash
npm run test
```
### [Go to the top](#automation-framework-guidance)
## 4. Explanation of All Components
### A. cucumber.js
![cucumber.js](images/cucumber_config.png)
The cucumber.js file is the configuration file for Cucumber in our automation framework. It defines how Cucumber should run our tests, what resources it should use, and how it should format its output. There are two primary configurations here: default and rerun. Let's break it down:

**module.exports:**
This is where we export the configuration object. Cucumber reads this file and uses the settings defined here to execute the tests. The module.exports object has two sections, default and rerun, each specifying different configurations depending on the context (i.e., normal run vs. rerun of failed tests).

**default configuration:**
This is the main configuration used when we run our Cucumber tests. It defines how the tests will behave during a typical test execution.

1. 
```javascript
tags: process.env.npm_config_tags || ""
```

•	This allows us to filter which scenarios or features to run based on tags.

•	***process.env.npm_config_tags*** pulls the tags specified through the command line (e.g., **npm run test --tags="@smoke"**).

•	If no tags are provided, it defaults to an empty string, meaning no filtering.

2. 
```javascript
formatOptions: {
    snippetInterface: "async-await"
}
```

•	snippetInterface: "async-await" tells Cucumber to generate step definitions using the async/await syntax (which is modern and recommended for asynchronous code).

3. 
```javascript
paths: [
    "src/test/features/"
]
```

•	Specifies the location of the feature files (written in Gherkin syntax).

•	Cucumber will look in this directory for all ***.feature*** files that define our test scenarios.

4. 
```javascript
dryRun: false
```

•	This tells Cucumber whether to actually run the tests or just check that all the steps in the feature files have corresponding step definitions.

•	If set to true, it will just check for missing steps but not actually run the tests.

•	Since it is false here, Cucumber will execute the tests.

5. 
```javascript
require: [
    "src/test/steps/**/*.ts",
    "src/hooks/hooks.ts"
]
```

•	This array specifies the files that should be required (loaded) before the tests are executed.

•	src/test/steps/**/*.ts includes all the TypeScript files containing step definitions.

•	**src/hooks/hooks.ts** includes the hooks that handle setup and teardown (e.g., launching the browser, initializing data).

6. 
```javascript
requireModule: [
    "ts-node/register"
]
```
•	This is used to register ts-node for handling TypeScript files.

•	It allows Cucumber to run TypeScript files without needing to compile them separately.

7. 
```javascript
format: [
    "progress-bar",
    "html:test-results/cucumber-report.html",
    "json:test-results/cucumber-report.json",
    "rerun:@rerun.txt"
]
```

•	This array defines how the test results will be formatted and where they should be output.

•	progress-bar: Shows a progress bar in the terminal as the tests run.

•	html:test-results/cucumber-report.html: Outputs a detailed HTML report of the test run.

•	json:test-results/cucumber-report.json: Outputs a JSON file with the test results.

•	rerun:@rerun.txt: Generates a rerun.txt file that lists failed scenarios, which can be used for re-running only the failed tests.

8. parallel: 5

•	If enabled, this would run the tests in parallel, with up to 5 test processes.

•	This line is currently commented out, but if enabled, it would improve test execution time by distributing the tests across multiple processes.

**rerun configuration:**
•	The rerun configuration is used when we want to re-run only the failed tests from a previous test run.

**retry:**
•	This tells Cucumber to retry any failed tests up to 2 times. This is useful for flaky tests that might fail intermittently.

**Recap:**
•	default is used for normal test runs, where we define the basic configuration like paths, step definitions, and output formats.

•	rerun is used for re-running failed tests, with additional options like parallel (to run tests in parallel) and retry (to retry failed tests a certain number of times).

•	Both configurations share similar properties like require, requireModule, format, and dryRun, but the •	rerun configuration has additional settings to handle parallel execution and test retries for failed tests.

•	This configuration allows our team to run and rerun tests efficiently while generating useful reports and managing the environment-specific tags.
### [Go to the top](#automation-framework-guidance)
### B. Authentication with auth.json
![auth.json](images/auth_json.png)
1. Using storageState in Playwright is a powerful technique for skipping authentication steps in UI tests. By leveraging storageState, we can save the browser's authenticated session to a file (e.g., auth.json) and then load that session for subsequent test runs. This eliminates the need to repeatedly perform the authentication steps (such as logging in with credentials) for each test, speeding up our test execution.

**What is storageState?**
storageState is a Playwright feature that saves the browser context’s authentication state, including cookies, local storage, and session storage, to a file. This allows Playwright to reuse the session without needing to go through the login process again.

**Steps to use storageState in Hooks for UI Testing:**
Let's assume we have a test suite that requires authentication to access protected pages. Instead of re-logging in for every test, we can save the authentication state after logging in once and then reuse that state in future tests.

**Steps for Creating or Verifying the adminAgent.json:**

**Log in Manually Once:**

Manually run a test or a script to log in to the application and generate the auth.json file using storageState.
Create the adminAgent.json Manually: If adminAgent.json is the file holding authentication cookies, make sure it’s created when the tests run for the first time. The session storage can be saved like this:
```javascript
// Saving the storage state after login. Add this line at the end of loginAsAdmin() to record login state to use as a cookie for the future executions
await page.context().storageState({ path: 'src/helper/auth/adminAgent.json' });
```
**Verify the File Exists:**
After running the test with the login, check if the adminAgent.json file is generated in the correct directory (src/helper/auth/).
Ensure Valid JSON Format:
If the file is present, ensure it’s valid JSON. We can inspect it manually or parse it programmatically.

2. **Using the Saved auth.json (Subsequent Runs)**
In subsequent tests, instead of performing the login steps again, we can load the saved authentication state from auth.json. This will automatically restore the session, allowing us to bypass the login process and move straight to the actions that require authentication.

**Add this block into Before() of hooks.ts:**
```javascript
      // Load the saved authentication state (auth.json)
      if(pickle.name.endsWith("admin")){
        const authState = require('../helper/auth/adminAgent.json');
        await page.context().addCookies(authState.cookies);
      }
```

**What happens in the Before hook above?**

The browser is launched, but this time, instead of going through the login process, we load the saved auth.json file, which contains the cookies and other session data.
The addCookies() function is used to load the cookies stored in the auth.json file.
After loading the authentication state, we can directly navigate to the protected page (e.g., the dashboard) as the user is already authenticated.

**Explanation of Key Points:**

**Saving storageState:** In the first test run or dedicated login test, the storageState is saved after successful authentication. This captures the current session's cookies, localStorage, sessionStorage, etc.

**Reusing the Saved State:** In future tests, instead of performing the login steps, we simply load the saved authentication state from auth.json. This restores the session, allowing us to skip the login process.

**Cookies and LocalStorage:** When we load storageState, Playwright restores the cookies and storage data that were saved. This mimics the behavior of an already logged-in user.

**Benefits:**

**Faster Execution:** 
Skipping the login process speeds up the execution time of tests that require authentication.

**Less Flaky Tests:** 
Eliminates the possibility of failures related to the login flow (e.g., UI changes in the login page).

**Simplified Test Flow:** Once the login state is stored, we can focus on testing the application features, without needing to worry about authentication in each test.

**Best Practices:**

**Store auth.json securely:** Make sure the auth.json file is stored in a secure, non-public location if it contains sensitive data. We may want to add it to .gitignore to avoid accidentally committing it to version control.

**Handle invalidated sessions:** Ensure that our tests handle scenarios where the session might expire or become invalid (e.g., test failures might cause cookies to become stale).

**Clear session when needed:** If we need to clear the session between tests (e.g., logout functionality), we can call **page.context().clearCookies()** or reset the storage.
### [Go to the top](#automation-framework-guidance)
### C. browserManager.ts
![browser manager](images/browserManager.png)
This TypeScript file is responsible for launching a browser using Playwright based on the environment configuration, specifically allowing the choice of Chromium, Firefox, or Webkit. It provides flexibility to switch between browsers dynamically by reading environment variables, and it configures the browser launch options.

**invokeBrowser Function:**
This function is the core part of this file. It determines which browser to launch based on environment variables and returns the corresponding Playwright browser object.

**process.env.npm_config_browser:** This checks the environment variable that may be passed during the execution of the test command, like:
```bash
npm config set browser=webkit
npm run test --tags="@admin"
```
**process.env.BROWSER:** This is another environment variable that can be used to specify the browser type. If npm_config_browser isn't set, Playwright will fall back to this variable.

**"webkit":** If neither npm_config_browser nor BROWSER is set, this defaults to launching the Webkit browser, which is the engine behind Safari.

#### **How it Works:**
**Environment Variables:** We can control which browser to launch using either the environment variable npm_config_browser (passed during npm run or npm test commands) or the BROWSER environment variable.

**Launching the Browser:** Based on the value of browserType, the appropriate browser is launched (Chromium, Firefox, or Webkit) with the options defined in the options object (in this case, with a visible GUI).

**Options Configuration:** The headless option is explicitly set to false, meaning the browser will be launched with a UI.

**Error Handling:** If an unsupported browser is specified, an error is thrown, indicating that the proper browser hasn't been set.

**Summary of Key Points:**

This file allows dynamic selection of the browser to run Playwright tests in, based on environment variables (npm_config_browser or BROWSER).

The browser is launched using Playwright's respective browser launch function (chromium.launch, firefox.launch, webkit.launch).

The headless option is explicitly set to false, meaning the browser will be launched with a visible UI.

If no browser is specified or an invalid browser is provided, an error is thrown.

This approach is useful in scenarios where we want to run our tests on different browsers, e.g., testing cross-browser compatibility. 

We can control which browser to use at runtime through environment configuration, and it helps streamline our testing workflow.

### D. src/helper/env/.env.*
![env.staging](images/env.staging.png)
The .env file is a standard way of defining environment variables in a project. These variables can be used to configure settings without hardcoding them directly in our application code. Environment variables help manage different configurations for various environments, such as development, staging, and production.
### [Go to the top](#automation-framework-guidance)
### E. src/helper/env/env.ts
![env.ts](images/env.png)
This TypeScript file is typically used to load the environment variables from the .env file and make them available throughout our application or tests. The env.ts file usually imports a library like dotenv to load the .env file and then uses the variables in the tests or other components.

**process.env.ENV:** This checks if the ENV environment variable is defined in the system. The value of process.env.ENV can be set in the environment or passed when starting the application (e.g., npm start --ENV=production).
If process.env.ENV is not defined, it defaults to "staging", meaning that if no specific environment is provided, it will automatically use the staging environment by default.


**dotenv.config():** This function is used to load the .env file and make the environment variables defined in it available throughout our Node.js application (in process.env).

**override:** true: This option ensures that the environment variables defined in the .env file will override any existing values in process.env. For example, if process.env.BASEURL_AGENT is already set to a value, but the .env file contains a different value for BASEURL_AGENT, the value from the .env file will overwrite the existing one.

**path:** src/helper/env/.env.${process.env.ENV}: This specifies the path of the .env file to load based on the environment (process.env.ENV). The .env file path is dynamically constructed by appending the value of process.env.ENV to the string src/helper/env/.env..

**For example:**
If process.env.ENV is set to "staging", the path becomes src/helper/env/.env.staging, which is the file containing the environment variables for the staging environment.
If process.env.ENV is set to "production", the path would be src/helper/env/.env.production.
If process.env.ENV is not set, it logs an error message: console.error("NO ENV PASSED!"). This ensures that the developer knows they need to specify which environment to use.

**How it Works:**

Step 1: The getEnv function is called, and it checks if the ENV environment variable is set.

Step 2: If the ENV variable is set (e.g., "staging"), it will load the corresponding .env.staging file by calling dotenv.config() with the correct file path.

Step 3: If ENV is not provided, the function logs an error message, notifying the user to specify an environment.

Step 4: After loading the .env file, the environment variables inside that file are available in the process.env object, and they can be accessed throughout the application or tests.

### [Go to the top](#automation-framework-guidance)
### F. src/helper/report/init.ts
![init.ts](images/init.png)
This TypeScript file (init.ts) is designed to ensure that a specific directory exists (in this case, test-results), and if it exists, it clears the contents of the directory before proceeding with test result generation. This is typically useful for maintaining a clean state between test runs, especially in continuous integration (CI) or automated testing environments where test reports are generated after each test execution

**Summary of What This Code Does:**

It first attempts to ensure the test-results directory exists.
If the directory exists or is created, it will then empty the directory to remove any leftover files from previous test runs.
If an error occurs during either of these steps (creating or clearing the directory), it logs an error message to the console.

**Why Is This Useful?**

Pre-Test Setup: This ensures that the test-results folder is always prepared for the test results to be written to. It’s often used in automation testing pipelines to clean up any old test data before running the tests.

Consistency: By clearing the test-results directory before each run, we avoid mixing up old test results with the current ones. This is especially useful when we need to generate reports, such as Cucumber HTML or JSON reports, for each test run.

Automation and CI/CD Pipelines: In a CI/CD context (like GitHub Actions or Jenkins), the test reports often need to be generated after each test execution. This script helps in ensuring the correct file structure exists and is clean before the tests start.
### [Go to the top](#automation-framework-guidance)
### G. src/helper/report/report.ts
![report.ts](images/report.png)
The code we've provided is used to generate an HTML report from test results. It utilizes the multiple-cucumber-html-reporter library to convert JSON test results (likely from Cucumber tests) into a formatted HTML report.

**Purpose of This Code**

The primary purpose of this code is to generate a nicely formatted HTML report that summarizes the results of a test suite run. It pulls the test results from JSON files, adds custom metadata (such as browser version, platform, and other information), and then generates an HTML report that can be shared or viewed to analyze the test results.

This is commonly used in automated testing environments, particularly when using tools like Cucumber (or other BDD frameworks), to report on the success or failure of different test scenarios.
### [Go to the top](#automation-framework-guidance)
### H. src/helper/types/env.d.ts
![types](images/types.png)
This defines custom types for the environment variables used in our project. It helps TypeScript understand the types of environment variables that can be accessed within our Node.js process.

**Purpose of This File**

This TypeScript declaration file ensures that TypeScript has type information for all the environment variables we're using in our Node.js application. By providing these types:

**Type safety:** It helps TypeScript catch errors if we try to access an environment variable incorrectly (e.g., mistyped or using an unsupported value).

**IntelliSense:** Editors like Visual Studio Code can provide suggestions and autocompletion for these variables, making it easier to work with them.

**Consistency:** It enforces that only valid values (e.g., "chromium", "firefox", or "webkit") are allowed for certain environment variables, helping prevent issues that may arise from incorrect configurations.

In essence, this is a way of documenting and enforcing the shape of our environment variables so that our code can rely on them being of the expected types, making development and debugging easier.
### [Go to the top](#automation-framework-guidance)
### I. src/helper/util/apiUtils.ts
![api utils](images/apiUtils.png)
This defines a TypeScript class APIUtils that simplifies making HTTP requests using the axios library. Here's an explanation of its components:

**1. Imports:**
It imports required libraries.

**2. Class APIUtils:**
The class contains a utility function sendRequest that can make various types of HTTP requests (e.g., GET, POST, etc.).

**3. Constructor:**
The constructor is empty, but it's present for potential future use if needed for initialization.

**4. sendRequest Method:**
This is the core function in the class, responsible for sending HTTP requests.

**Parameters:**

**base:** The base URL for the API.

**method:** The HTTP method (e.g., GET, POST, PUT, DELETE).

**endpoint:** The specific API endpoint to append to the base URL.

**data:** The request body (optional, and usually used for POST, PUT, etc.).

**headers:** Optional headers for the request (e.g., Authorization, Content-Type).

**queryParams:** Optional query parameters to be added to the URL (used for GET, DELETE, etc.).

**Process:**

It constructs the full URL by concatenating the base URL with the endpoint.

Then, it creates an axios configuration object with the specified HTTP method, URL, request body (data), headers, and query parameters.

**axios Call:**

It uses axios to make the request with the given configuration.

If the request succeeds, it returns the AxiosResponse.

If the request fails (e.g., due to network issues or server errors), it logs the error and throws it again for handling by the caller.

**Return Type:** It returns a 
```javascript
Promise<AxiosResponse>
```
 which means the caller needs to handle the promise (either using .then() or await).

**5. Error Handling:**

If there is an error while making the request (e.g., network issues, incorrect API endpoint), the error is logged to the console, and the error is thrown again for further handling (which can be done in the calling function).

**Summary:**

APIUtils is a utility class that simplifies making HTTP requests by providing a reusable method, sendRequest, which handles sending requests with configurable HTTP methods, headers, query parameters, and data. This utility helps streamline the process of interacting with APIs while keeping the code modular and reusable.
### [Go to the top](#automation-framework-guidance)
### J. src/helper/util/logger.ts
![logger.ts](images/logger.png)
This is used to configure a logger for our application, specifically using the Winston logging library. Winston is a popular logging library in Node.js that provides flexible logging capabilities, such as logging to files, console, and other outputs.

**Benefits of This Approach**

Dynamic Log Files: By using the scenarioName in the filename, we ensure that each scenario gets its own log file. This is especially useful in testing environments where we need to isolate logs for each test case.

Custom Formatting: The log messages are formatted with a timestamp, log level, and message, making them easy to read and understand when analyzing the logs later.

Log Level Control: The level: 'info' setting ensures that only messages of level info and higher are logged. This prevents unnecessary debug-level logs from cluttering the log file in production or test environments.

File Logging: This configuration writes logs to files rather than just the console, which is important when we need to persist logs for future reference or debugging.

This logging setup is useful for applications, especially test suites or automated systems, where we want to keep detailed logs of each test scenario in a structured way.

### [Go to the top](#automation-framework-guidance)
### K. src/helper/wrapper/PlaywrightWrapper.ts
![PlaywrightWrapper.ts](images/playwrightWrapper.png) 
This file defines a wrapper class for interacting with Playwright, a powerful automation framework for browser testing. The class, PlaywrightWrapper, provides helper methods that simplify interaction with a page during tests or automation tasks.

This class wraps around Playwright's Page object and provides additional utility methods to interact with the page, handle elements, and manage waiting and timing for different actions.

**Summary of Usage**

The PlaywrightWrapper class simplifies interaction with Playwright by providing reusable methods for common tasks like navigating to URLs, clicking elements, filling forms, waiting for elements, checking visibility, and more. It helps in writing more concise and readable test scripts by abstracting complex Playwright logic into easy-to-use helper functions.
### [Go to the top](#automation-framework-guidance)
### L. src/hooks/pageFixture.ts
![pageFixture.ts](images/pageFixture.png)
This file defines a fixture object that holds references to the Page object from Playwright and a Logger object from Winston. These fixtures are typically used to provide shared resources or setup for the tests.

**Why use this pattern?**

Fixtures like this one are common in test automation frameworks, and this pattern helps with a few key things:

Sharing Resources: The page and logger objects can be shared across different test cases. For example, if we have multiple tests that need to interact with a page or log data, we can use this fixture to make sure the resources are available without having to set them up in each individual test.

Centralized Setup: This object could be populated during a test setup phase. For example, we might have a test runner that assigns a Page instance to fixture.page before running tests and initializes logger before logging any test results.

Improved Test Readability: By using a fixture, we make it clearer that our tests rely on these shared objects (page, logger). This simplifies test code, especially when it comes to setting up the environment for each test.
### [Go to the top](#automation-framework-guidance)
### M. src/hooks/hooks.ts
![hooks.ts](images/hooks.png)
This file sets up hooks for the Cucumber test framework to manage Playwright browser context and logging before and after each scenario or step in a test suite. This is an important part of test automation, as it helps initialize and clean up resources (like browser instances, pages, and logs) at appropriate points in the test lifecycle.

**Cucumber Hooks:** These are lifecycle hooks provided by Cucumber (BeforeAll, AfterAll, Before, After, BeforeStep, AfterStep) to execute code at specific points during the test run.

**Playwright Types:** Browser and BrowserContext are used for managing browser instances and contexts (individual browser sessions).

**Helper Functions:**

**fixture:** Provides access to shared resources like the browser page and logger.

**invokeBrowser:** Function to launch a browser instance (likely managed by browserManager).

**getEnv:** Retrieves environment variables for configuring the test run.

**Logger:** Winston-based logger for recording events during test execution.

**fs-extra:** File system operations, like reading files or managing test artifacts (like video files, screenshots, etc.).

**Before Hook (For Non-Auth and Non-API Scenarios):**
This hook runs before each scenario that **doesn't** have @auth or @api tags.

**Before Hook (For Auth Scenarios):**
This hook runs before each scenario with the **@auth tag**.
Similar to the previous hook, a browser is launched and a context is created.

This time, the storageState (containing authentication information) is loaded from a file (e.g., auth.json) via the getStorageState() function. This ensures the scenario is authenticated.

**After Hook (For Non-API Scenarios):**
This hook runs after each scenario that **doesn't** have the @api tag.

It processes attachments such as video recordings and trace files.

The video is saved in test-results/videos.
A trace file (containing a detailed breakdown of the browser's activity) is saved and linked.

If the scenario failed, additional information is logged.
Finally, the page and context are closed, and the browser is closed if it is still running.

**BeforeStep and AfterStep Hooks**

BeforeStep: Logs a message before each test step.
AfterStep: For scenarios **without the @api tag**, it takes a screenshot after each step and attaches the image to the report.

**getStorageState Function:**
This function returns the storage state (e.g., authentication cookies and local storage) for different types of users (admin or user).

**Summary**

This file sets up Cucumber hooks to manage browser contexts, tracing, video recordings, and logging for different types of test scenarios (auth, non-auth, API, non-API).

BeforeEach: Initializes browser and context, with configurations for video recording and tracing.

AfterEach: Processes attachments (like videos, screenshots, and trace files), logs the results, and closes the browser.

Logger: Winston is used to create logs for each scenario and step.

Test Environment Setup: Uses environment variables and manages authentication states for different user roles.

This setup ensures efficient resource management, detailed reporting, and the capture of useful artifacts for debugging and analysis.

### [Go to the top](#automation-framework-guidance)
### N. Sample of POM class: src/pages/agentApp/quoteRequestPage.ts
![quoteRequestPage.ts](images/pom.png) 

This TypeScript file is for a page object model in the context of Playwright testing. It defines a QuoteRequestPage class, which helps automate interactions on a web page related to requesting a quote. Here's a summary of the code:

**Imports and Dependencies:**

It imports necessary tools from Playwright and other helper functions and data like faker and test data.

PlaywrightWrapper is a custom wrapper for Playwright functions, presumably designed to make interactions with the page easier.
Elements:

It contains various selectors (XPath or CSS) for the elements on the quote request page. These selectors help locate the UI elements like buttons, input fields, and dropdowns that the test interacts with.
Constructor:

The constructor accepts a Page object (from Playwright) and initializes a PlaywrightWrapper for easier interaction with the page.
Methods:

Several methods are defined to interact with the page:

**selectAllEstateAgent:** Clicks and selects an estate agent from a dropdown.

**selectAllBranches:** Selects a branch from a dropdown.

**fillName, fillPhone, fillEmail, etc.:** Methods to fill in the form with specific data (like name, email, etc.).

**selectNegotiator:** Selects a negotiator from the dropdown.

clickRequestQuoteButton: Clicks the button to submit the quote request.

**Form Filling:**
The fillForm method combines various interactions to fill the entire form, including selecting estate agents, entering personal details, address, and more.

**Verification:**
verifyQuoteRequestCreated verifies that the quote request was successfully created by filtering and checking that the client's details appear correctly in a table.

**Test Data:**
It uses a combination of static data from jsonData and dynamic data from faker to populate the form fields (like names, email, phone number).

***This class encapsulates interactions with the quote request page, making the tests more modular and easier to maintain.***
### [Go to the top](#automation-framework-guidance)
### O. Sample of Feature File: src/test/features/uiFeatures/agentApp/askAvrilloToQuote.feature
![askAvrilloToQuote.feature](images/featureFile.png)
This file appears to be a Cucumber feature file written in Gherkin syntax for behavior-driven development (BDD). It defines a feature for testing the "Ask Avrillo to Quote" functionality of an Agent App

**Feature:**
The feature section outlines the main functionality being tested, which is:

"Ask Avrillo to Quote Feature of Agent App"
The feature is described as the process where a user can request a quote through the application.

**Acceptance Criteria:**
These are the conditions that the test scenarios aim to validate:

The user should be able to create a quote request successfully.
The user should be able to view the quote in the list of quote requests.

**Background**

The background section is executed before each scenario:

Given the user navigates to the application.
And the user logs in to the application.
This sets up the context, ensuring that the user is authenticated and on the right page to perform the actions in the test.

Scenario: User should be able to create a Quote request successfully
This scenario is tagged with @smoke, indicating that it is a critical test (smoke test) to verify the basic functionality of quote creation.

Given User clicks on the "Ask Avrillo to Quote" from sidebar: The user clicks on the "Ask Avrillo to Quote" option from the sidebar, initiating the quote request process.

When User clicks on the "Request a quote" button: This action simulates the user clicking the button to start the quote request process.

And User clicks on Yes of Consent popup: The user confirms consent in a popup, typically an agreement or acknowledgment before proceeding.

And User fills out the quote form with valid data: The user fills in all the necessary fields in the quote request form (like name, email, phone number, etc.) with valid data.

And User clicks on the "Request a quote" button to submit the form: After completing the form, the user submits the quote request by clicking the button again.

Then User should see the quote request in the list: Finally, the test checks whether the newly created quote request appears in the list of quotes, confirming that the process worked as expected.

**Summary**
In essence, this feature file defines the high-level behavior of the "Ask Avrillo to Quote" functionality within the application. It outlines steps for navigating to the application, logging in, interacting with the quote request form, submitting it, and then verifying that the submitted quote appears in the list.

This structure follows the Given-When-Then pattern common in BDD, helping non-developers (like product owners) understand the expected behavior of the system in simple terms. Each step in the scenario would map to step definitions in the corresponding step definition file, where the automation logic for each step is implemented.
### [Go to the top](#automation-framework-guidance)
### P. Sample of Step Definition: src/test/steps/UISteps/agentApp/askAvrilloToQuoteSteps.ts
![askAvrilloToQuoteSteps.ts](images/stepsDef.png)
The file askAvrilloToQuoteSteps.ts is a Cucumber step definition file for the "Ask Avrillo to Quote" feature. In Cucumber, step definition files map human-readable steps (from the feature file) to actual code that performs the necessary actions in the application. This file contains the code for handling the specific actions and assertions for the scenario defined in the feature file.

**Structure and Purpose of the file:**
Mapping Feature Steps to Code: The file contains functions that correspond to the steps defined in the feature file (askAvrilloToQuote.feature). For example, steps like:

"User clicks on the Ask Avrillo to Quote from side bar"
"User fills out the quote form with valid data"
"User should see the quote request in the list"
These steps will be defined in the file and will include the code to interact with the UI, assert values, or perform other actions necessary for the test.

**Interaction with Playwright:** The askAvrilloToQuoteSteps.ts file will use Playwright to interact with the application’s web page to perform the actions described in the feature file.

For example, it might:
Click buttons or links.
Fill out form fields.
Assert that certain elements are visible or have the correct text.

**Scenario Flow:** The step definitions in the file guide the flow of the test by executing the actions defined in the feature file and checking the result. This includes clicking buttons, entering data, and verifying the UI to ensure the expected behavior occurs.

**Custom Functions or Page Objects:** It's possible the file imports helper functions or utilizes Page Object classes like QuoteRequestPage (from earlier code) to organize actions like filling out forms or validating quote details.

In summary, the askAvrilloToQuoteSteps.ts file contains the code that drives the automated test for the "Ask Avrillo to Quote" feature. It interacts with the UI, performs actions, and makes assertions, essentially implementing the test steps defined in the Cucumber feature file.

### R. package.json
![package.json](images/package.png)
The package.json file is a key configuration file for managing a Node.js project. Here's an explanation of the main sections:

1. Basic Metadata:

name: The name of the project (auto-testing).

version: The version of the project (1.0.0).

description: A brief description of the project (Playwright Cucumber TS).

main: The entry point file (index.js), though not commonly used in this context.

2. Config:

browser: Specifies the browser to use in Playwright for testing. Here, it's set to "chromium".

3. Scripts:
These are custom commands that can be run using 
```bash
npm run <script-name>
```

For example:

**debug:** Runs the test in debug mode using cucumber-js with additional environment variables for debugging and logging.

**pretest:** Runs a TypeScript file (init.ts) before running the tests. Likely used for initializing reports or other setup.

**test:** Runs the test suite using cucumber-js with a specified config file (cucumber.js).

**posttest:** Runs a TypeScript file (report.ts) after the tests to likely generate or update the report.

**test:failed:** Reruns the failed tests stored in the @rerun.txt file.

#### 4. Dependencies:

**devDependencies:** Packages required for development and testing.

**@cucumber/cucumber:** The Cucumber library for running feature tests.

**@faker-js/faker:** A library for generating fake data (like names and emails).

**@playwright/test:** Playwright for browser automation.

**ts-node:** TypeScript execution tool.

**winston:** A logging library.

**dependencies:** Packages that are used by the application during runtime.

**axios:** A popular HTTP request library.

**reflect-metadata:** A library for using TypeScript decorators (often used with frameworks like TypeORM).

5. Author:
The author of the project (EyupUK).

6. License:
The license is not specified in this file.

In summary, the package.json defines the project’s metadata, configuration for running tests (with Playwright, Cucumber, and TypeScript), and lists the necessary dependencies for both development and runtime. It also includes scripts for automating common tasks like running tests and generating reports.

### [Go to the top](#automation-framework-guidance)

## 5. Conventions and Restraints
### Rules and Restraints of API Testing
> #### 1. Complete API Testing in One Step
![featurefile](images/featureApi1Stpe.png)

![stepsfile](images/stepsAPI1Step.png)

In our QA team's approach, we prioritize simplicity and efficiency when it comes to API testing. The guideline that API test cases should be completed in one step only aligns with the goal of keeping API tests straightforward and easy to understand. This rule contrasts with full BDD (Behavior-Driven Development) practices, which tend to involve more detailed and structured test cases that span multiple steps and focus on broader application behavior.

**Here’s why our rule makes sense:**

1. Efficiency:

•	API tests are generally designed to verify specific endpoints or functionality of an API in isolation. Therefore, they can often be validated in one action (e.g., sending a request and checking the response).

•	Focusing on a single test step keeps the execution fast and prevents unnecessary complexity, which is important in maintaining test suite performance, especially when testing multiple APIs.

2. Simplicity:

•	API tests usually have a clear, defined goal (e.g., verify the correct status code, validate response data, or check the handling of incorrect input).

•	A single, concise test makes it easier to identify issues directly related to the API's behavior rather than dealing with the complexity of multiple steps, which may introduce more potential points of failure.

•	A simple, one-step test is easier to maintain, especially when APIs evolve over time.

3. Easier Debugging:

•	When an API test fails, it's immediately clear which part of the request is causing the issue (e.g., is it the request format, the data, or the response itself?).

•	With a single-step API test, debugging is faster since we avoid the extra layers of abstraction and steps present in more complex BDD scenarios.

4. Separation of Concerns:

•	API tests can be easily separated from UI or other integration tests. Keeping them independent (and simple) allows us to focus specifically on verifying the API’s logic and behavior.

•	Complex BDD scenarios often mix UI actions and business logic with API calls, which can make it harder to isolate and identify issues in the API itself.

5. Suitability for Automation:

•	Automation scripts for API testing are most effective when they are simple, as they are typically integrated into Continuous Integration/Continuous Deployment (CI/CD) pipelines. Keeping tests simple helps avoid unnecessary overhead.

**Why Avoid Full BDD for API Testing:**

•	BDD (Behavior-Driven Development) is great for end-to-end tests and scenarios that involve multiple systems or user interactions. It’s excellent for higher-level features where business behavior and UI interactions are tested.

•	However, for API testing, full BDD can introduce unnecessary complexity. Full BDD setups usually involve steps like "Given," "When," "Then," with additional details like mock data and actions that simulate user interaction. This is more relevant when testing user-facing applications or complex workflows.

•	API tests typically don’t require these details, as the focus is on the input (request) and output (response), not the entire business process or user journey.

**Summary:**

Single-step tests are a good practice for API testing in our team’s automation framework because they focus on the core functionality of the API with simplicity, efficiency, and ease of debugging in mind.
Full BDD is more suited to scenarios that involve multiple steps or business logic, such as UI-based or end-to-end tests, rather than isolated API calls.
By following this rule, we're ensuring that the API test suite remains efficient, maintainable, and easy to understand.

> #### 2. Use The @api Tag For API Features
![after](images/after().png)

![afterstep](images/afterstep().png)

Using the @api tag in feature files or scenarios executing API tests helps streamline our testing process and ensures that the appropriate hooks are triggered for different types of tests, particularly UI vs. API tests.

**Here’s a breakdown of the key points and reasoning behind this convention:**

1. Separation of API and UI Tests:

•	The @api tag is used to clearly distinguish API-related test scenarios from UI-based scenarios. This ensures that our API tests don't trigger UI-specific actions, such as video recording and screenshot capturing, which are only relevant for UI tests.

•	By tagging API tests with @api, we can maintain a clean separation between the types of tests, reducing the potential for overlap or unnecessary execution of UI-specific functionality when running API tests.

2. Optimizing the After Hook:

•	In our After hook, we have a condition that checks for not @api. This hook is used to capture screenshots and videos for failed tests, typically for UI tests where visual evidence of the failure is useful.

•	By tagging API tests with @api, they can be excluded from the After({ tags: 'not @api' }) hook, preventing video and screenshot capturing (which is costly in terms of performance) for API tests, which don’t need this level of detail.

•	Without this convention, API tests would still trigger the UI-specific actions in the After hook, leading to unnecessary screenshots, videos, and additional processing for API failures.

3. Avoiding Unnecessary Resource Usage:

•	Video and screenshot capturing are typically resource-intensive operations, especially when running a large suite of tests.

•	For API tests, capturing videos and screenshots doesn't provide meaningful insights, since they focus on request/response validation rather than UI interactions.

•	Tagging the API tests helps save resources (storage, processing time, and execution time) by ensuring that only UI tests trigger the video/screenshot capturing mechanism.

4. Clear Test Intent and Organization:

•	Tagging tests with @api makes it clear to everyone (team members, new developers, etc.) that a given scenario or feature file is focused on testing APIs, not UI. It provides better documentation and organization in our test suite.

•	It also enables us to selectively run API tests or UI tests using tags, making it easier to execute only the relevant test type when needed.

**Benefits:**

•	Performance optimization: The After hook only runs for UI-related failures (because they have the @ui tag), and API failures are excluded from triggering resource-heavy video/screenshot actions.

•	Focused actions: By separating API and UI tests based on tags, we ensure that the hooks execute only the necessary actions based on the test type. For instance, only UI tests will trigger screenshot or video capture on failure.

•	Scalability and maintainability: Over time, as the test suite grows, this approach makes it easier to scale, organize, and maintain test cases. The logic behind which tests trigger what actions remains clear and clean.

**In Summary:**

By enforcing the use of @api tags in feature files and scenarios for API tests, our team ensures that:

•	UI-specific actions (like screenshots and video capture) are not triggered for API tests, preventing unnecessary overhead.

•	Tests are clearly categorized, making the framework easier to maintain and understand.

•	Performance is optimized, as resource-heavy actions (like video capture) are only executed for UI tests where visual evidence of failures is crucial.

This is a good convention for managing test execution, particularly in larger test suites where performance and clarity are key.

#### 3. Coding Standard for Using sendRequest() Function in API Requests
![sendRequest](images/sendRequest.png)

**Rule:**
Always use the sendRequest() function for all API interactions

The sendRequest function in the APIUtils class should be used for **every API request** in the automation framework.

Direct API calls (e.g., using libraries like axios or fetch) are strictly discouraged unless the request involves special circumstances (e.g., for complex testing scenarios where sendRequest cannot be applied).

**Standard Parameters to be Followed:**

**Base URL:** Always set the base URL using a predefined configuration or environment variable. Avoid hardcoding the base URL in individual test cases.
```typescript
const base = process.env.API_BASE_URL;  // Set base URL from the environment configuration
```
**HTTP Method:** The HTTP method (e.g., GET, POST, PUT, DELETE) should be passed as a string, matching the method specified in the API documentation.

**Endpoint:** The endpoint should always be specified relative to the base URL, using a clear and descriptive name (e.g., /users, /orders/{id}).
Data: When sending data (e.g., for POST or PUT requests), always pass an object with the expected payload structure.

**Headers:** Include necessary headers such as Content-Type, Authorization, etc. If headers are not required for a specific request, pass an empty object ({}).

**Query Parameters:** Include query parameters where necessary (e.g., for filtering or pagination). If not needed, pass an empty object.
Always Handle Errors and Responses Consistently:

Ensure that you handle API responses and errors in a consistent manner. For instance, checking for status codes (e.g., 200 OK for success) and handling non-200 status codes appropriately (e.g., throwing an error or logging).

Ensure the function provides useful information for debugging (e.g., response time, status code, error message).

**Timeouts and Retries:**
Configure timeouts and retry logic within the sendRequest function to ensure robustness, especially for flaky APIs or intermittent network issues.

**Example**

```typescript
import { sendRequest } from './APIUtils';  // Import the utility function

When("User sends a GET request to {string}", async function (endpoint: string) {
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com'
    };

    const response = await sendRequest(
      process.env.API_BASE_URL,   // Base URL from environment variable
      'post',                     // HTTP Method
      '/users',                   // API Endpoint
      userData,                   // Request body (data)
      { 'Content-Type': 'application/json' }  // Headers
      {}  // if no query params
    );

    expect(response.status).toBe(201);  // Expect status code 201 (Created)
    expect(response.data.name).toBe(userData.name);  // Verify response data
  });

```
**Benefits of Using sendRequest Consistently**

**Consistency Across Test Cases:**

By always using the sendRequest function, we standardize the way API requests are made across the entire framework. This eliminates variations in request patterns and ensures uniformity in the way we interact with APIs.

**Centralized Error Handling and Logging:**

The utility function can include centralized error handling, logging, and retries. This reduces redundant code in individual test cases and ensures a consistent approach for handling unexpected issues like network failures or API timeouts.

**Easier Maintenance:**

If the API request structure or the method for sending requests changes (e.g., we need to add authentication headers), we can update the sendRequest function in one place rather than updating each individual test case. This reduces the risk of errors and makes the framework easier to maintain.

**Reusability and Efficiency:**

The utility function encourages reusability. Once sendRequest is written, it can be reused across all test cases, improving efficiency and minimizing duplicated code.

**Scalability:**

As the test suite grows, having a standardized approach makes it easier to scale. We can add new types of requests (e.g., PUT or PATCH) or modify parameters (e.g., for adding authentication) without refactoring each test case.

**Simplified Debugging:**

By keeping the request structure consistent, we can focus on debugging issues in one place, such as error handling within sendRequest, rather than investigating individual test cases. Additionally, consistent logging and error messages provide clarity when investigating test failures.

**Enhanced Readability:**

Using the sendRequest function makes each test case more readable by abstracting the complexity of making HTTP requests. This improves the overall clarity and understanding of the test, especially for new team members.


### Rules and Restraints of UI Testing
> #### 1. Skipping Authorization
Optimizing our test framework by skipping the login process for future scenarios, thereby speeding up the tests. This is achieved by saving the authentication state (such as cookies) after a successful login and reusing it in subsequent tests.

**Rule Breakdown:**

1. Saving the Authentication State After Login:

•	After a user logs in successfully, the login state (like cookies) is saved in a JSON file.

•	This step should be implemented just after the app's login to ensure that the authentication details are saved for future use.

•	This saved state will be stored in a JSON file, for example, adminAgent.json, that contains the necessary session information.

To save the authentication state after the login:
```javascript
// Save the authentication state (cookies) after login
await this.page.context().storageState({ path: 'src/helper/auth/adminAgent.json' });
```
![storeState](images/storageState.png)
2. Reusing the Saved Authentication State in Future Tests:

To skip the login step in subsequent tests, we use the previously saved authentication state (adminAgent.json) by loading it and adding the cookies to the page context.

The Before hook (which runs before the test starts) can be used to load the authentication state only when needed, based on the scenario tags.

Here’s how we can implement this inside the Before hook, specifically with the condition for scenarios that require authentication but not API testing (@auth and not @api):
```javascript
Before({ tags: '@auth and not @api' }, async function ({ pickle }) {
    // Check if the scenario requires admin authentication (or any other specific role)
    if(pickle.name.endsWith("admin")) {
        // Load the saved authentication state (adminAgent.json)
        const authState = require('../helper/auth/adminAgent.json');
        // Add the saved cookies to the page context to skip login
        await page.context().addCookies(authState.cookies);
    }
});
```
![beforeAuth](images/beforeAuth.png)
3. Explanation of the Code Block:

•	Before({ tags: '@auth and not @api' }): This hook will run before each scenario tagged with @auth and not @api. It ensures that the code inside the hook only runs for scenarios that require authentication but are not API tests.

•	pickle.name.endsWith("admin"): This condition checks whether the name of the scenario (pickle.name) ends with "admin". This ensures that the authentication state is loaded only for specific roles (in this case, the "admin" role). We can adjust this condition based on the user role required by our test (for example, user, manager, etc.).

•	require('../helper/auth/adminAgent.json'): This line loads the saved authentication state from the file adminAgent.json.

•	await page.context().addCookies(authState.cookies): This adds the saved cookies to the current page context, effectively logging the user in without needing to go through the login process again.

**Why This Is Important:**

•	Test Speed: By skipping the login process for each test, we reduce the amount of time spent on repeated login steps, speeding up the execution of the tests.

•	Efficiency: This approach ensures that the login state is used effectively across multiple tests that require the same user role, maintaining a consistent session without requiring manual login for each scenario.

•	Flexibility: The approach can be adapted for different user roles by modifying the conditions (e.g., pickle.name.endsWith("admin")), allowing us to save and reuse login states for various types of users.

**Summary of Workflow:**

1.	Save Authentication State: After a successful login, save the session (cookies) to a JSON file.
2.	Reuse Authentication State: In future tests that need the same user role, load the saved cookies from the JSON file and add them to the page context to avoid repeating the login steps.
3.	Optimization: This saves time, especially for tests that require logging in with the same user, by reducing redundant login operations.
This implementation ensures that our automation tests can run faster, especially for user-specific actions, without having to log in each time.

> #### 2. Use A More Declarative Style
Writing scenario steps in UI testing, rather than an imperative style. This approach can make our test scripts more readable, maintainable, and aligned with the behavior-driven development (BDD) principles.

**Difference Between Declarative and Imperative Style**

•	Imperative Style: Focuses on how to do something. It describes the specific actions that need to be performed.

Example: "Click the login button", "Enter the username", "Wait for the page to load."

•	Declarative Style: Focuses on what should be true at the end of the scenario. It describes the expected behavior or outcome, not the detailed steps to achieve it.

Example: "User should be logged in", "The login page should be displayed", "The page should load within 5 seconds."

**Why Declarative Style is Preferred in UI Testing:**

1.	Improves Readability: Declarative steps are more intuitive and easier to read. They allow anyone reading the tests (whether they are familiar with the code or not) to understand the purpose of the test.

2.	Focuses on Behavior: The tests are centered on the expected outcome (the behavior), not the implementation details. This is more aligned with the goals of BDD, which aims to describe the system's behavior rather than how it is implemented.

3.	Better Maintainability: With a declarative style, tests are less dependent on implementation details. If something changes in the UI (e.g., element names or structure), we can often update the step definitions without having to rewrite the entire scenario.

4.	Aligns with Business Requirements: Declarative steps often align more closely with business objectives and user stories. They focus on the outcome that the user wants to achieve rather than the mechanics of how the actions are performed.

**Example of Declarative vs. Imperative Style:**

**Imperative Style:**
```gherkin
Scenario: User logs into the application
  Given I open the login page
  When I enter "username" in the username field
  And I enter "password" in the password field
  And I click the login button
  Then I should see the dashboard page
```
•	Here, the focus is on the actions the test needs to take, like entering text, clicking buttons, etc.

**Declarative Style:**
```Gherkin
Scenario: User should be able to log into the application
  Given the user is on the login page
  When the user enters valid credentials
  Then the user should be redirected to the dashboard page
```

•	The declarative style focuses on the intended outcome and the state of the system at each point, rather than specifying each individual action.

**Steps in the Declarative Style:**

1.	Given: Describes the initial state or context of the system (often the "precondition" or setup for the test).
Example: "Given the user is on the login page."
2.	When: Describes the action or event that triggers the test behavior.
Example: "When the user enters valid credentials."
3.	Then: Describes the expected outcome or result after the action has been performed.
Example: "Then the user should be redirected to the dashboard page."

**Advantages of Using Declarative Style in UI Testing:**

•	Clear Intent: It makes the intent of the test clear. We can understand the test's purpose without getting bogged down in the specifics of implementation.

•	Less Fragile: The test is less likely to break due to changes in the UI. If a button’s label changes, the step definition can stay the same as long as the expected outcome remains consistent.

•	Aligns with Stakeholders: Declarative steps are often written in plain language, making it easier to communicate the behavior of the system to non-developers, like business stakeholders or product owners.

•	Reusable: A declarative test can be reused across different parts of the application, as the focus is on the behavior rather than specific UI actions. This reduces duplication in test code.

**How to Transition from Imperative to Declarative Style:**

•	Avoid specifying the exact UI elements (like button names or input field IDs) unless absolutely necessary.

•	Describe the expected system state after each action. For example, instead of saying "click on the 'login' button," say "the user should be logged in."

•	Use higher-level actions rather than low-level commands. For instance, instead of describing clicking a button, describe the resulting effect, like "the user should be redirected to the dashboard."

**Summary:**

•	The declarative style of writing UI test scenarios focuses on the behavior and the expected outcomes, not on the exact steps to achieve those outcomes. It makes tests more readable, maintainable, and aligned with business goals, and it reduces fragility when UI changes occur. By focusing on what should happen rather than how it should happen, our tests become more resilient to changes in the implementation.

> #### 3. Add Acceptance Criteria to Feature File
Adding Acceptance Criteria to Feature Files is an important convention in our UI testing framework. This rule helps ensure that the tests are clear, traceable, and aligned with the project requirements. It provides a detailed understanding of the conditions that must be met for the scenario to pass or fail. Let me explain the importance and how this should be implemented.

**Why Add Acceptance Criteria to Feature Files?**

1.	Clear Expectations: Acceptance criteria provide clarity on the expected behavior of the system and help both testers and developers understand what needs to be validated. By including them directly in the feature file, we ensure that everyone is on the same page about what the scenario aims to validate.

2.	Traceability: Including acceptance criteria in feature files makes it easier to trace requirements back to specific test cases. This is especially helpful in large projects with multiple stakeholders, as it ties the test steps to the defined requirements.

3.	Quality Assurance: Acceptance criteria help QA teams understand the precise conditions that need to be met for the feature to be considered complete and functioning as expected. Without them, it’s easy to miss essential validation points.

4.	Behavior-Driven Development (BDD): BDD encourages writing tests in a way that reflects how a system behaves from the user's perspective. Acceptance criteria help achieve this goal by outlining the conditions for success from a functional perspective, not just a technical one.

5.	Automation Readiness: When acceptance criteria are included in feature files, it makes it much easier to automate tests. It provides a clear structure that the test code can follow, ensuring that the automation reflects the business requirements accurately.

**Example of Feature File with Acceptance Criteria**

Here's how acceptance criteria can be added to a Gherkin-style feature file:

```gherkin
Feature: User Login Functionality

  # Acceptance Criteria:
  # 1. The user should be able to log in with valid credentials.
  # 2. The user should see an error message when invalid credentials are entered.
  # 3. The user should be redirected to the homepage after a successful login.
  
  @ui @login
  Scenario: User logs in successfully with valid credentials
    Given the user navigates to the login page
    When the user enters valid credentials
    And the user clicks the login button
    Then the user should be redirected to the homepage
    And the user should see the welcome message "Welcome, User!"
    
  @ui @login @invalid
  Scenario: User sees an error message with invalid credentials
    Given the user navigates to the login page
    When the user enters invalid credentials
    And the user clicks the login button
    Then the user should see the error message "Invalid username or password"
```
**Breakdown of the Feature File:**
1.	Acceptance Criteria:
This is typically placed as comments at the top of the feature file, outlining the conditions that define the success or failure of the functionality being tested.
It helps the tester know what to focus on and what constitutes a passing test.
2.	Feature: The feature itself describes what functionality is being tested (e.g., "User Login Functionality").
3.	Scenarios: Each scenario describes a specific behavior of the system under test. The scenarios are written in Gherkin syntax (Given, When, Then), and they reflect the acceptance criteria listed above.
In this case, there are two scenarios: one for a successful login and one for an invalid login attempt.
4.	Tags: Tags like @ui, @login, and @invalid help categorize and filter scenarios, making it easy to run only a subset of tests (e.g., only UI tests or only tests related to invalid logins). Tags can also be used to control which hooks are executed, such as setting different environments for different test groups.
5.	Scenarios Corresponding to Acceptance Criteria: The scenarios are designed to validate the specific acceptance criteria laid out in the comments:
	Scenario 1 checks that the user is able to log in with valid credentials.
	Scenario 2 checks that an error message is shown when invalid credentials are entered.

**How Acceptance Criteria Should Be Written:**

1.	Clear and Testable: Acceptance criteria should be written in clear, simple language and be testable. They must define exactly what conditions must be met for the feature to be considered complete.
2.	Behavior-Oriented: The criteria should describe the system's expected behavior from the user's perspective (e.g., "The user should be redirected to the homepage," not "The system should send a GET request to /home").
3.	Avoid Ambiguity: Ambiguity can lead to confusion, missed requirements, or misinterpretation. Be as specific as possible (e.g., instead of "The system should display a message," specify "The system should display an error message saying 'Invalid credentials'").
4.	Positive and Negative Scenarios: It's crucial to consider both positive (valid inputs) and negative (invalid inputs) scenarios to fully validate the feature.
5.	Examples: Providing examples (e.g., specific inputs for forms) can clarify the acceptance criteria and help testers understand what data will be used in tests.

**Benefits of Adding Acceptance Criteria:**

1.	Better Collaboration: Acceptance criteria provide a shared understanding of the feature's functionality. Developers, QA, and stakeholders can align more easily on what the system should do.
2.	Test Automation Consistency: By writing tests based on the acceptance criteria, we ensure that automated tests stay aligned with business requirements and evolve with the application.
3.	Better Test Coverage: Acceptance criteria ensure that all aspects of the feature are covered by tests, reducing the chances of missing critical validations.
4.	Facilitates Review and Refinement: If the acceptance criteria are well-defined and written in the feature files, it's easier for the team to review the scope of the feature, catch potential issues, and refine the test cases as needed.

**Conclusion:**

By including Acceptance Criteria in our Feature Files, our team ensures that test scenarios are closely aligned with business requirements. 

This practice enhances clarity, maintains test focus, and improves collaboration across the team. It also provides a solid foundation for writing automated tests that reflect expected behavior rather than technical implementation. 

This way, the automated tests will serve as both validation for the code and documentation for the business logic.

### [Go to the top](#automation-framework-guidance)
## 6. Picking of Specific Environment, Browser, or Scenarios
### A. Pick a Specific Environment

**Set the ENV variable:**

This can be done by using the cross-env library to set the environment before running the tests.
Example:
```bash
cross-env ENV=staging npx cucumber-js
```
This can be set in **scripts** of **package.json**

If we want to use CLI commands to choose a specific environment, we need to ignore cross-env and use:
```bash
ENV=<environment_name> npm run test-env --tags="@askAvrillo"  
```

If no environment is provided (i.e., no ENV value is set), the function will default to loading the staging environment (process.env.ENV || "staging").

**In summary:**

If ENV=staging, it loads .env.staging.
If ENV=prod, it loads .env.prod.
If ENV=dev, it loads .env.dev.
If no ENV is set, it defaults to staging.

For further details [go to env](#d-srchelperenvenv)

### B. Pick a Specific Browser
To choose the browser for our automation tests, we need to specify the desired browser using an environment variable. We can do this either via a command line argument or by setting an environment variable in our system or configuration file.

Steps to Select a Browser:
Set the Browser Environment Variable:

We can choose the browser to use by setting an environment variable.

Using npm command-line: We can specify the browser when running our tests by using the npm_config_browser environment variable:
```bash
npm config set browser=chromium
```
or combine with **run** command like below:
```bash
npm config set browser=webkit
npm run test --tags="@admin"
```
**How the invokeBrowser Method Works**

The invokeBrowser function looks for the environment variable (npm_config_browser or BROWSER) to determine which browser to launch. Here’s a breakdown:

**process.env.npm_config_browser:** This environment variable is passed through the npm command. It's used to select the browser when running tests.
**process.env.BROWSER:** This environment variable is another way to specify the browser when running tests. If npm_config_browser is not set, it looks for BROWSER.
**Fallback to webkit:** If neither of the above environment variables is set, the function defaults to WebKit as the browser.

**Browser Selection Flow:**

If process.env.npm_config_browser or process.env.BROWSER is set, the invokeBrowser function will launch the corresponding browser (Chromium, Firefox, or WebKit).

*If no environment variable is set, the function defaults to WebKit.*

#### Best Practices for Picking a Browser

**Environment-Specific Selection:** It’s often useful to select different browsers depending on the environment. For instance, we might want to use WebKit for certain UI-related tests, Chromium for general functional tests, and Firefox for compatibility testing.

**Cross-Browser Testing:** When running tests across different browsers, ensure that the tests are written in a way that supports cross-browser execution (e.g., avoid browser-specific functionality or behaviors).

**Headless Mode for CI:** In a Continuous Integration (CI) pipeline, we would often use headless mode to speed up test execution. Set headless: true in our LaunchOptions for CI environments.

*Note that GitHub Actions as a CI/CD has a built-in display. So we don't need to execute UI scenarios in the headless mode.*

### Pick a Specific Scenario/Scenarios
**Here’s how you can specify a tag for a scenario**

To execute only the scenarios with the @admin tag, use:
```bash
npm run test --tags="@admin"
```

**Run Scenarios with Multiple Tags**

You can combine tags using logical operators like and, or, and not.

Run Scenarios Tagged with Both @admin and @user:
```bash
npm run test --tags="@admin and @user"
```
Run Scenarios Tagged with @admin but not @user:
```bash
npm run test --tags="@admin and not @user"
```
Run Scenarios Tagged with Either @admin or @user:
```bash
npm run test --tags="@admin or @user"
```

### [Go to the top](#automation-framework-guidance)
