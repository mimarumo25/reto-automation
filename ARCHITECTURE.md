# 🏗️ Arquitectura del Framework

Este documento describe la arquitectura y patrones de diseño implementados en el framework de automatización.

---

## 📐 Diagrama de Arquitectura General

```
┌─────────────────────────────────────────────────────────────────────┐
│                         TEST FRAMEWORK                              │
│                     (Playwright + Node.js)                          │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
        ┌───────────▼──────────┐   ┌─────────▼─────────┐
        │    UI TESTS (E2E)    │   │    API TESTS      │
        │   Page Object Model  │   │  Request/Response │
        └──────────────────────┘   └───────────────────┘
                    │                         │
        ┌───────────┴────────────┐           │
        │                        │           │
┌───────▼────────┐    ┌─────────▼────────┐  │
│  Page Objects  │    │   Test Data      │  │
│  (pages/)      │    │   (data/)        │  │
└────────────────┘    └──────────────────┘  │
                                            │
┌───────────────────────────────────────────▼───────────────────┐
│                     CONFIGURATION LAYER                        │
│   playwright.config.js | .env | package.json                  │
└────────────────────────────────────────────────────────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
        ┌───────────▼──────────┐ ┌─────────▼─────────┐
        │   BROWSERS           │ │   REPORTING       │
        │ Chromium | Firefox   │ │ HTML | Trace      │
        └──────────────────────┘ └───────────────────┘
```

---

## 🎨 Patrón Page Object Model (POM)

### Estructura del Patrón

```
┌─────────────────────────────────────────────────────────┐
│                    TEST SPEC                            │
│              (tests/*.spec.js)                          │
│                                                         │
│  • Define casos de prueba                              │
│  • Utiliza Page Objects                                │
│  • Implementa assertions                               │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ imports
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│                   PAGE OBJECT                           │
│               (pages/*.js)                              │
│                                                         │
│  • Encapsula elementos de UI                           │
│  • Define métodos de acción                            │
│  • Maneja localizadores                                │
│  • Reutilizable en múltiples tests                     │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ interacts with
                 │
                 ▼
┌─────────────────────────────────────────────────────────┐
│                  WEB APPLICATION                        │
│            (https://app.example.com)                    │
│                                                         │
│  • DOM Elements                                         │
│  • User Interactions                                    │
│  • Application State                                    │
└─────────────────────────────────────────────────────────┘
```

### Ejemplo de Implementación

#### 1. Page Object (LoginPage.js)

```javascript
export class LoginPage {
  constructor(page) {
    this.page = page;
    // Localizadores centralizados
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Métodos de navegación
  async goto() {
    await this.page.goto('/');
  }

  // Métodos de acción
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // Métodos de validación/obtención
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
}
```

#### 2. Test Spec (login.spec.js)

```javascript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Functionality', () => {
  test('successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await loginPage.login('valid_user', 'valid_pass');
    
    await expect(page).toHaveURL(/dashboard/);
  });
});
```

### Beneficios del POM

1. **Mantenibilidad** 📝
   - Cambios en UI solo requieren actualizar el Page Object
   - No es necesario modificar múltiples tests

2. **Reutilización** ♻️
   - Métodos pueden usarse en diferentes tests
   - Reduce duplicación de código

3. **Legibilidad** 📖
   - Tests más limpios y fáciles de entender
   - Abstracción de detalles de implementación

4. **Separación de Responsabilidades** 🎯
   - Lógica de UI separada de lógica de prueba
   - Cada clase tiene una responsabilidad única

---

## 📊 Data-Driven Testing

### Estructura

```
┌─────────────────────────────────────────┐
│          TEST SPEC                      │
│      (tests/*.spec.js)                  │
└───────────┬─────────────────────────────┘
            │
            │ imports
            │
            ▼
┌─────────────────────────────────────────┐
│         TEST DATA                       │
│     (data/test-data.json)               │
│                                         │
│  {                                      │
│    "productsToAdd": [...],              │
│    "expectedCartCount": 2,              │
│    "customer": {...}                    │
│  }                                      │
└─────────────────────────────────────────┘
```

