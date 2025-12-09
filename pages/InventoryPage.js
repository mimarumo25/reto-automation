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

  async getAllProducts() {
    const products = [];
    const items = await this.page.locator('.inventory_item').all();
    
    for (const item of items) {
      const name = await item.locator('.inventory_item_name').innerText();
      const priceText = await item.locator('.inventory_item_price').innerText();
      const price = parseFloat(priceText.replace('$', ''));
      products.push({ name, price });
    }
    
    return products;
  }

  async goToCart() {
    await this.cartLink.click();
  }
};
