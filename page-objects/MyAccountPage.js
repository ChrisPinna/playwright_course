import { fetch } from 'node-fetch';

export class MyAccountPage
{
  constructor(page) {
    this.page = page;

    this.pageheading = page.getByRole('heading', {name: 'My Account'});

    this.errorMessage = page.locator('[data-qa="error-message"]');
  };

  visit = async () => {
    await this.page.goto("/my-account");
  };

  waitForPageHeading = async () => {
    await this.pageheading.waitFor();
  };

  waitForErrorMessage = async () => {
    await this.errorMessage.waitFor();
  };
};