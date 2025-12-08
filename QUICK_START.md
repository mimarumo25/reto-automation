# ⚡ Guía de Inicio Rápido

Esta guía te llevará desde cero hasta ejecutar tus primeras pruebas en **menos de 5 minutos**.

---

## 🚀 Inicio Rápido (Quick Start)

### Paso 1: Verificar Requisitos

Asegúrate de tener instalado **Node.js v18+**:

```bash
node --version
# Debe mostrar: v18.x.x o superior
```

Si no lo tienes instalado:
- **Windows**: Descarga desde [nodejs.org](https://nodejs.org/)
- **macOS**: `brew install node`
- **Linux**: `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash - && sudo apt-get install -y nodejs`

---

### Paso 2: Clonar e Instalar

```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/reto-automation-f2x.git
cd reto-automation-f2x

# 2. Instalar dependencias
npm install

# 3. Instalar navegadores de Playwright
npx playwright install
```

---

### Paso 3: Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp .env.example .env

# El archivo .env ya tiene los valores por defecto:
# BASE_URL=https://www.saucedemo.com/
# SAUCE_USERNAME=standard_user
# SAUCE_PASSWORD=secret_sauce
# API_BASE_URL=https://jsonplaceholder.typicode.com
```

> ⚠️ **Nota**: No necesitas modificar el `.env` para las pruebas de demostración.

---

### Paso 4: Ejecutar Pruebas

#### Opción A: Ejecutar todas las pruebas

```bash
npx playwright test
```

#### Opción B: Ejecutar con interfaz visual (recomendado)

```bash
npx playwright test --ui
```

#### Opción C: Ejecutar en modo headed (ver navegador)

```bash
npx playwright test --headed
```

---

### Paso 5: Ver Reportes

```bash
npx playwright show-report
```

Esto abrirá un servidor local en `http://localhost:9323` con el reporte HTML interactivo.

---

## 🎯 Comandos Más Comunes

### Ejecutar Tests Específicos

```bash
# Solo tests UI de SauceDemo
npx playwright test tests/saucedemo.spec.js

# Solo tests de API
npx playwright test tests/jsonplaceholder.spec.js

# Solo flujo E2E completo
npx playwright test tests/e2e-payment.spec.js
```

### Ejecutar por Navegador

```bash
# Solo Chromium
npx playwright test --project="UI - Chromium"

# Solo Firefox
npx playwright test --project="UI - Firefox"

# Solo API Tests
npx playwright test --project="API Tests"
```

### Debugging

```bash
# Modo debug con Playwright Inspector
npx playwright test --debug

# Ejecutar en slow motion (para ver acciones)
npx playwright test --headed --slow-mo=1000
```

---

## 📊 Estructura de un Test Básico

### Test UI con Page Object Model

```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test('User can login', async ({ page }) => {
  // 1. Crear instancia del Page Object
  const loginPage = new LoginPage(page);
  
  // 2. Navegar a la página
  await loginPage.goto();
  
  // 3. Realizar acción
  await loginPage.login('standard_user', 'secret_sauce');
  
  // 4. Validar resultado
  await expect(page).toHaveURL(/inventory/);
});
```

### Test API

```javascript
import { test, expect } from '@playwright/test';

test('Should get all posts', async ({ request }) => {
  // 1. Hacer request
  const response = await request.get('/posts');
  
  // 2. Validar status
  expect(response.ok()).toBeTruthy();
  
  // 3. Validar datos
  const posts = await response.json();
  expect(posts.length).toBeGreaterThan(0);
});
```

---

## 🏗️ Agregar Tu Primera Prueba

### 1. Crear Page Object (si es UI)

```bash
# Crear archivo en pages/
touch pages/NewPage.js
```

```javascript
// pages/NewPage.js
export class NewPage {
  constructor(page) {
    this.page = page;
    this.myButton = page.locator('[data-test="button"]');
  }

  async goto() {
    await this.page.goto('/new-page');
  }

  async clickButton() {
    await this.myButton.click();
  }
}
```

### 2. Crear Test Spec

```bash
# Crear archivo en tests/
touch tests/new-test.spec.js
```

```javascript
// tests/new-test.spec.js
import { test, expect } from '@playwright/test';
import { NewPage } from '../pages/NewPage';

test('My new test', async ({ page }) => {
  const newPage = new NewPage(page);
  await newPage.goto();
  await newPage.clickButton();
  await expect(page).toHaveURL(/success/);
});
```

### 3. Ejecutar Tu Test

```bash
npx playwright test tests/new-test.spec.js --headed
```

---

## 📚 Próximos Pasos

Una vez que domines lo básico, explora:

1. **Documentación Completa**: Lee el [README.md](./README.md) completo
2. **Configuración Avanzada**: Revisa [playwright.config.js](./playwright.config.js)
3. **Contribuir**: Lee [CONTRIBUTING.md](./CONTRIBUTING.md)
4. **CI/CD**: Implementa el workflow de [GitHub Actions](.github/workflows/playwright.yml)

---

## 🆘 Ayuda Rápida

### Problema: Los navegadores no se instalan

```bash
# Solución: Forzar reinstalación
npx playwright install --force --with-deps
```

### Problema: Tests muy lentos

```javascript
// Solución: Editar playwright.config.js
use: {
  launchOptions: {
    slowMo: 0,  // Cambiar de 1000 a 0
  },
}
```

### Problema: Variables de entorno no se cargan

```bash
# Verificar que .env existe
cat .env

# Si no existe, copiar desde ejemplo
cp .env.example .env
```

---

## 📞 Soporte

- **Documentación**: [README.md](./README.md)
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/reto-automation-f2x/issues)
- **Playwright Docs**: [playwright.dev](https://playwright.dev/)

---

<div align="center">

**¡Felicidades! 🎉 Ya estás listo para automatizar pruebas con Playwright.**

[Volver al README Principal](./README.md)

</div>
