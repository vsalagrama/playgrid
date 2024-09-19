import { test, expect } from '@playwright/test';

test('POST request to create a new order in the pet store @regression', async ({ request }) => {
  // Define the payload (data) to be sent in the POST request
  const orderPayload = {
    id: 100,
    petId: 100,
    quantity: 20,
    shipDate: "2024-09-17T07:01:38.743Z",
    status: "placed",
    complete: true
  };

  // Send the POST request to create a new order
  const response = await request.post('https://petstore.swagger.io/v2/store/order', {
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json',
    },
    data: orderPayload,
  });

  // Assert that the response status is 200 (OK)
  expect(response.status()).toBe(200);

  // Parse and print the JSON response
  var responseBody = JSON.parse(await response.text());
  console.log('Response body:', responseBody);

  // Validate that the response body contains the correct data
  expect(responseBody.id).toBe(orderPayload.id);
  expect(responseBody.petId).toBe(orderPayload.petId);
  expect(responseBody.quantity).toBe(orderPayload.quantity);
  expect(responseBody.status).toBe(orderPayload.status);
  expect(responseBody.complete).toBe(orderPayload.complete);
});
