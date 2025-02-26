import { expect } from '@playwright/test';
import { Navegation } from './Navegation';
import { isDesktopViewport } from '../util/isDesktopViewport';

export class ProductsPage {
  constructor(page) {
    this.page = page;

    this.addButtons = this.page.locator('[data-qa="product-button"]');

    this.sortDropdown = this.page.locator('[data-qa="sort-dropdown"]');

    this.productCards = this.page.locator('[data-qa="product-card"]');
  }

  visit = async () => {
    await this.page.goto('/');
  };

  addProductToBasket = async (index) => {
    const specificAddButton = this.addButtons.nth(index);
    await specificAddButton.waitFor();
    await expect(specificAddButton).toHaveText('Add to Basket');
    const navegation = new Navegation(this.page);
    var basketCountBeforeClick;
    if (isDesktopViewport(this.page)) {
      basketCountBeforeClick = await navegation.getBasketCount();
    }

    await specificAddButton.click();
    await expect(specificAddButton).toHaveText('Remove from Basket');
    if (isDesktopViewport(this.page)) {
      const basketCountAfterClick = await navegation.getBasketCount();
      expect(basketCountAfterClick).toBeGreaterThan(basketCountBeforeClick);
    }
  };

  sortByCheapest = async () => {
    await this.sortDropdown.waitFor();
    await this.productCards.first().waitFor();
    const productCardsDefault = await this.productCards.allInnerTexts();
    await this.sortDropdown.selectOption('price-asc');
    const productCardsAcending = await this.productCards.allInnerTexts();
    await expect(productCardsDefault).not.toEqual(productCardsAcending);
  };
}
