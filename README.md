# Web & API Automation Testing with Playwright & TypeScript

This repository contains automated tests for web and API applications using Playwright with TypeScript. The project follows the Page Object Model (POM) for better readability and maintainability.

## Prerequisites

Before setting up the project, ensure you have the following installed:

1. **Node.js** (v16.0.0 or higher) - [Download Node.js](https://nodejs.org/)
2. **Visual Studio Code** (VSCode) - [Download VSCode](https://code.visualstudio.com/)
3. **Allure Report Plugin** for VSCode (optional for viewing reports locally) - [Download Allure Plugin](https://marketplace.visualstudio.com/items?itemName=KochetovNikolay.allure)

## Getting Started

### 1. Clone the repository

git clone https://github.com/vsalagrama/playgrid.git

### 2. Install Playwright in VSCode

npm init playwright@latest

### 3. Running Tests

npx playwright test

### 4. Run specific test files

npx playwright test path/to/your/testfile.spec.ts

### 5. Generate and view Allure Report

npx playwright test --reporter=line,allure
npx allure generate allure-results --clean
npx allure open
npx allure serve allure-results