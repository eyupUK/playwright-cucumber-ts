const os = require("node:os");
const process = require("node:process");
const { Status } = require("allure-js-commons");

module.exports = {
    default: {
        // Note: TAGS and tags are two different argument. TAGS is not working in linux env.
        tags: process.env.npm_config_tags || "",
        formatOptions: {
            snippetInterface: "async-await",
            resultsDir: "allure-results",
            labels: [
              {
                pattern: [/@epic:(.*)/],
                name: "epic",
              },
              {
                pattern: [/@severity:(.*)/],
                name: "severity",
              },
            ],
            links: {
              issue: {
                pattern: [/@issue:(.*)/],
                urlTemplate: "https://issues.example.com/%s",
                nameTemplate: "ISSUE %s",
              },
              tms: {
                pattern: [/@tms:(.*)/],
                urlTemplate: "https://tms.example.com/%s",
              },
              jira: {
                pattern: [/@jira:(.*)/],
                urlTemplate: (v) => `https://jira.example.com/browse/${v}`,
              },
            },
            categories: [
              {
                name: "foo",
                messageRegex: "bar",
                traceRegex: "baz",
                matchedStatuses: [Status.FAILED, Status.BROKEN],
              },
            ],
            environmentInfo: {
              os_platform: os.platform(),
              os_release: os.release(),
              os_version: os.version(),
              node_version: process.version,
            },
        },
        paths: ["src/test/features/"],
        dryRun: false,
        require: ["src/test/**/*.ts", "src/hooks/hooks.ts"],
        requireModule: ["ts-node/register"],
        format: [
            "allure-cucumberjs/reporter",
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            "rerun:@rerun.txt",
        ],
        timeout: 120000,
        parallel: parseInt(process.env.PARALLEL, 10) || 0, // Convert PARALLEL to a number
    },
    rerun: {
        formatOptions: {
            snippetInterface: "async-await",
            resultsDir: "allure-results",
            labels: [
              {
                pattern: [/@epic:(.*)/],
                name: "epic",
              },
              {
                pattern: [/@severity:(.*)/],
                name: "severity",
              },
            ],
            links: {
              issue: {
                pattern: [/@issue:(.*)/],
                urlTemplate: "https://issues.example.com/%s",
                nameTemplate: "ISSUE %s",
              },
              tms: {
                pattern: [/@tms:(.*)/],
                urlTemplate: "https://tms.example.com/%s",
              },
              jira: {
                pattern: [/@jira:(.*)/],
                urlTemplate: (v) => `https://jira.example.com/browse/${v}`,
              },
            },
            categories: [
              {
                name: "foo",
                messageRegex: "bar",
                traceRegex: "baz",
                matchedStatuses: [Status.FAILED, Status.BROKEN],
              },
            ],
            environmentInfo: {
              os_platform: os.platform(),
              os_release: os.release(),
              os_version: os.version(),
              node_version: process.version,
            },
        },
        dryRun: false,
        require: ["src/test/steps/*/.ts", "src/hooks/hooks.ts"],
        requireModule: ["ts-node/register"],
        format: [
            "allure-cucumberjs/reporter",
            "progress-bar",
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json",
            "rerun:@rerun.txt",
        ],
        parallel: parseInt(process.env.PARALLEL, 10) || 0, // Convert PARALLEL to a number
        retry: 2,
        timeout: 120000,
    },
};