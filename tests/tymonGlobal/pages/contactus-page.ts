import { expect, Locator, type Page } from "@playwright/test";
import { testConfig } from '../tests/testdata';
export class ContactUsPage {

    readonly page: Page
    constructor(page: Page) {
        this.page = page
    }

    async launchURL() {
        await this.navigateToURL(testConfig.url);
        await this.waitForPageTitle(testConfig.pageTitle, { timeout: 100000 });
        await this.checkLoadingStatus();
        this.logSuccessfulLaunch();
    }
    async checkLoadingStatus() {
        await expect(this.page.getByRole('link', { name: 'Let\'s Connect' })).toBeVisible();
        console.log('Page loaded successfully');
    }
    async navigateToURL(url: string): Promise<void> {
        await this.page.goto(testConfig.url);
    }
    async waitForPageTitle(title: string, options: { timeout: number }): Promise<void> {
        await expect(this.page).toHaveTitle(title, options);
    }
    logSuccessfulLaunch(): void {
        console.log('URL successfully launched:', this.page.url());
    }

    async enterDetails(formObj: { fullName: string; email: string; message: string; phone: string; areaDropdown: "Customer Support" | "Product" | "Service"; }) {
        const firstName = this.page.getByPlaceholder('Full Name ');
        const phoneNumber = this.page.getByPlaceholder('Phone Number ');
        const email = this.page.getByPlaceholder('E-mail Address ');
        const message = this.page.getByPlaceholder('Your Message ');
        await this.fillTextField(firstName, formObj.fullName);
        await this.fillTextField(phoneNumber, formObj.phone);
        await this.fillTextField(email, formObj.email);
        await this.chooseDropdown(formObj.areaDropdown);
        await this.fillTextField(message, formObj.message);
    }
    async verfiySuccessMessage() {
        await expect(this.page.getByText('Thank you! Form submitted')).toBeVisible();
        console.log('Success Message Verified');
    }
    async chooseDropdown(areaValue: 'Customer Support' | 'Product' | 'Service') {
        await this.page.locator('.mf_select__value-container').click();
        await this.page.getByText(areaValue, { exact: true }).click();
    }
    async clickSendMessageButton() {
        await this.page.getByRole('button', { name: 'Send Message' }).click();
    }
    async fillTextField(locator: Locator, text: string): Promise<void> {
        await locator.fill(text); // Fills the text in the provided locator
        console.log('Text value entered : ', text);
    }

}

