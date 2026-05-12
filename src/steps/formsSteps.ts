import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../utils/world';
import { FormsPage } from '../pages/FormsPage';

Given('I am on the DemoQA practice form page', async function (this: ICustomWorld) {
  const formsPage = new FormsPage(this.page);
  await formsPage.goToPracticeForm();
});

When(
  'I fill in first name {string} and last name {string}',
  async function (this: ICustomWorld, firstName: string, lastName: string) {
    const formsPage = new FormsPage(this.page);
    await formsPage.fillFirstName(firstName);
    await formsPage.fillLastName(lastName);
  }
);

When('I enter email {string}', async function (this: ICustomWorld, email: string) {
  const formsPage = new FormsPage(this.page);
  await formsPage.fillEmail(email);
});

When('I select gender {string}', async function (this: ICustomWorld, gender: string) {
  const formsPage = new FormsPage(this.page);
  if (gender === 'Male') await formsPage.selectGenderMale();
  else await formsPage.selectGenderFemale();
});

When('I enter mobile number {string}', async function (this: ICustomWorld, number: string) {
  const formsPage = new FormsPage(this.page);
  await formsPage.fillMobileNumber(number);
});

When('I fill current address {string}', async function (this: ICustomWorld, address: string) {
  const formsPage = new FormsPage(this.page);
  await formsPage.fillCurrentAddress(address);
});

When('I select hobby {string}', async function (this: ICustomWorld, hobby: string) {
  const formsPage = new FormsPage(this.page);
  await formsPage.selectHobby(hobby as 'Sports' | 'Reading' | 'Music');
});

When('I submit the form', async function (this: ICustomWorld) {
  const formsPage = new FormsPage(this.page);
  await formsPage.submitForm();
});

Then(
  'I should see the confirmation modal with title {string}',
  async function (this: ICustomWorld, expectedTitle: string) {
    const formsPage = new FormsPage(this.page);
    await formsPage.isConfirmationModalVisible();
    const title = await formsPage.getModalTitle();
    expect(title).toBe(expectedTitle);
  }
);

Then(
  'the submitted first name should be {string}',
  async function (this: ICustomWorld, expectedName: string) {
    const formsPage = new FormsPage(this.page);
    const value = await formsPage.getSubmittedValue('Student Name');
    expect(value).toBe(expectedName);
  }
);