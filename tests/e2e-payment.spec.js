// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import testData from '../data/test-data.json' with { type: 'json' };

test('E2E: Random purchase flow with price validation', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  // 1. Login
  await loginPage.goto();
  // @ts-ignore
  await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);

  // 2. Escanear productos del sitio y Selección Aleatoria
  const allProducts = await inventoryPage.getAllProducts();
  
  // Mezclamos y seleccionamos 5 productos (o menos si no hay suficientes)
  const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
  const numberOfItems = Math.min(5, allProducts.length);
  const selectedProducts = shuffled.slice(0, numberOfItems);
  
  console.log(`Selected ${numberOfItems} products:`, selectedProducts.map(p => p.name));

  // 3. Agregar productos al carrito
  for (const product of selectedProducts) {
    await inventoryPage.addItemToCart(product.name);
  }

  // 4. Ir al carrito y validar
  await inventoryPage.goToCart();
  
  // Validar nombres en el carrito
  const cartItemNames = await cartPage.getCartItemNames();
  const selectedNames = selectedProducts.map(p => p.name);
  expect(cartItemNames).toEqual(expect.arrayContaining(selectedNames));
  expect(cartItemNames.length).toBe(selectedProducts.length);

  // 5. Checkout Flow
  await cartPage.goToCheckout();
  await checkoutPage.fillInformation(
    testData.customer.firstName, 
    testData.customer.lastName, 
    testData.customer.zip
  );

  // 6. Validación de Precios (CRÍTICO)
  // Calcular el total esperado sumando los precios de los productos seleccionados
  const expectedTotal = selectedProducts.reduce((sum, product) => sum + product.price, 0);
  
  // Obtener el total mostrado en la web
  const actualTotal = await checkoutPage.getSubtotal();

  // Usamos toBeCloseTo para evitar errores de redondeo de punto flotante
  expect(actualTotal).toBeCloseTo(expectedTotal, 2);

  // 7. Finalizar Compra
  await checkoutPage.finishCheckout();
  
  // Validar mensaje de éxito
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
