const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  retries: 2, //Number of retries on test failure
  workers: 4, // Number of parallel workers
  reporter: [['html', { open: 'never' }]],
  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'on',
    baseURL: 'https://www.saucedemo.com',
    launchOptions: {
      slowMo: 50,
    },
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    }
  ],
  outputDir: 'results/screenshots',
});
