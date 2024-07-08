# Playwright Swaglabs Automation

This project is an advanced Playwright automation framework using the Page Object Model (POM) pattern. It includes tests for the login functionality of Swag Labs, with test data supplied from a JSON file.

## Project Structure

- `tests`: Contains the test files.
- `pages`: Contains the page object model files.
- `data`: Contains test data files.
- `utils`: Contains utility files.
- `results`: Contains trace and screenshot results.
- `playwright.config.js`: Playwright configuration file.
- `package.json`: Project metadata and dependencies.

## How to Run

1. Clone the repository.
2. Navigate to the project directory.
3. Install playwright `npm init playwright@latest` 
4. Run All Tests `npx playwright test`
5. Running specific Tests `npx playwright test testname`


## Update test data
   - Update `data/testData.json` with the required test data.
    - Ensure the `baseURL` in `playwright.config.js` is set correctly.


## Features

- Page Object Model (POM) pattern
- Dynamic test data from JSON file
- Retry mechanism
- Parallel test execution
- Tracing on first retry
- Dynamic screenshots on failure
