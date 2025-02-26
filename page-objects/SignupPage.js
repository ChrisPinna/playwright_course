export class SignupPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('[placeholder=E-Mail]');
    this.passwordInput = page.locator('[placeholder=Password]');
    this.registerButton = page.locator('[type="submit"]');
  }

  register = async (email, password) => {
    await this.emailInput.waitFor();
    await this.emailInput.fill(email);
    await this.passwordInput.waitFor();
    await this.passwordInput.fill(password);
    await this.registerButton.waitFor();
    await this.registerButton.click();
    await this.page.waitForURL('/delivery-details');
  };
}
