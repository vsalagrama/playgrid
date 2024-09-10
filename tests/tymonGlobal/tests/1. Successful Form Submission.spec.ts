import { test, expect } from '@playwright/test';

// Import page objects for the landing and product pages
import { ContactUsPage } from "../pages/contactus-page";

// Import test data, specifically text box data
import { Form } from '../tests/testdata';

test('1. Successful Form Submission @regression @smoke', async ({ page, isMobile, browser }) => {

    // Create instances of the page objects
    const contactUsPage = new ContactUsPage(page);

    // Launch the application URL
    await contactUsPage.launchURL();
    await contactUsPage.enterDetails(Form);
    await contactUsPage.clickSendMessageButton();
    await contactUsPage.verfiySuccessMessage();


});
