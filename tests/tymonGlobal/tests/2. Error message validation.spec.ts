import { test, expect } from '@playwright/test';

// Import page objects for the landing and product pages
import { ContactUsPage } from "../pages/contactus-page";

// Import test data, specifically text box data
import { Form } from './testdata';

test('2. Error message validation @regression @smoke', async ({ page, isMobile, browser }) => {

    // Create instances of the page objects
    const contactUsPage = new ContactUsPage(page);

    // Launch the application URL
    await contactUsPage.launchURL(isMobile);
    await contactUsPage.verifyNameFieldValidation(Form.fullName);
    await contactUsPage.verifyPhoneNumberFieldValidation(Form.phone);
    await contactUsPage.verifyEmailFieldValidation(Form.email);
    await contactUsPage.chooseDropdown(Form.areaDropdown);
    await contactUsPage.typeTextBox(Form.message);
    await contactUsPage.clickSendMessageButton();
    await contactUsPage.verfiySuccessMessage();
});
