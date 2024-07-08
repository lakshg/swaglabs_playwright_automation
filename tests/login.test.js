const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { InventoryPage } = require('../pages/inventoryPage');
const { loadJsonData, takeScreenshot, getTextContent } = require('../utils/helpers');

// Load test data from JSON file
const testData = loadJsonData('data/testData.json');

test.describe('Login Tests', () => {
  let loginPage;
  let inventoryPage;
  let baseURL;

  // Setup: Runs before all tests in the group
  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    baseURL = testInfo.project.use.baseURL;
  });

  // Teardown: Runs after all tests in the group
  test.afterAll(async ({ browser }) => {
    await browser.close();
  });

  // Iterating through test data and defining individual tests
  testData.loginData.forEach((data, index) => {
    test(`Login Test ${index + 1}: ${data.username} with ${data.password}`, async ({ page }, testInfo) => {
      // Setup: Runs before each test
      await loginPage.goto(baseURL);

      // Perform login action
      await loginPage.login(data.username, data.password);

      // Verify the login result based on expected result
      if (data.expectedResult === 'success') {
        await expect(await inventoryPage.isLoaded()).toBe(true);
      } else {
        await expect(await loginPage.getErrorMessage()).not.toBeNull();

      // Apply overridden getTextContent method to login button and login logo
        const loginButtonText = await getTextContent(loginPage.loginButton);
        const loginLogoText = await getTextContent(loginPage.loginLogo);
        console.log(`Login button text: ${loginButtonText}`);
        console.log(`Login logo text: ${loginLogoText}`);
      }


      // Take screenshot if the test fails
      if (testInfo.status !== testInfo.expectedStatus) {
        await takeScreenshot(page, `failure-${data.username}`);
      }
    });
  });
});
