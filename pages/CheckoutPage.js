export class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Formulario de Información
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    
    // Resumen (Overview)
    this.summarySubtotalLabel = page.locator('.summary_subtotal_label');
    this.finishButton = page.locator('[data-test="finish"]');
    
    // Confirmación
    this.completeHeader = page.locator('.complete-header');
  }

  async fillInformation(firstName, lastName, zip) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(zip);
    await this.continueButton.click();
  }

  /**
   * Obtiene el subtotal numérico del resumen (Item total: $XX.XX)
   * @returns {Promise<number>}
   */
  async getSubtotal() {
    const text = await this.summarySubtotalLabel.innerText();
    // Extrae el número del texto "Item total: $29.99"
    return parseFloat(text.replace('Item total: $', ''));
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async getCompleteMessage() {
    return await this.completeHeader.innerText();
  }
};
