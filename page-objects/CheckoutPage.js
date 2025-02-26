import { click, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.basketCards = this.page.locator('[data-qa="basket-card"]');
    this.basketItemPrice = this.page.locator('[data-qa="basket-item-price"]');
    this.removeFromBasketButton = this.page.locator('[data-qa="basket-card-remove-item"]');
    this.continueToChekoutButton = this.page.locator('[data-qa="continue-to-checkout"]');
  }

  removeCheapestProduct = async () => {
    await this.basketCards.first().waitFor();
    const basketCardsBeforeRemoval = await this.basketCards.count();
    await this.basketItemPrice.first().waitFor();
    const allPricesTxt = await this.basketItemPrice.allInnerTexts();
    const allPricesNum = allPricesTxt.map((element) => {
      const withoutDollarSign = element.replace('$', '');
      return parseInt(withoutDollarSign, 10);
    });
    const lowestPrice = Math.min(...allPricesNum);
    const cheapestBasketCardIdx = allPricesNum.indexOf(lowestPrice);
    await this.removeFromBasketButton.nth(cheapestBasketCardIdx).click();

    await expect(this.basketCards).toHaveCount(basketCardsBeforeRemoval - 1);
  };

  continueToCheckout = async () => {
    await this.continueToChekoutButton.waitFor();
    await this.continueToChekoutButton.click();
    await this.page.waitForURL(/\/login/, { timeout: 3000 });
  };
}
