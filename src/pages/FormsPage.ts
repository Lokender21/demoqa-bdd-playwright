import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class FormsPage extends BasePage {

  private selectors = {
    // Practice Form selectors
    firstName:        '#firstName',
    lastName:         '#lastName',
    email:            '#userEmail',
    genderMale:       'label[for="gender-radio-1"]',
    genderFemale:     'label[for="gender-radio-2"]',
    mobileNumber:     '#userNumber',
    subjectInput:     '.subjects-auto-complete__input',
    hobbySports:      'label[for="hobbies-checkbox-1"]',
    hobbyReading:     'label[for="hobbies-checkbox-2"]',
    hobbyMusic:       'label[for="hobbies-checkbox-3"]',
    fileUpload:       '#uploadPicture',
    currentAddress:   '#currentAddress',
    submitButton:     '#submit',
    // Confirmation modal
    modalTitle:       '#example-modal-sizes-title-lg',
    modalTable:       '.table-responsive',
    modalClose:       '#closeLargeModal',
    // Table data rows
    tableRow:         '.table-responsive tbody tr td:nth-child(2)'
  };

  constructor(page: Page) {
    super(page);
  }

  private async hideBlockingOverlays(): Promise<void> {
    await this.page.addStyleTag({
      content: '[id*="Ad"], [id*="ad"], [class*="ad-"], [class*="ads"], iframe { display: none !important; }'
    });
  }

  async goToPracticeForm(): Promise<void> {
    await this.navigate('https://demoqa.com/automation-practice-form');
    await this.hideBlockingOverlays();
    await this.waitForElement(this.selectors.firstName, 10000);
  }

  async fillFirstName(name: string): Promise<void> {
    await this.fill(this.selectors.firstName, name);
  }

  async fillLastName(name: string): Promise<void> {
    await this.fill(this.selectors.lastName, name);
  }

  async fillEmail(email: string): Promise<void> {
    await this.fill(this.selectors.email, email);
  }

  async selectGenderMale(): Promise<void> {
    await this.page.locator(this.selectors.genderMale).click();
  }

  async selectGenderFemale(): Promise<void> {
    await this.page.locator(this.selectors.genderFemale).click();
  }

  async fillMobileNumber(number: string): Promise<void> {
    await this.fill(this.selectors.mobileNumber, number);
  }

  async selectHobby(hobby: 'Sports' | 'Reading' | 'Music'): Promise<void> {
    const map = {
      Sports:  this.selectors.hobbySports,
      Reading: this.selectors.hobbyReading,
      Music:   this.selectors.hobbyMusic
    };
    await this.page.locator(map[hobby]).click();
  }

  async submitForm(): Promise<void> {
    await this.page.locator(this.selectors.submitButton).scrollIntoViewIfNeeded();
    await this.page.locator(this.selectors.submitButton).click();
  }

  async isConfirmationModalVisible(): Promise<boolean> {
    return await this.isVisible(this.selectors.modalTitle);
  }

  async getModalTitle(): Promise<string> {
    return await this.getText(this.selectors.modalTitle);
  }

  async getSubmittedValue(label: string): Promise<string> {
    const rows = this.page.locator('.table-responsive tbody tr');
    const count = await rows.count();
    for (let i = 0; i < count; i++) {
      const labelCell = await rows.nth(i).locator('td').nth(0).innerText();
      if (labelCell.trim() === label) {
        return await rows.nth(i).locator('td').nth(1).innerText();
      }
    }
    return '';
  }

  async closeModal(): Promise<void> {
    await this.click(this.selectors.modalClose);
  }
}