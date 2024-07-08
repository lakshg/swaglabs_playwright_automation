const { loadJsonData } = require('../utils/helpers');

class LoginPage {
  constructor(page) {
    this.page = page;
    const locators = loadJsonData('locators.json').loginPage;
    this.usernameInput = page.locator(locators.usernameInput);
    this.passwordInput = page.locator(locators.passwordInput);
    this.loginButton = page.locator(locators.loginButton);
    this.loginLogo = page.locator(locators.loginLogo);
    this.errorMessage = page.locator(locators.errorMessage);
  }

  // Navigate to the login page
  async goto(baseURL) {
    await this.page.goto(baseURL);
  }

  // Perform login action
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Get error message text
  async getErrorMessage() {
    return this.errorMessage.textContent();
  }
}

module.exports = { LoginPage };
