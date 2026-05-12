import {
    Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout
  } from '@cucumber/cucumber';
  import { chromium, Browser } from '@playwright/test';
  import { ICustomWorld } from '../utils/world';
  import * as fs from 'fs';
  import * as path from 'path';
  
  // Set timeout to 30 seconds for each step
  setDefaultTimeout(30 * 1000);
  
  let browser: Browser;
  
  // Runs ONCE before all tests — launches browser
  BeforeAll(async () => {
    browser = await chromium.launch({
      headless: false,   // headless: true = no browser window (for CI)
      slowMo: 50         // slows actions by 50ms so you can see what's happening
    });
  });
  
  // Runs before EACH scenario — creates fresh tab
  Before(async function (this: ICustomWorld) {
    this.browser = browser;
    this.context = await browser.newContext({
      viewport: { width: 1280, height: 720 }
    });
    this.page = await this.context.newPage();
  });
  
  // Runs after EACH scenario — takes screenshot on failure
  After(async function (this: ICustomWorld, scenario) {
    if (scenario.result?.status === Status.FAILED) {
      const screenshotDir = path.join('reports', 'screenshots');
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }
      const screenshotName = scenario.pickle.name.replace(/\s+/g, '_');
      const screenshotPath = path.join(screenshotDir, `${screenshotName}.png`);
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved: ${screenshotPath}`);
    }
    await this.context.close();
  });
  
  // Runs ONCE after all tests — closes browser
  AfterAll(async () => {
    await browser.close();
  });