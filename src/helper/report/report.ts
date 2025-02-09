const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "test-results",
    reportPath: "test-results/reports/",
    reportName: "Legacy Apps Test Report",
    pageTitle: "Legacy Apps Test Report",
    displayDuration: false,
    metadata: {
        browser: {
            name: "chrome",
            version: "112",
        },
        device: "ETO",
        platform: {
            name: "Mac OS ",
            version: "14.5",
        },
    },
    customData: {
        title: "Test Info",
        data: [
            { label: "Project", value: "New CRM" },
            { label: "Release", value: "1.1.1" },
            { label: "Cycle", value: "Smoke-1" }
        ],
    },
});
