# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a este proyecto! Esta guía te ayudará a entender cómo puedes colaborar.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Estándares de Código](#estándares-de-código)
- [Commits Guidelines](#commits-guidelines)
- [Pull Request Process](#pull-request-process)

---

## 📜 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que respetes este código.

## 🎯 ¿Cómo puedo contribuir?

### Reportar Bugs

Si encuentras un bug, por favor crea un **Issue** con:

- Título descriptivo
- Pasos para reproducir el error
- Comportamiento esperado vs actual
- Screenshots (si aplica)
- Información del entorno (OS, Node.js version, etc.)

### Sugerir Mejoras

Las sugerencias son bienvenidas. Crea un **Issue** con:

- Descripción clara de la mejora
- Justificación (¿por qué es necesaria?)
- Ejemplos de uso (si aplica)

### Contribuir con Código

1. **Fork** el repositorio
2. Crea una **rama** desde `main`
3. Realiza tus cambios
4. Agrega **tests** si es necesario
5. Asegúrate de que todos los tests pasen
6. Crea un **Pull Request**

---

## 🔄 Proceso de Desarrollo

### 1. Setup Local

```bash
# Fork y clonar
git clone https://github.com/TU-USUARIO/reto-automation-f2x.git
cd reto-automation-f2x

# Instalar dependencias
npm install

# Configurar .env
cp .env.example .env
```

### 2. Crear Rama de Trabajo

```bash
# Nomenclatura: tipo/descripcion-corta
git checkout -b feature/nueva-funcionalidad
git checkout -b fix/correccion-bug
git checkout -b docs/actualizar-readme
```

### 3. Desarrollo

- Escribe código limpio y documentado
- Sigue los patrones existentes (POM)
- Agrega tests para nueva funcionalidad
- Actualiza documentación si es necesario

### 4. Testing

```bash
# Ejecutar todos los tests
npm test

# Ejecutar tests específicos
npx playwright test tests/tu-test.spec.js

# Verificar que no hay errores
npx playwright test --reporter=list
```

### 5. Commit

```bash
git add .
git commit -m "feat: Descripción clara del cambio"
```

---

## 💻 Estándares de Código

### JavaScript/Playwright

```javascript
// ✅ BUENO: Código limpio y legible
export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

// ❌ EVITAR: Código confuso
class LP {
  constructor(p) {
    this.p = p;
    this.u = p.locator('#user');
  }
  async l(u, p) {
    await this.u.fill(u);
    // ...
  }
}
```

### Convenciones de Nombrado

- **Variables/Funciones**: `camelCase`
- **Clases**: `PascalCase`
- **Constantes**: `UPPER_SNAKE_CASE`
- **Archivos**: `kebab-case.spec.js`

### Estructura de Tests

```javascript
import { test, expect } from '@playwright/test';
import { PageObject } from '../pages/PageObject';

test.describe('Suite Name', () => {
  test('should do something specific', async ({ page }) => {
    // Arrange
    const pageObject = new PageObject(page);
    
    // Act
    await pageObject.performAction();
    
    // Assert
    await expect(page).toHaveTitle('Expected Title');
  });
});
```

---

## 📝 Commits Guidelines

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

### Tipos de Commit

```
feat:     Nueva funcionalidad
fix:      Corrección de bug
docs:     Cambios en documentación
style:    Formato, espacios (no afecta código)
refactor: Refactorización (no cambia funcionalidad)
test:     Agregar o modificar tests
chore:    Mantenimiento, dependencias
perf:     Mejoras de rendimiento
ci:       Cambios en CI/CD
```

### Ejemplos

```bash
# Bueno ✅
git commit -m "feat: Add login validation test"
git commit -m "fix: Resolve timeout issue in checkout flow"
git commit -m "docs: Update installation instructions"

# Malo ❌
git commit -m "changes"
git commit -m "fix stuff"
git commit -m "update"
```

### Formato Completo

```
tipo(scope): descripción corta

[Cuerpo opcional del commit con más detalles]

[Footer opcional: referencias a issues, breaking changes]
```

Ejemplo:

```
feat(checkout): Add price validation in payment flow

- Validate individual item prices
- Calculate and verify subtotal
- Check tax calculation accuracy

Closes #123
```

---

## 🔀 Pull Request Process

### 1. Antes de Crear el PR

- [ ] Todos los tests pasan localmente
- [ ] El código sigue los estándares del proyecto
- [ ] Se agregó documentación (si es necesario)
- [ ] Se actualizó el README (si aplica)
- [ ] No hay conflictos con `main`

### 2. Crear el Pull Request

#### Título

Usa el formato de Conventional Commits:

```
feat: Add checkout validation tests
fix: Resolve cart calculation bug
docs: Improve setup instructions
```

#### Descripción

```markdown
## 📝 Descripción
Breve descripción de los cambios

## 🎯 Tipo de Cambio
- [ ] Bug fix
- [ ] Nueva funcionalidad
- [ ] Breaking change
- [ ] Documentación

## 🧪 Tests
- [ ] Tests existentes pasan
- [ ] Se agregaron nuevos tests
- [ ] Se actualizó documentación de tests

## 📸 Screenshots (si aplica)
[Agregar screenshots relevantes]

## 📋 Checklist
- [ ] Código sigue los estándares del proyecto
- [ ] Documentación actualizada
- [ ] Tests agregados/actualizados
- [ ] Sin conflictos con main
```

### 3. Revisión

- Un maintainer revisará tu PR
- Puede solicitar cambios
- Responde a los comentarios
- Realiza los cambios solicitados

### 4. Merge

Una vez aprobado, un maintainer hará merge del PR.

---

## 🎨 Estructura de Page Objects

Al agregar nuevos Page Objects, sigue esta estructura:

```javascript
/**
 * Page Object for [Página]
 * Handles [descripción de responsabilidades]
 */
export class PageName {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // Localizadores - agrupados por sección
    // Header elements
    this.headerLogo = page.locator('[data-test="logo"]');
    
    // Form elements
    this.inputField = page.locator('[data-test="input"]');
    this.submitButton = page.locator('[data-test="submit"]');
    
    // Content elements
    this.resultMessage = page.locator('[data-test="result"]');
  }

  /**
   * Navigate to page
   */
  async goto() {
    await this.page.goto('/page-url');
  }

  /**
   * Perform main action
   * @param {string} data - Description of parameter
   */
  async performAction(data) {
    await this.inputField.fill(data);
    await this.submitButton.click();
  }

  /**
   * Get result data
   * @returns {Promise<string>}
   */
  async getResult() {
    return await this.resultMessage.textContent();
  }
}
```

---

## 📚 Recursos Adicionales

- [Playwright Documentation](https://playwright.dev/)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## ❓ Preguntas

Si tienes preguntas, puedes:

- Abrir un **Issue** con la etiqueta `question`
- Iniciar una **Discussion** en GitHub
- Revisar issues existentes

---

¡Gracias por contribuir! 🎉
