import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Go to a URL
  async navigate(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  protected async retryAction<T>(action: () => Promise<T>, attempts = 3, waitMs = 400): Promise<T> {
    let lastError: unknown;
    for (let i = 0; i < attempts; i++) {
      try {
        return await action();
      } catch (error) {
        lastError = error;
        if (i < attempts - 1) {
          await this.page.waitForTimeout(waitMs);
        }
      }
    }
    throw lastError;
  }

  // Click any element
  async click(selector: string): Promise<void> {
    const locator = this.page.locator(selector).first();
    await locator.waitFor({ state: 'attached', timeout: 5000 });
    await locator.scrollIntoViewIfNeeded();
    try {
      await locator.click({ timeout: 10000 });
    } catch {
      await locator.click({ force: true, timeout: 10000 });
    }
  }

  // Type text into any input field
  async fill(selector: string, text: string): Promise<void> {
    const locator = this.page.locator(selector).first();
    await locator.waitFor({ state: 'attached', timeout: 5000 });
    await locator.scrollIntoViewIfNeeded();
    try {
      await locator.fill(text, { timeout: 10000 });
    } catch {
      // Fallback for pages where overlays/animations block normal fill.
      await locator.evaluate(
        (el, value) => {
          (el as any).value = value as string;
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
        },
        text
      );
    }
  }

  // Get text from any element
  async getText(selector: string): Promise<string> {
    await this.page.locator(selector).waitFor({ state: 'visible' });
    return await this.page.locator(selector).innerText();
  }

  // Check if element is visible
  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }

  // Wait for element to appear
  async waitForElement(selector: string, timeout = 10000): Promise<void> {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  // Get current page URL
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }
}