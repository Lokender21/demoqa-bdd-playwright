<div align="center">

# 🎭 DemoQA BDD Automation Framework

<p>
  <img src="https://img.shields.io/badge/Playwright-45ba4b?style=flat-square&logo=Playwright&logoColor=white" />
  <img src="https://img.shields.io/badge/Cucumber-23D96C?style=flat-square&logo=cucumber&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white" />
</p>

<p>
  <img src="https://img.shields.io/badge/Tests-12%20Scenarios-brightgreen?style=flat-square" />
  <img src="https://img.shields.io/badge/Features-3%20Files-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Pattern-Page%20Object%20Model-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-purple?style=flat-square" />
</p>

<br/>

**Enterprise-grade BDD Test Automation Framework**  
Built with Playwright + Cucumber + TypeScript to mirror real-world AI platform testing.

</div>

---

## What is this?

A **production-ready automation framework** built on [DemoQA](https://demoqa.com) — a platform that closely mirrors enterprise AI application UI patterns. Written following **Behavior Driven Development (BDD)** so test scenarios are readable by everyone — developers, testers, and business stakeholders alike.

```gherkin
Scenario: Successful login with valid credentials
  Given I am on the DemoQA login page
  When I enter username "testuser" and password "Password1"
  And I click the login button
  Then I should be redirected to the profile page
```

> No code knowledge needed to read the above. That is the power of BDD.

---

## Tech Stack

| Layer | Tool | Why |
|-------|------|-----|
| Browser Automation | [Playwright](https://playwright.dev) | Fast, reliable, cross-browser |
| BDD Framework | [Cucumber.js](https://cucumber.io) | Plain English test scenarios |
| Language | [TypeScript](https://www.typescriptlang.org) | Type safety, better IDE support |
| Reporting | [multiple-cucumber-html-reporter](https://github.com/WasiqB/multiple-cucumber-html-reporter) | Rich visual HTML reports |
| CI/CD | [GitHub Actions](https://github.com/features/actions) | Auto-run on every push |

---

## Project Structure

```
demoqa-bdd-playwright/
│
├── .github/workflows/
│   └── test.yml                  # CI/CD — auto runs on every push to main
│
├── features/                     # Plain English test scenarios (Gherkin)
│   ├── login.feature
│   ├── forms.feature
│   └── elements.feature
│
├── src/
│   ├── pages/                    # Page Object Model
│   │   ├── BasePage.ts           # Common actions — navigate, click, fill, getText
│   │   ├── LoginPage.ts
│   │   ├── FormsPage.ts
│   │   └── ElementsPage.ts
│   │
│   ├── steps/                    # Connects Gherkin sentences → Playwright actions
│   │   ├── loginSteps.ts
│   │   ├── formsSteps.ts
│   │   └── elementsSteps.ts
│   │
│   ├── hooks/
│   │   └── hooks.ts              # Open browser before / screenshot + close after
│   │
│   └── utils/
│       └── world.ts              # Shared browser context across all step files
│
├── reports/
│   ├── html/                     # Generated HTML report
│   └── screenshots/              # Auto-captured on failure
│
├── cucumber.json                 # Cucumber config
├── playwright.config.ts          # Playwright config
├── tsconfig.json                 # TypeScript config
├── generateReport.js             # Report generator script
└── package.json
```

---

## Test Coverage

### 🔐 Login — `login.feature`

| Scenario | Tags |
|----------|------|
| Successful login with valid credentials | `@smoke` `@login-success` |
| Login fails with invalid password | `@login-failure` |
| Login fails with empty username | `@login-failure` |
| Login fails with empty password | `@login-failure` |

### 📝 Forms — `forms.feature`

| Scenario | Tags |
|----------|------|
| Submit practice form with all valid details | `@smoke` `@form-submit` |
| Submit form with female gender selection | `@form-submit` |

### 🖱️ Elements — `elements.feature`

| Scenario | Tags |
|----------|------|
| Fill and submit text box form | `@smoke` `@textbox` |
| Select Yes radio button | `@radio` |
| Select Impressive radio button | `@radio` |
| Double click action on button | `@smoke` `@buttons` |
| Right click action on button | `@buttons` |
| Select home checkbox and verify result | `@checkbox` |

**12 scenarios · 3 features · fully automated**

---

## Getting Started

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/demoqa-bdd-playwright.git
cd demoqa-bdd-playwright

# Install
npm install
npx playwright install chromium
```

---

## Running Tests

```bash
# All tests
npm test

# By tag — run only what you need
npx cucumber-js --tags @smoke          # critical path only
npx cucumber-js --tags @login          # login scenarios
npx cucumber-js --tags @forms          # form scenarios
npx cucumber-js --tags "not @login-failure"  # skip failure cases

# Generate HTML report
node generateReport.js

# Open report (Windows)
start reports/html/index.html
```

---

## Reports

Every test run generates a full HTML report at `reports/html/index.html`

- ✅ Pass / Fail / Skip count per feature and scenario
- ⏱️ Step-by-step execution time
- 📸 Auto-screenshot attached on any failure
- 🖥️ Browser, OS, and environment metadata
- 🏷️ Filterable by tag

In CI/CD, the report is automatically uploaded as a **downloadable artifact** on GitHub — no local setup needed to view results.

---

## CI/CD Pipeline

Every push to `main` automatically:

```
Push to GitHub
      ↓
Checkout code
      ↓
Install Node 18 + dependencies
      ↓
Install Playwright Chromium
      ↓
Run all 12 BDD scenarios
      ↓
Generate HTML report
      ↓
Upload report + screenshots as artifacts
```

Trigger options — push to `main`, pull request to `main`, or manually via **Actions → Run workflow**.

---

## Architecture

```
Feature File (.feature)
    │  plain English scenarios
    ▼
Step Definitions (*Steps.ts)
    │  maps sentences → code
    ▼
Page Objects (*Page.ts)
    │  selectors + actions per page
    ▼
BasePage.ts
    │  shared: navigate, click, fill, getText, waitFor
    ▼
Playwright Browser (Chromium)
    │
    ▼
https://demoqa.com
```

Every layer has **one job only** — changes in the UI only touch the Page Object. Changes in test logic only touch Step Definitions. Feature files never change unless business requirements change.

---

## Best Practices

- **Page Object Model** — selectors and actions isolated per page
- **BasePage inheritance** — write common actions once, reuse everywhere
- **Explicit waits** — zero hard-coded `sleep()` calls
- **Tag-based execution** — run smoke, regression, or feature-specific suites
- **Auto-screenshot on failure** — instant debugging without re-running
- **TypeScript throughout** — compile-time error catching
- **CI/CD from day one** — every commit is validated automatically

---

<div align="center">

## Author

**Lokender Singh**

Senior SDET · 7 Years Experience

Performance Testing · Playwright · JMeter · Grafana · New Relic · Datadog

<p>
  <a href="https://linkedin.com/in/YOUR_PROFILE">
    <img src="https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=flat-square&logo=linkedin" />
  </a>
  &nbsp;
  <a href="https://github.com/YOUR_USERNAME">
    <img src="https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github" />
  </a>
</p>

<br/>

⭐ Star this repo if you found it useful

</div>
