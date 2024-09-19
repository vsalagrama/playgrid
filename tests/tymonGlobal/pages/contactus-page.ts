import { expect, Locator, type Page } from "@playwright/test";
import { testConfig } from '../tests/testdata';
export class ContactUsPage {

    private firstName: Locator;
    private phoneNumber: Locator;
    private email: Locator;
    private message: Locator;
   
    readonly page: Page
    constructor(page: Page) {
        this.page = page;
        this.firstName = this.page.getByPlaceholder('Full Name ');
        this.phoneNumber = this.page.getByPlaceholder('Phone Number ');
        this.email = this.page.getByPlaceholder('E-mail Address ');
        this.message = this.page.getByPlaceholder('Your Message ');
    }

    async launchURL(isMobile: boolean) {
        // Navigate to the specified URL
        await this.navigateToURL(testConfig.url);

        // Wait for the page to load with the expected title
        await this.waitForPageTitle(testConfig.pageTitle, { timeout: 100000 });

        // Check loading status based on the device type (mobile or desktop)
        if (isMobile) {
            await this.checkLoadingStatusMobile();
        }
        else {
            await this.checkLoadingStatus();
        }
        this.logSuccessfulLaunch();
    }
    async checkLoadingStatusMobile() {
        await expect(this.page.locator('h2').filter({ hasText: 'Let\'s Talk' })).toBeVisible();
        console.log('Page loaded successfully in mobile view');
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
        
        await this.fillTextField(this.firstName, formObj.fullName);
        await this.fillTextField(this.phoneNumber, formObj.phone);
        await this.fillTextField(this.email, formObj.email);
        await this.chooseDropdown(formObj.areaDropdown);
        await this.fillTextField(this.message, formObj.message);
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

    async verifyNameFieldValidation(fullName: string) {
        await this.fillTextField(this.firstName, fullName);
        await this.clearTextField(this.firstName);
        await this.verifyErrorMessage();
        await this.fillTextField(this.firstName, fullName);
    }
    async verifyErrorMessage() {
        await expect(this.page.getByText('This field is required.')).toBeVisible();
        console.log('Error Message verified');
    }
    async clearTextField(locator: Locator) {
        await locator.clear();
        console.log('Text field cleared ', locator);
    }

    async verifyPhoneNumberFieldValidation(phone: string) {
        await this.fillTextField(this.phoneNumber, phone);
        await this.clearTextField(this.phoneNumber);
        await this.verifyErrorMessage();
        await this.fillTextField(this.phoneNumber, phone);
    }
    async verifyEmailFieldValidation(emailaddress: string) {
        await this.fillTextField(this.email, emailaddress);
        await this.clearTextField(this.email);
        await this.verifyErrorMessage();
        await this.fillTextField(this.email, emailaddress);
    }
    async typeTextBox(text:string){
        await this.fillTextField(this.message, text);
        await this.clearTextField(this.message);
        await this.verifyErrorMessage();
        await this.fillTextField(this.message, text);
    }



}

