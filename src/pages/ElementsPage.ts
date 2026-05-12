import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ElementsPage extends BasePage {

  private selectors = {
    // Text Box
    fullNameInput:      '#userName',
    emailInput:         '#userEmail',
    currentAddressInput:'#currentAddress',
    permanentAddressInput: '#permanentAddress',
    submitBtn:          '#submit',
    outputName:         '#name',
    outputEmail:        '#email',

    // Check Box
    homeCheckbox:       'label[for="tree-node-home"]',
    expandAllBtn:       '.rct-option-expand-all',
    checkBoxResult:     '.check-box-tree-wrapper .text-success',

    // Radio Button
    yesRadio:           'label[for="yesRadio"]',
    impressiveRadio:    'label[for="impressiveRadio"]',
    noRadio:            'label[for="noRadio"]',
    radioResult:        '.mt-3',

    // Web Table
    addButton:          '#addNewRecordButton',
    searchBox:          '#searchBox',
    tableRows:          '.rt-tbody .rt-tr-group',
    firstNameCell:      '[placeholder="First Name"]',
    lastNameCell:       '[placeholder="Last Name"]',
    emailCell:          '[placeholder="Email"]',
    ageCell:            '[placeholder="Age"]',
    salaryCell:         '[placeholder="Salary"]',
    departmentCell:     '[placeholder="Department"]',
    submitFormBtn:      '#submit',

    // Buttons
    doubleClickBtn:     '#doubleClickBtn',
    rightClickBtn:      '#rightClickBtn',
    dynamicClickBtn:    '.btn-primary:not([id])',
    doubleClickMsg:     '#doubleClickMessage',
    rightClickMsg:      '#rightClickMessage',
    dynamicClickMsg:    '#dynamicClickMessage'
  };

  constructor(page: Page) {
    super(page);
  }

  private async hideBlockingOverlays(): Promise<void> {
    await this.page.addStyleTag({
      content: '[id*="Ad"], [id*="ad"], [class*="ad-"], [class*="ads"], iframe { display: none !important; }'
    });
  }

  // --- Text Box ---
  async goToTextBox(): Promise<void> {
    await this.navigate('https://demoqa.com/text-box');
    await this.hideBlockingOverlays();
    await this.waitForElement(this.selectors.fullNameInput, 10000);
  }

  async fillTextBoxForm(name: string, email: string, current: string, permanent: string): Promise<void> {
    await this.retryAction(async () => {
      await this.hideBlockingOverlays();
      await this.fill(this.selectors.fullNameInput, name);
      await this.fill(this.selectors.emailInput, email);
      await this.fill(this.selectors.currentAddressInput, current);
      await this.fill(this.selectors.permanentAddressInput, permanent);
    }, 3, 500);
  }

  async submitTextBox(): Promise<void> {
    await this.page.locator(this.selectors.submitBtn).scrollIntoViewIfNeeded();
    await this.click(this.selectors.submitBtn);
  }

  async getOutputName(): Promise<string> {
    return await this.getText(this.selectors.outputName);
  }

  async getOutputEmail(): Promise<string> {
    return await this.getText(this.selectors.outputEmail);
  }

  // --- Radio Button ---
  async goToRadioButton(): Promise<void> {
    await this.navigate('https://demoqa.com/radio-button');
    await this.hideBlockingOverlays();
  }

  async clickYesRadio(): Promise<void> {
    await this.page.locator(this.selectors.yesRadio).click();
  }

  async clickImpressiveRadio(): Promise<void> {
    await this.page.locator(this.selectors.impressiveRadio).click();
  }

  async getRadioResult(): Promise<string> {
    await this.waitForElement(this.selectors.radioResult);
    return await this.getText(this.selectors.radioResult);
  }

  // --- Buttons ---
  async goToButtons(): Promise<void> {
    await this.navigate('https://demoqa.com/buttons');
    await this.hideBlockingOverlays();
  }

  async doubleClickButton(): Promise<void> {
    await this.page.locator(this.selectors.doubleClickBtn).dblclick();
  }

  async rightClickButton(): Promise<void> {
    await this.page.locator(this.selectors.rightClickBtn).click({ button: 'right' });
  }

  async getDoubleClickMessage(): Promise<string> {
    return await this.getText(this.selectors.doubleClickMsg);
  }

  async getRightClickMessage(): Promise<string> {
    return await this.getText(this.selectors.rightClickMsg);
  }

  // --- Checkbox ---
  async goToCheckBox(): Promise<void> {
    await this.navigate('https://demoqa.com/checkbox');
    await this.hideBlockingOverlays();
    await this.waitForElement(this.selectors.expandAllBtn, 10000);
  }

  async expandAll(): Promise<void> {
    await this.retryAction(async () => {
      await this.hideBlockingOverlays();
      const expandButton = this.page.locator(this.selectors.expandAllBtn).first();
      await expandButton.waitFor({ state: 'attached', timeout: 10000 });
      await expandButton.scrollIntoViewIfNeeded();
      await expandButton.click({ timeout: 10000 });
    }, 3, 500);
  }

  async clickHomeCheckbox(): Promise<void> {
    await this.click(this.selectors.homeCheckbox);
  }

  async getCheckboxResult(): Promise<string> {
    await this.waitForElement(this.selectors.checkBoxResult);
    return await this.getText(this.selectors.checkBoxResult);
  }
}