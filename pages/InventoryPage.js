export class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async addItemToCart(itemName) {
    await this.page.locator('.inventory_item', { hasText: itemName })
      .getByRole('button', { name: 'Add to cart' }).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
};
