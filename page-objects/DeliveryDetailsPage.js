import { expect } from '@playwright/test';
import { timeout } from '../playwright.config';

export class DeliveryDetailsPage {
  constructor(page) {
    this.page = page;

    this.deliveryFirstName = this.page.locator('[data-qa="delivery-first-name"]');
    this.deliveryLastName = this.page.locator('[data-qa="delivery-last-name"]');
    this.deliveryAddressStreet = this.page.locator('[data-qa="delivery-address-street"]');
    this.deliveryPostcode = this.page.locator('[data-qa="delivery-postcode"]');
    this.deliveryCity = this.page.locator('[data-qa="delivery-city"]');
    this.countryDropdown = this.page.locator('[data-qa="country-dropdown"]');
    this.continueToPaymentButton = this.page.locator('[data-qa="continue-to-payment-button"]');
    this.saveAddressButton = this.page.locator('[data-qa="save-address-button"]');
    this.savedAddressContainer = this.page.locator('[data-qa="saved-address-container"]');

    this.savedAddressFirstName = this.page.locator('[data-qa="saved-address-firstName"]');
    this.savedAddressLastName = this.page.locator('[data-qa="saved-address-lastName"]');
    this.savedAddressStreet = this.page.locator('[data-qa="saved-address-street"]');
    this.savedAddressPostcode = this.page.locator('[data-qa="saved-address-postcode"]');
    this.savedAddressCity = this.page.locator('[data-qa="saved-address-city"]');
    this.savedAddressCountry = this.page.locator('[data-qa="saved-address-country"]');
  }

  fillForm = async (userDetails) => {
    await this.deliveryFirstName.waitFor();
    await this.deliveryFirstName.fill(userDetails.firstName);

    await this.deliveryLastName.waitFor();
    await this.deliveryLastName.fill(userDetails.lastName);

    await this.deliveryAddressStreet.waitFor();
    await this.deliveryAddressStreet.fill(userDetails.address);

    await this.deliveryPostcode.waitFor();
    await this.deliveryPostcode.fill(userDetails.postcode);

    await this.deliveryCity.waitFor();
    await this.deliveryCity.fill(userDetails.city);

    await this.countryDropdown.waitFor();
    await this.countryDropdown.selectOption(userDetails.country);
  };

  saveDetails = async () => {
    await expect(this.savedAddressContainer).toBeHidden();
    expect(await this.savedAddressContainer.count()).toBe(0);

    await this.saveAddressButton.waitFor();
    await this.saveAddressButton.click();

    await this.savedAddressContainer.waitFor();
    expect(await this.savedAddressContainer.count()).toBe(1);

    await this.savedAddressFirstName.first().waitFor();
    expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.deliveryFirstName.inputValue());

    await this.savedAddressLastName.first().waitFor();
    expect(await this.savedAddressLastName.first().innerText()).toBe(await this.deliveryLastName.inputValue());

    await this.savedAddressStreet.first().waitFor();
    expect(await this.savedAddressStreet.first().innerText()).toBe(await this.deliveryAddressStreet.inputValue());

    await this.savedAddressPostcode.first().waitFor();
    expect(await this.savedAddressPostcode.first().innerText()).toBe(await this.deliveryPostcode.inputValue());

    await this.savedAddressCity.first().waitFor();
    expect(await this.savedAddressCity.first().innerText()).toBe(await this.deliveryCity.inputValue());

    await this.savedAddressCountry.first().waitFor();
    expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue());
  };

  continueToPaymentPage = async () => {
    await this.continueToPaymentButton.waitFor();
    await this.continueToPaymentButton.click();
    await this.page.waitForURL(/\/payment/, {timeout: 3000});
  };
};
