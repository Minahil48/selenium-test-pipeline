import { getDriver } from './driver.mjs';
import { By, until } from 'selenium-webdriver';
import { strict as assert } from 'assert';

describe('Login Page Tests', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    console.log('🚀 Launching Chrome...');
    driver = await getDriver();
    await driver.get('http://localhost:5173');
  });

  after(async () => {
    if (driver) await driver.quit();
  });

  it('should load login page and show correct heading', async () => {
    const heading = await driver.findElement(By.css('h2'));
    const text = await heading.getText();
    assert.equal(text, 'Welcome Back!');
  });

  it('should contain email and password input fields', async () => {
    const emailInput = await driver.findElement(By.css('input[type="email"]'));
    const passwordInput = await driver.findElement(By.css('input[type="password"]'));
    assert.ok(emailInput && passwordInput);
  });

  it('should contain login button', async () => {
    const button = await driver.findElement(By.css('button[type="submit"]'));
    const text = await button.getText();
    assert.ok(text.toLowerCase().includes('login'));
  });

  it('should toggle to signup when clicking Sign Up button', async () => {
    const toggleButton = await driver.findElement(By.xpath("//button[text()='Sign Up']"));
    await toggleButton.click();
    const heading = await driver.findElement(By.css('h2'));
    const text = await heading.getText();
    assert.equal(text, 'Create Account');
  });

  it('should show role dropdown on signup page', async () => {
    const roleDropdown = await driver.findElement(By.css('select'));
    const options = await roleDropdown.findElements(By.css('option'));
    const values = await Promise.all(options.map(async (opt) => await opt.getAttribute('value')));
    assert.deepEqual(values.sort(), ['admin', 'user']);
  });

  it('should toggle back to login when clicking Login button', async () => {
    const toggleButton = await driver.findElement(By.xpath("//button[text()='Login']"));
    await toggleButton.click();
    const heading = await driver.findElement(By.css('h2'));
    const text = await heading.getText();
    assert.equal(text, 'Welcome Back!');
  });

  it('should show alert on invalid login', async () => {
    const email = await driver.findElement(By.css('input[type="email"]'));
    const password = await driver.findElement(By.css('input[type="password"]'));
    const loginBtn = await driver.findElement(By.css('button[type="submit"]'));

    await email.clear();
    await password.clear();
    await email.sendKeys('wrong@example.com');
    await password.sendKeys('wrongpassword');

    await loginBtn.click();

    await driver.wait(until.alertIsPresent(), 5000);
    const alert = await driver.switchTo().alert();
    const message = await alert.getText();
    await alert.accept();

    assert.ok(message.toLowerCase().includes('something went wrong') || message.toLowerCase().includes('error'));
  });

  it('should prevent form submission when email is empty', async () => {
  const email = await driver.findElement(By.css('input[type="email"]'));
  const password = await driver.findElement(By.css('input[type="password"]'));
  const loginBtn = await driver.findElement(By.css('button[type="submit"]'));

  await email.clear();
  await password.clear();
  await password.sendKeys('testpassword');

  await loginBtn.click();

  const isValid = await email.getAttribute('required');
  assert.equal(isValid, 'true');
});
it('should prevent form submission when password is empty', async () => {
  const email = await driver.findElement(By.css('input[type="email"]'));
  const password = await driver.findElement(By.css('input[type="password"]'));
  const loginBtn = await driver.findElement(By.css('button[type="submit"]'));

  await email.clear();
  await password.clear();
  await email.sendKeys('test@example.com');

  await loginBtn.click();

  const isValid = await password.getAttribute('required');
  assert.equal(isValid, 'true');
});
it('should not store token in localStorage after signup', async () => {
  // Switch to signup
  const toggleButton = await driver.findElement(By.xpath("//button[text()='Sign Up']"));
  await toggleButton.click();

  const email = await driver.findElement(By.css('input[type="email"]'));
  const password = await driver.findElement(By.css('input[type="password"]'));
  const roleSelect = await driver.findElement(By.css('select'));
  const signupBtn = await driver.findElement(By.css('button[type="submit"]'));

  await email.clear();
  await password.clear();
  await email.sendKeys(`user${Date.now()}@test.com`);
  await password.sendKeys('validpassword');
  await roleSelect.sendKeys('user');

  await signupBtn.click();

  // Wait a moment for alert
  await driver.wait(until.alertIsPresent(), 5000);
  const alert = await driver.switchTo().alert();
  await alert.accept();

  // Check localStorage via js
  const token = await driver.executeScript("return localStorage.getItem('token');");
  assert.equal(token, null);
});

});
