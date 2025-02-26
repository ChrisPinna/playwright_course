import { click } from '@playwright/test';
import { isDesktopViewport } from '../util/isDesktopViewport';

export class Navegation {
  constructor(page) {
    this.page = page;
    this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    this.checkoutNavLink = page.getByRole('link', { name: 'Checkout' });
    this.burgerButton = page.locator('svg');
  }

  getBasketCount = async () => {
    if (isDesktopViewport(this.page)) {
      await this.basketCounter.waitFor();
      const text = await this.basketCounter.innerText();
      return parseInt(text, 10);
    }
  };

  goToCheckout = async () => {
    if (!isDesktopViewport(this.page)) {
      await this.burgerButton.waitFor();
      await this.burgerButton.click();
    }

    await this.checkoutNavLink.waitFor();
    await this.checkoutNavLink.click();
    await this.page.waitForURL('/basket');
  };
}
