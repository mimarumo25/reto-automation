# 📁 Estructura Detallada del Proyecto

Esta guía explica la estructura completa del proyecto y el propósito de cada archivo y directorio.

---

## 🌳 Árbol Completo del Proyecto

```
reto-automation-f2x/
│
├── 📂 .github/                       # Configuración de GitHub
│   └── 📂 workflows/                 # GitHub Actions workflows
│       └── playwright.yml            # Pipeline CI/CD
│
├── 📂 data/                          # Datos de prueba (Data-Driven)
│   └── test-data.json               # Datos centralizados para tests
│
├── 📂 pages/                         # Page Object Model (POM)
│   ├── LoginPage.js                 # POM: Página de login
│   ├── InventoryPage.js             # POM: Página de inventario
│   ├── CartPage.js                  # POM: Página de carrito
│   └── CheckoutPage.js              # POM: Página de checkout
│
├── 📂 tests/                         # Test Specifications
│   ├── saucedemo.spec.js            # Tests UI: Flujo básico
│   ├── e2e-payment.spec.js          # Tests UI: Flujo E2E completo
│   └── jsonplaceholder.spec.js      # Tests API: REST endpoints
│
├── 📂 playwright-report/             # Reportes HTML (generados)
│   ├── index.html                   # Reporte principal
│   └── 📂 data/                      # Datos del reporte
│
├── 📂 test-results/                  # Resultados de ejecución (generados)
│   ├── 📂 [test-name]/               # Por cada test ejecutado
│   │   ├── trace.zip                # Traza de ejecución
│   │   ├── video.webm               # Video de la prueba
│   │   └── test-failed-1.png        # Screenshots de fallos
│   └── ...
│
├── 📂 node_modules/                  # Dependencias (no versionado)
│
├── 📄 .env                          # Variables de entorno (NO COMMITEAR)
├── 📄 .env.example                  # Plantilla de variables de entorno
├── 📄 .gitignore                    # Archivos ignorados por Git
├── 📄 package.json                  # Dependencias y scripts npm
├── 📄 package-lock.json             # Lock de versiones exactas
├── 📄 playwright.config.js          # Configuración de Playwright
│
├── 📄 README.md                     # Documentación principal ⭐
├── 📄 QUICK_START.md                # Guía de inicio rápido
├── 📄 ARCHITECTURE.md               # Arquitectura y patrones
├── 📄 CONTRIBUTING.md               # Guía de contribución
├── 📄 CHEATSHEET.md                 # Comandos útiles
└── 📄 PROJECT_STRUCTURE.md          # Este archivo
```

---

## 📋 Descripción Detallada

### 📂 `.github/workflows/`

**Propósito**: Configuración de CI/CD con GitHub Actions

| Archivo | Descripción |
|---------|-------------|
| `playwright.yml` | Pipeline automatizado que ejecuta tests en cada push/PR |

**Características**:
- Ejecuta tests en múltiples navegadores (Chromium, Firefox)
- Genera y sube reportes como artifacts
- Ejecuta tests de API
- Notificaciones de resultados

---

### 📂 `data/`

**Propósito**: Almacenar datos de prueba centralizados

| Archivo | Descripción |
|---------|-------------|
| `test-data.json` | Datos reutilizables (productos, usuarios, datos de checkout) |

**Ejemplo de estructura**:
```json
{
  "productsToAdd": ["Product 1", "Product 2"],
  "expectedCartCount": 2,
  "customer": {
    "firstName": "Test",
    "lastName": "User",
    "zip": "12345"
  }
}
```

**Ventajas**:
- ✅ Separación de datos y lógica
- ✅ Fácil modificación sin tocar código
- ✅ Reutilización en múltiples tests

---

### 📂 `pages/` - Page Object Model

**Propósito**: Encapsular interacciones con páginas web