### Ejemplo de Implementación

#### test-data.json

```json
{
  "productsToAdd": [
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt"
  ],
  "expectedCartCount": 2,
  "customer": {
    "firstName": "Test",
    "lastName": "User",
    "zip": "12345"
  }
}
```

#### Test utilizando los datos

```javascript
import testData from '../data/test-data.json' with { type: 'json' };

test('Add items from test data', async ({ page }) => {
  for (const product of testData.productsToAdd) {
    await inventoryPage.addItemToCart(product);
  }
  
  const count = await cartPage.getCartItemCount();
  expect(count).toBe(testData.expectedCartCount);
});
```

### Ventajas

- ✅ Datos centralizados y fáciles de modificar
- ✅ Separación entre lógica y datos
- ✅ Facilita pruebas con múltiples sets de datos
- ✅ Mantenimiento simplificado

---

## 🔄 Flujo de Ejecución Completo

```
START
  │
  ├─► [1] Leer playwright.config.js
  │        ├─ Configurar timeouts
  │        ├─ Definir proyectos (browsers)
  │        └─ Cargar variables de entorno (.env)
  │
  ├─► [2] Seleccionar Tests a Ejecutar
  │        ├─ Filtrar por archivo/patrón
  │        ├─ Filtrar por proyecto
  │        └─ Filtrar por nombre de test
  │
  ├─► [3] Para cada Test:
  │        │
  │        ├─► [3.1] Iniciar Browser Context
  │        │         ├─ Crear página
  │        │         ├─ Configurar viewport
  │        │         └─ Iniciar grabación (video/trace)
  │        │
  │        ├─► [3.2] Ejecutar Test
  │        │         ├─ Instanciar Page Objects
  │        │         ├─ Cargar Test Data
  │        │         ├─ Realizar acciones
  │        │         └─ Ejecutar assertions
  │        │
  │        ├─► [3.3] Capturar Evidencias
  │        │         ├─ Screenshots (si falla)
  │        │         ├─ Videos (si configurado)
  │        │         └─ Traces (para debug)
  │        │
  │        └─► [3.4] Cerrar Browser Context
  │
  ├─► [4] Generar Reportes
  │        ├─ HTML Report (playwright-report/)
  │        ├─ Consolidar resultados
  │        └─ Estadísticas de ejecución
  │
  └─► [5] Finalizar
           └─ Código de salida (0=success, 1=failure)
END
```

---

## 🌐 Arquitectura Multi-Browser

```
┌─────────────────────────────────────────────────────────┐
│               playwright.config.js                      │
│                                                         │
│  projects: [                                            │
│    { name: 'UI - Chromium', use: {...} },              │
│    { name: 'UI - Firefox', use: {...} },               │
│    { name: 'API Tests', use: {...} }                   │
│  ]                                                      │
└────────────┬─────────────┬─────────────┬────────────────┘
             │             │             │
             │             │             │
    ┌────────▼──────┐  ┌──▼──────┐  ┌──▼──────────────┐
    │  Chromium     │  │ Firefox │  │  API Context    │
    │  Context      │  │ Context │  │  (Headless)     │
    └───────────────┘  └─────────┘  └─────────────────┘
         │                  │              │
         │                  │              │
    ┌────▼──────────┐  ┌───▼─────────┐   │
    │  UI Tests     │  │  UI Tests   │   │
    │  (Chromium)   │  │  (Firefox)  │   │
    └───────────────┘  └─────────────┘   │
                                          │
                                     ┌────▼────────┐
                                     │  API Tests  │
                                     │  (REST)     │
                                     └─────────────┘
```

### Configuración por Proyecto

