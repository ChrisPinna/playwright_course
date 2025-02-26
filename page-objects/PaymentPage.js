import { expect } from "@playwright/test";

export class PaymentPage
{
  constructor(page) {


    this.page = page;
    this.discountCode = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]');
    this.discountCodeInput = page.locator('[data-qa="discount-code-input"]');
    this.totalValue = page.locator('[data-qa="total-value"]');
    this.submitteDiscountButton = page.locator('[data-qa="submit-discount-button"]');
    this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]');
    this.totalWithDiscountValue = page.locator('[data-qa="total-with-discount-value"]');

    this.creditcardOwner = page.locator('[data-qa="credit-card-owner"]');
    this.creditcardNumber = page.locator('[data-qa="credit-card-number"]');
    this.creditcardExpiration = page.locator('[data-qa="valid-until"]');
    this.creditcardCVC = page.locator('[data-qa="credit-card-cvc"]');
    this.payButton = page.locator('[data-qa="pay-button"]');
  };

  applyDiscount = async () =>
  {
    await this.discountCode.waitFor();
    const code = await this.discountCode.innerText();
    await this.discountCodeInput.waitFor();

    // Opition #1 for discount inputs
    await this.discountCodeInput.fill(await this.discountCode.innerText());
    await expect(this.discountCodeInput).toHaveValue(code);

    // Option #2 for laggy inpjt: slow typing
    // await this.discountCodeInput.focus();
    // await this.page.keyboard.type(code, {delay: 500});
    // expect(await this.discountCodeInput.inputValue()).toBe(code);
    // await this.page.pause();

    await this.totalValue.waitFor();
    const totalValue = parseInt(await this.totalValue.innerText(), 10);

    expect(await this.discountActiveMessage).toBeHidden();

    await this.submitteDiscountButton.waitFor();
    await this.submitteDiscountButton.click();

    await this.discountActiveMessage.waitFor();
    expect(await this.discountActiveMessage).toBeVisible();

    await this.totalWithDiscountValue.waitFor();
    expect(parseInt(await this.totalWithDiscountValue.innerText(), 10)).toBeLessThan(totalValue);
  };

  fillCreditcardForm = async (creditcard) => 
  {
    await this.creditcardOwner.waitFor();
    await this.creditcardOwner.fill(creditcard.owner);

    await this.creditcardNumber.waitFor();
    await this.creditcardNumber.fill(creditcard.number);

    await this.creditcardExpiration.waitFor();
    await this.creditcardExpiration.fill(creditcard.expiration);

    await this.creditcardCVC.waitFor();
    await this.creditcardCVC.fill(creditcard.cvc);
  };

  completePayment = async () =>
  {
    await this.payButton.waitFor();
    await this.payButton.click();
    await this.page.waitForURL(/\/thank-you/, {timeout: 3000})
  };
};