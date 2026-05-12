import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ICustomWorld } from '../utils/world';
import { ElementsPage } from '../pages/ElementsPage';

// --- Text Box ---
Given('I am on the DemoQA text box page', async function (this: ICustomWorld) {
  const elementsPage = new ElementsPage(this.page);
  await elementsPage.goToTextBox();
});

When(
  'I fill the text box with name {string} and email {string}',
  async function (this: ICustomWorld, name: string, email: string) {
    const elementsPage = new ElementsPage(this.page);
    await elementsPage.fillTextBoxForm(name, email, 'Noida UP', 'Noida UP');
  }
);

When('I submit the text box form', async function (this: ICustomWorld) {
  const elementsPage = new ElementsPage(this.page);
  await elementsPage.submitTextBox();
});

Then(
  'the output should display name containing {string}',
  async function (this: ICustomWorld, expectedName: string) {
    const elementsPage = new ElementsPage(this.page);
    const outputName = await elementsPage.getOutputName();
    expect(outputName).toContain(expectedName);
  }
);

Then(
  'the output should display email containing {string}',
  async function (this: ICustomWorld, expectedEmail: string) {
    const elementsPage = new ElementsPage(this.page);
    const outputEmail = await elementsPage.getOutputEmail();
    expect(outputEmail).toContain(expectedEmail);
  }
);

// --- Radio Button ---
Given('I am on the DemoQA radio button page', async function (this: ICustomWorld) {
  const elementsPage = new ElementsPage(this.page);
  await elementsPage.goToRadioButton();
});

When('I click the {string} radio button', async function (this: ICustomWorld, option: string) {
  const elementsPage = new ElementsPage(this.page);
  if (option === 'Yes') await elementsPage.clickYesRadio();
  else await elementsPage.clickImpressiveRadio();
});

Then(
  'I should see radio result {string}',
  async function (this: ICustomWorld, expectedResult: string) {
    const elementsPage = new ElementsPage(this.page);
    const result = await elementsPage.getRadioResult();
    expect(result).toContain(expectedResult);
  }
);

// --- Buttons ---
Given('I am on the DemoQA buttons page', async function (this: ICustomWorld) {
  const elementsPage = new ElementsPage(this.page);
  await elementsPage.goToButtons();
});

When('I double click the button', async function (this: ICustomWorld) {
  const elementsPage = new ElementsPage(this.page);
  await elementsPage.doubleClickButton();
});

When('I right click the button', async function (this: ICustomWorld) {
  const elementsPage = new ElementsPage(this.page);
  await elementsPage.rightClickButton();
});

Then(
  'I should see the message {string}',
  async function (this: ICustomWorld, expectedMsg: string) {
    const elementsPage = new ElementsPage(this.page);
    const msg = await elementsPage.getDoubleClickMessage();
    expect(msg).toContain(expectedMsg);
  }
);

Then(
  'I should see the right click message {string}',
  async function (this: ICustomWorld, expectedMsg: string) {
    const elementsPage = new ElementsPage(this.page);
    const msg = await elementsPage.getRightClickMessage();
    expect(msg).toContain(expectedMsg);
  }
);

// --- Checkbox ---
Given('I am on the DemoQA checkbox page', async function (this: ICustomWorld) {
  const elementsPage = new ElementsPage(this.page);
  await elementsPage.goToCheckBox();
});

When('I expand all checkboxes', async function (this: ICustomWorld) {
  const elementsPage = new ElementsPage(this.page);
  await elementsPage.expandAll();
});

When('I click the home checkbox', async function (this: ICustomWorld) {
  const elementsPage = new ElementsPage(this.page);
  await elementsPage.clickHomeCheckbox();
});

Then('I should see checkbox selection result', async function (this: ICustomWorld) {
  const elementsPage = new ElementsPage(this.page);
  const result = await elementsPage.getCheckboxResult();
  expect(result.length).toBeGreaterThan(0);
});