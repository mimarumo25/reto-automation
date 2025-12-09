export class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
  }

  async getCartItemCount() {
    return await this.cartItems.count();
  }

  async getCartItemNames() {
    return await this.page.locator('.inventory_item_name').allInnerTexts();
  }

  async goToCheckout() {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
  }
};
