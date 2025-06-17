import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

export async function getDriver() {
  const options = new chrome.Options();
  options.addArguments('--headless=new'); // modern headless
  options.addArguments('--disable-gpu');
  options.addArguments('--no-sandbox');

  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  return driver;
}
