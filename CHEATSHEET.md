# 🎯 Cheat Sheet - Comandos Útiles

Referencia rápida de los comandos más utilizados en el framework.

---

## 📦 Instalación y Setup

```bash
# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install

# Instalar con dependencias del sistema (Linux)
npx playwright install --with-deps

# Forzar reinstalación
npx playwright install --force
```

---

## 🧪 Ejecución de Tests

### Comandos Básicos

```bash
# Ejecutar todos los tests
npm test
# o
npx playwright test

# Ejecutar en modo UI interactivo
npm run test:ui
# o
npx playwright test --ui

# Ejecutar con navegador visible
npm run test:headed
# o
npx playwright test --headed

# Ejecutar en modo debug
npm run test:debug
# o
npx playwright test --debug
```

### Tests Específicos

```bash
# Ejecutar un archivo específico
npx playwright test tests/saucedemo.spec.js

# Ejecutar con npm scripts
npm run test:saucedemo
npm run test:e2e
npm run test:jsonplaceholder

# Ejecutar test por nombre
npx playwright test -g "User can login"

# Ejecutar solo tests que coincidan con patrón
npx playwright test --grep "login"

# Excluir tests con patrón
npx playwright test --grep-invert "slow"
```

### Tests por Browser

```bash
# Solo Chromium
npm run test:chromium
# o
npx playwright test --project="UI - Chromium"

# Solo Firefox
npm run test:firefox
# o
npx playwright test --project="UI - Firefox"

# Solo API Tests
npm run test:api
# o
npx playwright test --project="API Tests"

# Múltiples proyectos
npx playwright test --project="UI - Chromium" --project="API Tests"
```

### Opciones de Ejecución

```bash
# Ejecución paralela con workers específicos
npx playwright test --workers=4

# Ejecutar en un solo worker (serial)
npx playwright test --workers=1

# Con retry automático
npx playwright test --retries=2

# Con timeout personalizado (milisegundos)
npx playwright test --timeout=60000

# Solo tests fallidos de la última ejecución
npx playwright test --last-failed

# Actualizar snapshots
npx playwright test --update-snapshots
```

---

## 📊 Reportes y Debugging

### Reportes

```bash
# Abrir reporte HTML
npm run report
# o
npx playwright show-report

# Ver reporte en puerto específico
npx playwright show-report --port=9000

# Generar reporte JSON
npx playwright test --reporter=json

# Múltiples reportes
npx playwright test --reporter=html,json,junit
```

### Traces y Debug

```bash
# Ver trace de un test específico
npm run trace test-results/[test-name]/trace.zip
# o
npx playwright show-trace test-results/[test-name]/trace.zip

# Ejecutar con Playwright Inspector
npx playwright test --debug

# Ejecutar en slow motion (para visualizar)
npx playwright test --headed --slow-mo=1000

# Con logs detallados
DEBUG=pw:api npx playwright test

# Logs del browser
DEBUG=pw:browser npx playwright test

# Todos los logs
DEBUG=pw:* npx playwright test
```

---

## 🔍 Información y Utilidades

```bash
# Ver versión de Playwright
npx playwright --version

# Listar todos los tests sin ejecutar
npx playwright test --list

# Ver configuración actual
npx playwright show-config

# Generar código de test (Codegen)
npx playwright codegen https://www.saucedemo.com

# Codegen con device específico
npx playwright codegen --device="iPhone 13" https://example.com

# Codegen guardando en archivo
npx playwright codegen --output=tests/new-test.spec.js https://example.com
```

---

## 🌐 Tests por Tags/Anotaciones

```javascript
// Agregar tags en tests
test('login test', {
  tag: '@smoke',
}, async ({ page }) => {
  // ...
});

test('full e2e', {
  tag: ['@e2e', '@regression'],
}, async ({ page }) => {
  // ...
});
```

```bash
# Ejecutar tests con tag específico
npx playwright test --grep @smoke

# Ejecutar múltiples tags
npx playwright test --grep "@smoke|@e2e"

# Excluir tags
npx playwright test --grep-invert @slow
```

---

## 📸 Screenshots y Videos

### Durante el Test

```javascript
// Screenshot de página completa
await page.screenshot({ path: 'screenshot.png' });

// Screenshot de elemento específico
await element.screenshot({ path: 'element.png' });

// Screenshot en buffer
const buffer = await page.screenshot();
```

### Configuración Global

