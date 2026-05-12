import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../utils/world';
import { LoginPage } from '../pages/LoginPage';

Given('I am on the DemoQA login page', async function (this: ICustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.goToLoginPage();
});

When(
  'I enter username {string} and password {string}',
  async function (this: ICustomWorld, username: string, password: string) {
    const loginPage = new LoginPage(this.page);
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
  }
);

When('I click the login button', async function (this: ICustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.clickLogin();
});

Then('I should be redirected to the profile page', async function (this: ICustomWorld) {
  const loginPage = new LoginPage(this.page);
  const isLoggedIn = await loginPage.isLoggedIn();
  expect(isLoggedIn).toBeTruthy();
});

Then('I should see an invalid credentials error message', async function (this: ICustomWorld) {
  const loginPage = new LoginPage(this.page);
  const errorMessage = await loginPage.getErrorMessage();
  // DemoQA can return API, pattern, or native validation errors depending on input.
  expect(errorMessage.toLowerCase()).toMatch(/invalid|fill|required|format|match/);
});