```javascript
{
  name: 'UI - Chromium',
  testMatch: /.*(saucedemo|e2e).*\.spec\.js/,
  use: {
    ...devices['Desktop Chrome'],
    baseURL: process.env.BASE_URL,
    video: 'on',
    screenshot: 'on',
    trace: 'on',
    launchOptions: {
      slowMo: 1000,  // Para debugging visual
    },
  },
}
```

---

## 🧩 Componentes del Framework

### 1. Tests Layer

```
tests/
├── saucedemo.spec.js      # Tests básicos de UI
├── e2e-payment.spec.js    # Flujo E2E completo
└── jsonplaceholder.spec.js # Tests de API REST
```

**Responsabilidad**: Definir casos de prueba y assertions

### 2. Page Objects Layer

```
pages/
├── LoginPage.js          # Página de login
├── InventoryPage.js      # Página de inventario
├── CartPage.js           # Página de carrito
└── CheckoutPage.js       # Página de checkout
```

**Responsabilidad**: Encapsular interacciones con UI

### 3. Data Layer

```
data/
└── test-data.json        # Datos de prueba centralizados
```

**Responsabilidad**: Proveer datos para tests

### 4. Configuration Layer

```
root/
├── playwright.config.js  # Configuración de Playwright
├── .env                  # Variables de entorno
└── package.json          # Dependencias y scripts
```

**Responsabilidad**: Configurar el framework

### 5. Reports Layer

```
playwright-report/        # Reportes HTML
test-results/            # Screenshots, videos, traces
```

**Responsabilidad**: Evidencias y reportes

---

## 🔒 Gestión de Configuración

### Variables de Entorno (.env)

```
Application Layer
       │
       ▼
┌─────────────┐
│   .env      │  ◄── Valores sensibles no versionados
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  playwright.config  │  ◄── Lee variables con dotenv
└──────┬──────────────┘
       │
       ▼
┌─────────────┐
│   Tests     │  ◄── Acceden vía process.env
└─────────────┘
```

### Ventajas

- 🔐 Credenciales fuera del código
- 🌍 Diferentes ambientes (dev, staging, prod)
- 🔄 Fácil cambio de configuración
- 🚫 .env no se versiona (en .gitignore)

---

## 📈 Extensibilidad del Framework

### Agregar Nuevos Page Objects

```javascript
// 1. Crear archivo pages/NewPage.js
export class NewPage {
  constructor(page) {
    this.page = page;
    // Definir localizadores
  }
  
  async performAction() {
    // Implementar métodos
  }
}

// 2. Usar en test
import { NewPage } from '../pages/NewPage';
// ...
```

### Agregar Nuevos Tests

```javascript
// 1. Crear tests/new-test.spec.js
import { test, expect } from '@playwright/test';

test('New test case', async ({ page }) => {
  // Implementar test
});
```

### Agregar Nuevos Proyectos (Browsers)

```javascript
// En playwright.config.js
projects: [
  // ... proyectos existentes
  {
    name: 'Mobile Safari',
    use: {
      ...devices['iPhone 13'],
    },
  },
]
```

---

## 🎯 Principios de Diseño Aplicados

### SOLID Principles

- **S**ingle Responsibility: Cada Page Object maneja una sola página
- **O**pen/Closed: Extensible sin modificar código existente
- **L**iskov Substitution: Page Objects intercambiables
- **I**nterface Segregation: Métodos específicos por responsabilidad
- **D**ependency Inversion: Tests dependen de abstracciones (Page Objects)

### DRY (Don't Repeat Yourself)

- Métodos reutilizables en Page Objects
- Datos centralizados en JSON
- Configuración compartida

### KISS (Keep It Simple, Stupid)

- Estructura clara y simple
- Fácil de entender y mantener
- Sin sobre-ingeniería

---

## 📚 Referencias

- [Playwright Documentation](https://playwright.dev/)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Test Organization Best Practices](https://playwright.dev/docs/best-practices)

---

<div align="center">

[Volver al README Principal](./README.md)

</div>
