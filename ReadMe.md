# 🚀 Cypress + TypeScript E2E Testing Project

This project demonstrates **End-to-End testing** using **Cypress** with **TypeScript**, integrated with **Mochawesome Reporter** for advanced HTML reports.  

---

## 📦 Project Setup

### 1️⃣ Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

Verify installation:

node -v
npm -v

2️⃣ Initialize Project
Create a new folder and initialize npm:


mkdir CypreesDemo
cd CypreesDemo
npm init -y

3️⃣ Install Dependencies
Install Cypress, TypeScript, and other required tools:

# Cypress core
npm install --save-dev cypress

# TypeScript + loader
npm install --save-dev typescript ts-node ts-loader tsconfig-paths

# Type definitions
npm install --save-dev @types/node @types/mocha @types/chai

# Preprocessors
npm install --save-dev @cypress/webpack-preprocessor @bahmutov/cypress-esbuild-preprocessor webpack

# Reporter (Mochawesome)
npm install --save-dev cypress-mochawesome-reporter mochawesome mochawesome-merge mochawesome-report-generator

# Linting & formatting
npm install --save-dev eslint prettier

# Git hooks (optional)
npm install --save-dev husky

4️⃣ Project Structure
Your project should look like this:


CypreesDemo/
│── cypress/
│   ├── e2e/                # Test specs
│   ├── fixtures/           # Test data
│   ├── pages/              # Page Objects (POM)
│   ├── support/            # Custom commands & setup
│   └── reports/            # Test reports (JSON + HTML)
│
│── cypress.config.ts       # Cypress config file
│── tsconfig.json           # TypeScript config
│── package.json            # Scripts & dependencies
⚙️ Configuration

1️⃣ tsconfig.json

{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "types": ["cypress"]
  },
  "include": ["**/*.ts"]
}

2️⃣ cypress.config.ts

import { defineConfig } from "cypress";
import webpackPreprocessor from "@cypress/webpack-preprocessor";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Enable TypeScript support
      on(
        "file:preprocessor",
        webpackPreprocessor({
          webpackOptions: {
            resolve: { extensions: [".ts", ".js"] },
            module: {
              rules: [
                { test: /\.ts$/, exclude: /node_modules/, use: [{ loader: "ts-loader" }] }
              ]
            }
          }
        })
      );

      // Register Mochawesome reporter plugin
      require("cypress-mochawesome-reporter/plugin")(on);

      return config;
    },

    specPattern: "cypress/e2e/**/*.cy.ts",
    baseUrl: "https://www.saucedemo.com",
    supportFile: "cypress/support/e2e.ts"
  },

  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Cypress Test Report",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false
  }
});

3️⃣ cypress/support/e2e.ts

import './commands';
import 'cypress-mochawesome-reporter/register';

// Optional: capture screenshots on failure
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const screenshotFileName = `${runnable?.parent?.title ?? "spec"} -- ${test.title} (failed).png`;
    Cypress.log({
      name: 'screenshot',
      message: `Saved screenshot: ${screenshotFileName}`
    });
  }
});

📜 Scripts
Add these to your package.json:


"scripts": {
  "cy:open": "cypress open --e2e",
  "cy:run": "cypress run --e2e",

  "cy:report": "cypress run --e2e --reporter cypress-mochawesome-reporter --reporter-options reportDir=cypress/reports,overwrite=false,html=true,json=true",

  "report:serve": "npx serve cypress/reports",

  "tsc": "tsc --noEmit",
  "lint": "eslint . --ext .ts,.js",
  "format": "prettier --write .",
  "prepare": "husky install"
}


▶️ Running Tests

1️⃣ Open Cypress GUI

npm run cy:open

2️⃣ Run Tests Headlessly

npm run cy:run

3️⃣ Run Tests with Reporter

npm run cy:report

4️⃣ Serve Reports

npm run report:serve

📊 Reports
JSON & HTML reports are generated in:

cypress/reports/
Open report manually:


cypress/reports/index.html
Or serve with:


npm run report:serve

✅ Best Practices
Use Page Object Model (POM) for test maintainability.

Keep test data in cypress/fixtures/.

Use TypeScript for type safety.

Run tests in CI/CD with npm run cy:report to generate reports automatically.
