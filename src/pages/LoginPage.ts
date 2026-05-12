import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  // --- Selectors (what to find on the page) ---
  private selectors = {
    usernameInput:    '#userName',
    passwordInput:    '#password',
    loginButton:      '#login',
    logoutButton:     '#submit',
    profileHeader:    '.main-header',
    errorMessage:     '#name',
    userNameLabel:    '#userName-value'
  };

  constructor(page: Page) {
    super(page);
  }

  // Go to login page
  async goToLoginPage(): Promise<void> {
    await this.navigate('https://demoqa.com/login');
  }

  // Enter username
  async enterUsername(username: string): Promise<void> {
    await this.fill(this.selectors.usernameInput, username);
  }

  // Enter password
  async enterPassword(password: string): Promise<void> {
    await this.fill(this.selectors.passwordInput, password);
  }

  // Click Login button
  async clickLogin(): Promise<void> {
    await this.click(this.selectors.loginButton);
  }

  // Full login action in one step
  async login(username: string,password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  // Get error message text
  async getErrorMessage(): Promise<string> {
    const banner = this.page.locator(this.selectors.errorMessage);

    // DemoQA shows API/login failure message in `#name`, but empty fields often
    // trigger native browser validation (no `#name` appears).
    try {
      await banner.waitFor({ state: 'visible', timeout: 2000 });
      return (await banner.innerText()).trim();
    } catch {
      // ignore - fall back to input validation messages
    }

    const usernameValidation = await this.page
      .locator(this.selectors.usernameInput)
      .evaluate((el) => (el as any).validationMessage as string)
      .catch(() => '');

    const passwordValidation = await this.page
      .locator(this.selectors.passwordInput)
      .evaluate((el) => (el as any).validationMessage as string)
      .catch(() => '');

    return [usernameValidation, passwordValidation].filter(Boolean).join(' | ').trim();
  }

  // Check if user is on profile page after login
  async isLoggedIn(): Promise<boolean> {
    await this.page.waitForTimeout(2000);
    return this.page.url().includes('profile');
  }

  // Get logged in username displayed on page
  async getLoggedInUsername(): Promise<string> {
    await this.waitForElement(this.selectors.userNameLabel);
    return await this.getText(this.selectors.userNameLabel);
  }
}