| Archivo | Responsabilidad | Elementos Clave |
|---------|----------------|-----------------|
| `LoginPage.js` | Login y autenticación | username, password, login button |
| `InventoryPage.js` | Listado y selección de productos | product items, add to cart, cart link |
| `CartPage.js` | Gestión del carrito | cart items, checkout button, item count |
| `CheckoutPage.js` | Proceso de checkout | customer form, finish button, confirmation |

**Estructura típica de un Page Object**:
```javascript
export class PageName {
  constructor(page) {
    this.page = page;
    // Localizadores
    this.element = page.locator('[data-test="element"]');
  }

  // Métodos de navegación
  async goto() { }

  // Métodos de acción
  async performAction() { }

  // Métodos de obtención
  async getData() { }
}
```

---

### 📂 `tests/` - Test Specifications

**Propósito**: Definir casos de prueba

| Archivo | Tipo | Descripción |
|---------|------|-------------|
| `saucedemo.spec.js` | UI | Login y agregar items al carrito |
| `e2e-payment.spec.js` | UI E2E | Flujo completo: Login → Agregar items → Checkout → Validación |
| `jsonplaceholder.spec.js` | API | CRUD de posts, validación de schemas |

**Características**:
- Utiliza Page Objects para UI tests
- Data-driven testing con `test-data.json`
- Assertions claras y descriptivas
- Configurado para multi-browser

---

### 📂 `playwright-report/` (Generado)

**Propósito**: Reportes HTML interactivos

**Contenido**:
- `index.html`: Dashboard principal con resultados
- Estadísticas de tests pasados/fallidos
- Screenshots y videos integrados
- Traces para debugging

**Acceso**:
```bash
npx playwright show-report
```

---

### 📂 `test-results/` (Generado)

**Propósito**: Evidencias de ejecución

**Estructura por test**:
```
test-results/
└── saucedemo-User-can-login-Chromium/
    ├── trace.zip           # Traza completa de ejecución
    ├── video.webm          # Video de la prueba
    └── test-failed-1.png   # Screenshot del fallo
```

**Contenido**:
- **Traces**: Línea de tiempo con DOM snapshots, network, console
- **Videos**: Grabación completa de la ejecución
- **Screenshots**: Capturas en puntos específicos o fallos

---

### 🔧 Archivos de Configuración

#### `playwright.config.js`

**Propósito**: Configuración central de Playwright

**Secciones principales**:
```javascript
{
  testDir: './tests',           // Directorio de tests
  timeout: 30000,               // Timeout global
  retries: 0,                   // Reintentos (2 en CI)
  workers: undefined,           // Paralelismo (1 en CI)
  
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on',
    video: 'on',
    screenshot: 'on',
  },
  
  projects: [                   // Configuración multi-browser
    { name: 'UI - Chromium', ... },
    { name: 'UI - Firefox', ... },
    { name: 'API Tests', ... },
  ],
}
```

#### `package.json`

**Propósito**: Gestión de dependencias y scripts

**Scripts disponibles**:
```json
{
  "scripts": {
    "test": "npx playwright test",
    "test:ui": "npx playwright test --ui",
    "test:headed": "npx playwright test --headed",
    "test:chromium": "npx playwright test --project='UI - Chromium'",
    "test:api": "npx playwright test --project='API Tests'",
    "report": "npx playwright show-report"
  }
}
```

#### `.env` y `.env.example`

**Propósito**: Variables de entorno

| Archivo | Descripción | Versionado |
|---------|-------------|-----------|
| `.env` | Valores reales (credenciales) | ❌ NO (en .gitignore) |
| `.env.example` | Plantilla sin valores sensibles | ✅ SÍ |

**Variables típicas**:
```env
BASE_URL=https://www.saucedemo.com/
SAUCE_USERNAME=standard_user
SAUCE_PASSWORD=secret_sauce
API_BASE_URL=https://jsonplaceholder.typicode.com
```

#### `.gitignore`

**Propósito**: Excluir archivos del control de versiones

**Principales exclusiones**:
- `node_modules/` - Dependencias
- `.env` - Credenciales
- `test-results/` - Resultados temporales
- `playwright-report/` - Reportes generados

---

### 📚 Archivos de Documentación

