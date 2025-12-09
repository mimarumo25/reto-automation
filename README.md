# SauceDemo Automation

This project automates the checkout flow of [SauceDemo](https://www.saucedemo.com/) using Playwright and the Page Object Model (POM).

## Prerequisites

- Node.js (v14 or higher)
- npm

## Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Install Playwright browsers:
    ```bash
    npx playwright install
    ```
4.  Create a `.env` file in the root directory with the following content:
    ```env
    BASE_URL=https://www.saucedemo.com/
    SAUCE_USERNAME=standard_user
    SAUCE_PASSWORD=secret_sauce
    ```

## Running Tests

Run all tests:
```bash
npx playwright test
```

Run specific test:
```bash
npx playwright test tests/saucedemo.spec.js
```

Show report:
```bash
npx playwright show-report
```

## CI/CD Proposal (GitHub Actions)

To integrate this framework into a CI/CD pipeline using GitHub Actions, we can create a workflow file `.github/workflows/playwright.yml`.

### Pipeline Steps

1.  **Trigger**: Push to `main` or Pull Request.
2.  **Environment**: Ubuntu latest.
3.  **Steps**:
    *   Checkout code.
    *   Setup Node.js.
    *   Install dependencies (`npm ci`).
    *   Install Playwright browsers (`npx playwright install --with-deps`).
    *   Run tests (`npx playwright test`).
    *   Upload Report: Upload `playwright-report` as an artifact.

### Example Workflow

```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test
      env:
        BASE_URL: ${{ secrets.BASE_URL }}
        SAUCE_USERNAME: ${{ secrets.SAUCE_USERNAME }}
        SAUCE_PASSWORD: ${{ secrets.SAUCE_PASSWORD }}
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

### Reporting

The pipeline uses `actions/upload-artifact` to save the HTML report. You can download it from the GitHub Actions run summary. Alternatively, you can deploy the report to GitHub Pages.

## 📊 Reporte de Ejecución

El reporte detallado de la última ejecución se encuentra disponible en GitHub Pages:

👉 **[Ver Reporte HTML](https://mimarumo25.github.io/reto-automation/)**

![Captura del Reporte](https://via.placeholder.com/800x400?text=Captura+del+Reporte+Playwright)

> *Nota: El reporte se actualiza automáticamente con cada ejecución en la rama principal.*

## 📄 Documentación

Puedes consultar el plan estratégico detallado aquí:
- 📑 **[Plan Estratégico de QA](./Plan%20Estratégico%20de%20QA.pdf)**
