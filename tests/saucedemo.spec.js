// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

test('User can login and add items to cart', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  // Login
  await loginPage.goto();
  // @ts-ignore
  await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);

  // Add items
  await inventoryPage.addItemToCart('Sauce Labs Backpack');
  await inventoryPage.addItemToCart('Sauce Labs Bolt T-Shirt');

  // Go to cart
  await inventoryPage.goToCart();

  // Validate cart
  const count = await cartPage.getCartItemCount();
  expect(count).toBe(2);
});