| Archivo | Propósito | Audiencia |
|---------|-----------|-----------|
| `README.md` | Documentación completa del proyecto | Todos |
| `QUICK_START.md` | Guía de inicio en 5 minutos | Nuevos usuarios |
| `ARCHITECTURE.md` | Patrones de diseño y arquitectura | Desarrolladores |
| `CONTRIBUTING.md` | Guía para contribuidores | Colaboradores |
| `CHEATSHEET.md` | Referencia rápida de comandos | Usuarios frecuentes |
| `PROJECT_STRUCTURE.md` | Explicación de estructura (este archivo) | Mantenedores |

---

## 🔄 Flujo de Archivos

### Durante el Desarrollo

```
1. Modificar/Crear archivos:
   ├── pages/*.js           (Page Objects)
   ├── tests/*.spec.js      (Tests)
   └── data/test-data.json  (Datos)

2. Ejecutar tests:
   $ npx playwright test

3. Revisar resultados:
   ├── playwright-report/   (Reporte HTML)
   └── test-results/        (Screenshots, videos)
```

### En CI/CD

```
1. Push/PR a GitHub
   ↓
2. GitHub Actions ejecuta:
   └── .github/workflows/playwright.yml
   ↓
3. Pipeline ejecuta tests:
   ├── Instala dependencias
   ├── Instala navegadores
   ├── Ejecuta tests en paralelo
   └── Genera reportes
   ↓
4. Sube artifacts:
   ├── HTML Reports
   ├── Test traces
   └── Screenshots/Videos
```

---

## 🎯 Dónde Agregar Nuevos Elementos

### Nuevo Test UI

1. ✅ Crear Page Object: `pages/NuevaPagina.js`
2. ✅ Crear Test Spec: `tests/nueva-prueba.spec.js`
3. ✅ (Opcional) Agregar datos: `data/test-data.json`

### Nuevo Test API

1. ✅ Crear Test Spec: `tests/nueva-api.spec.js`
2. ✅ (Opcional) Agregar datos: `data/api-data.json`

### Nueva Configuración

1. ✅ Modificar: `playwright.config.js`
2. ✅ Agregar variable: `.env` y `.env.example`

### Nueva Documentación

1. ✅ Crear archivo: `NUEVA_GUIA.md`
2. ✅ Actualizar: `README.md` (agregar link)

---

## 📊 Tamaños Aproximados

| Directorio/Archivo | Tamaño Aproximado | Notas |
|-------------------|-------------------|-------|
| `node_modules/` | ~100-200 MB | Dependencias npm |
| `playwright-report/` | ~1-5 MB | Por ejecución |
| `test-results/` | ~10-50 MB | Videos/screenshots |
| Page Objects | ~1-2 KB cada uno | Código fuente |
| Test Specs | ~2-5 KB cada uno | Código fuente |

---

## 🔍 Archivos que NUNCA se deben commitear

❌ `.env` - Contiene credenciales  
❌ `node_modules/` - Dependencias (se instalan con `npm install`)  
❌ `test-results/` - Resultados temporales  
❌ `playwright-report/` - Reportes generados  
❌ `.DS_Store` - Archivo de sistema macOS  
❌ `Thumbs.db` - Archivo de sistema Windows  

**Todos están en `.gitignore`** ✅

---

## 📦 Archivos Mínimos para Clonar y Ejecutar

Para que otro desarrollador pueda ejecutar el proyecto, necesita:

1. ✅ `package.json` - Para instalar dependencias
2. ✅ `playwright.config.js` - Configuración
3. ✅ `.env.example` - Plantilla de variables (debe copiar a `.env`)
4. ✅ `pages/*.js` - Page Objects
5. ✅ `tests/*.spec.js` - Tests
6. ✅ `data/*.json` - Datos de prueba

Luego ejecuta:
```bash
npm install
npx playwright install
cp .env.example .env
npx playwright test
```

---

<div align="center">

[Volver al README](./README.md) | [Ver Arquitectura](./ARCHITECTURE.md)

</div>
