const fs = require('fs');
const path = require('path');

// Load JSON data from a file
function loadJsonData(filePath) {
  const absolutePath = path.resolve(__dirname, '..', filePath);
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }
  const data = fs.readFileSync(absolutePath, 'utf8');
  return JSON.parse(data);
}

// Take a screenshot and save it to a specified path
async function takeScreenshot(page, fileName) {
  const screenshotPath = path.resolve(__dirname, '..', 'results', 'screenshots', `${fileName}.png`);
  await page.screenshot({ path: screenshotPath });
}

// Override textContent method to log the text and return it
async function getTextContent(element) {
  await element.waitFor({ state: 'visible', timeout: 5000 });
  const text = await element.textContent();
  console.log(`Text content: ${text}`);
  return text;
}

module.exports = { loadJsonData, takeScreenshot, getTextContent };
