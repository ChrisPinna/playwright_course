import { test, expect, selectors } from '@playwright/test';

test('Product page add to basket', async ({ page }) => {
  await page.goto('/');

  const addToBasketButton = page.locator('[data-qa="product-button"]').first();
  await addToBasketButton.waitFor();

  const headerBasketCount = page.locator('[data-qa="header-basket-count"]');
  await headerBasketCount.waitFor();

  await expect(headerBasketCount).toHaveText('0');
  await expect(addToBasketButton).toHaveText('Add to Basket');

  await addToBasketButton.click();

  await expect(addToBasketButton).toHaveText('Remove from Basket');
  await expect(headerBasketCount).toHaveText('1');

  const checkouLink = page.getByRole('link', { name: 'Checkout' });
  await checkouLink.waitFor();

  await checkouLink.click();
  await page.waitForURL('/Basket');

  const basketHeaderOne = page.locator('h1', { name: 'Basket' });
  await basketHeaderOne.waitFor();

  await expect(basketHeaderOne).toHaveText('Basket');

  await page.pause();
});
