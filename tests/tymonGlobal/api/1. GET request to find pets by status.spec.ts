import { test, expect } from '@playwright/test';

// The valid statuses
let validStatuses: string[] = ['available', 'pending', 'sold'];

// Parameterized test case for each valid status
//for (let status of validStatuses) {
validStatuses.forEach((status) => {
    test(`GET request to find pets by status - ${status}`, async ({ request }) => {
        console.log(`the value of status is ${status}`);
        // Sending the GET request
        const response = await request.get('https://petstore.swagger.io/v2/pet/findByStatus', {
            params: {
                status: status,
            },
            headers: {
                Accept: 'application/json',
            },
        });

        // Verify the status code is 200
        expect(response.status()).toBe(200);

        // Parse and print the JSON response
        var responseBody = JSON.parse(await response.text());

        // Assertions to verify if the response contains the pets details
        expect(responseBody).toBeInstanceOf(Array);
        expect(responseBody.length).toBeGreaterThan(0);
        expect(responseBody[0].status).toBe(status);  
        console.log('record count ', responseBody.length);

        // Verify the response contains only pets with the expected status
        for (const pet of responseBody) {
            expect.soft(pet.status).toBe(status);
        }
    });
});