```javascript
// En playwright.config.js
use: {
  screenshot: 'on',              // Siempre
  screenshot: 'off',             // Nunca
  screenshot: 'only-on-failure', // Solo en fallos (recomendado)
  
  video: 'on',                   // Siempre
  video: 'off',                  // Nunca
  video: 'retain-on-failure',    // Solo en fallos
  video: 'on-first-retry',       // En primer retry
}
```

---

## 🔧 Comandos de Mantenimiento

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install

# Limpiar reportes y resultados
rm -rf playwright-report test-results

# Actualizar Playwright a última versión
npm install -D @playwright/test@latest

# Actualizar navegadores después de update
npx playwright install

# Verificar dependencias obsoletas
npm outdated

# Actualizar todas las dependencias
npm update
```

---

## 🎨 Codegen - Generación de Tests

```bash
# Abrir Codegen en URL
npx playwright codegen https://www.saucedemo.com

# Con autenticación
npx playwright codegen --load-storage=auth.json https://app.com

# Guardar storage de autenticación
npx playwright codegen --save-storage=auth.json https://app.com

# Con viewport específico
npx playwright codegen --viewport-size=1280,720 https://app.com

# Con user agent personalizado
npx playwright codegen --user-agent="Custom Agent" https://app.com

# Con idioma específico
npx playwright codegen --lang=es-ES https://app.com
```

---

## 🌍 Variables de Entorno

```bash
# Windows (PowerShell)
$env:BASE_URL="https://staging.example.com"
npx playwright test

# Windows (CMD)
set BASE_URL=https://staging.example.com && npx playwright test

# Linux/macOS
BASE_URL=https://staging.example.com npx playwright test

# Múltiples variables
BASE_URL=https://staging.com HEADLESS=false npx playwright test
```

---

## 📋 Scripts Personalizados (package.json)

```json
{
  "scripts": {
    "test": "npx playwright test",
    "test:ui": "npx playwright test --ui",
    "test:headed": "npx playwright test --headed",
    "test:debug": "npx playwright test --debug",
    "test:chromium": "npx playwright test --project='UI - Chromium'",
    "test:firefox": "npx playwright test --project='UI - Firefox'",
    "test:api": "npx playwright test --project='API Tests'",
    "test:smoke": "npx playwright test --grep @smoke",
    "test:e2e": "npx playwright test tests/e2e-payment.spec.js",
    "report": "npx playwright show-report",
    "trace": "npx playwright show-trace"
  }
}
```

Uso:

```bash
npm run test:ui
npm run test:smoke
npm run report
```

---

## 🔄 CI/CD Específicos

```bash
# Ejecutar como en CI (con retries y sin parallelism)
CI=true npx playwright test

# Con reporte XML para CI
npx playwright test --reporter=junit

# Con múltiples reportes
npx playwright test --reporter=html,json,junit
```

---

## 🐛 Troubleshooting

```bash
# Verificar instalación
npx playwright --version

# Listar navegadores instalados
npx playwright list-files

# Verificar que tests se puedan descubrir
npx playwright test --list

# Ejecutar un solo test para verificar
npx playwright test tests/saucedemo.spec.js --headed

# Limpiar caché
rm -rf ~/.cache/ms-playwright

# Reinstalar completamente
npm uninstall @playwright/test
npm install -D @playwright/test
npx playwright install --with-deps
```

---

## 💡 Tips Útiles

### Ejecutar desde un directorio específico

```bash
cd tests/
npx playwright test saucedemo.spec.js
```

### Ver output en tiempo real

```bash
npx playwright test --reporter=line
```

### Ejecutar con configuración custom

```bash
npx playwright test --config=playwright.config.custom.js
```

### Ejecutar tests en modo sharded (CI)

```bash
# Shard 1 de 3
npx playwright test --shard=1/3

# Shard 2 de 3
npx playwright test --shard=2/3

# Shard 3 de 3
npx playwright test --shard=3/3
```

---

## 📚 Recursos Adicionales

```bash
# Abrir documentación oficial
npx playwright open https://playwright.dev/docs/intro

# Ver ejemplos
npx playwright open https://playwright.dev/docs/intro#examples
```

---

<div align="center">

**⭐ Guarda este cheat sheet para consulta rápida ⭐**

[Volver al README](./README.md) | [Ver Arquitectura](./ARCHITECTURE.md) | [Guía de Inicio](./QUICK_START.md)

</div>
