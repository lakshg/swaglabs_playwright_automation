const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');
const { loadJsonData, takeScreenshot, getTextContent } = require('../utils/helpers');

// Load test data from JSON file
const testData = loadJsonData('data/testData.json');

test.describe('Session Tests', () => {
  // Iterate through each test data set
  testData.loginData.forEach((data, index) => {
    if (data.expectedResult === 'success') {
      test(`Session Test ${index + 1}: ${data.username}`, async ({ page }, testInfo) => {
        const loginPage = new LoginPage(page);
        // uncomment the following line if you need to use the baseURL from the config
         baseURL = testInfo.project.use.baseURL;

        // Navigate to the login page and perform login
        await loginPage.goto(baseURL);
        await loginPage.login(data.username, data.password);

        // Check session-username cookie
        const cookies = await page.context().cookies();
        const sessionCookie = cookies.find(cookie => cookie.name === 'session-username');
        
        // Verify that the session-username cookie value matches the username
        expect(sessionCookie.value).toBe(data.username);

        // Take screenshot if the test fails
        if (testInfo.status !== testInfo.expectedStatus) {
          await takeScreenshot(page, `session-failure-${data.username}`);
        }
      });
    }
  });
});
