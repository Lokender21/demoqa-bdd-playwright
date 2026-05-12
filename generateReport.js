const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: 'reports/',
  reportPath: 'reports/html/',
  metadata: {
    browser: { name: 'chrome', version: '120' },
    device: 'Local Machine',
    platform: { name: 'Windows', version: '11' }
  },
  customData: {
    title: 'DemoQA BDD Test Report',
    data: [
      { label: 'Project', value: 'DemoQA - AI Platform Automation' },
      { label: 'Framework', value: 'Playwright + Cucumber BDD' },
      { label: 'Executed by', value: 'Lokender Pratap Singh' }
    ]
  }
});