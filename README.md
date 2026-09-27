# SauceDemo Automated Testing Suite - Colin Marks

End-to-End (E2E) automated testing suite for the [SauceDemo](https://www.saucedemo.com) e-commerce web application, built with **Cypress** and **Cucumber BDD (Behavior-Driven Development)** using the **Page Object Model (POM)** pattern.

---

## Table of Contents

- [Overview & Architecture](#overview--architecture)
- [Prerequisites & Installation](#prerequisites--installation)
- [How to Run the Tests](#how-to-run-the-tests)
  - [Interactive Mode (Cypress GUI)](#1-interactive-mode-cypress-gui)
  - [Headless Mode (CLI)](#2-headless-mode-cli)
  - [Run BDD Feature Tests Only](#3-run-bdd-feature-tests-only)
  - [Run Plain Cypress Spec Only](#4-run-plain-cypress-spec-only)
  - [Run in a Specific Browser / Headed Mode](#5-run-in-a-specific-browser--headed-mode)
  - [Run Individual Specs](#6-run-individual-specs)
  - [Running on Headless Linux / CI Environments](#7-running-on-headless-linux--ci-environments)
- [What the Tests Are (Test Suite Breakdown)](#what-the-tests-are-test-suite-breakdown)
  - [1. Login Functionality](#1-login-functionality)
  - [2. Inventory Functionality](#2-inventory-functionality)
  - [3. Cart Functionality](#3-cart-functionality)
  - [4. Checkout Functionality](#4-checkout-functionality)
  - [5. Logout & Session Management Functionality](#5-logout--session-management-functionality)
  - [6. Product Details Functionality](#6-product-details-functionality)
  - [7. End-to-End Shopping Journey](#7-end-to-end-shopping-journey)
- [Test Execution Reports](#test-execution-reports)
  - [Interactive HTML Report](#1-interactive-html-report)
  - [Cucumber BDD HTML Report](#2-cucumber-bdd-html-report)
  - [Machine-Readable JSON Results](#3-machine-readable-json-results)
  - [Terminal Console Summary](#4-terminal-console-summary)
- [Project Directory Structure](#project-directory-structure)
- [General Comments & Recommendations](#general-comments--recommendations)

---

## Overview & Architecture

This testing framework validates user journeys, edge cases, input validation, session management, catalog interactions, and security flows on SauceDemo.

- **Dual Test Architecture**:
  - **Cucumber BDD (`.feature` files)**: Business-readable Gherkin syntax separating test scenarios from technical implementation (40 tests across 7 feature files).
  - **Standard Cypress (`.cy.js` files)**: Demonstrates native Cypress syntax (`describe`/`it`) for teams that prefer pure JavaScript specs alongside BDD (15 tests).
- **Page Object Model (POM)**:
  - Selectors and page interactions are cleanly abstracted into reusable classes under `cypress/page_objects/` (`loginPage.js`, `inventoryPage.js`, `cartPage.js`, `checkoutPage.js`, `sidebarMenu.js`, `productDetailsPage.js`), enhancing test maintainability and isolating UI changes.
- **Esbuild Preprocessing**:
  - Leverages `@badeball/cypress-cucumber-preprocessor` with `@bahmutov/cypress-esbuild-preprocessor` for fast, modern spec bundling.
- **Automated Reporting**:
  - Automatically generates rich, standalone HTML and JSON reports at the conclusion of every test run without requiring external services.

---

## Prerequisites & Installation

### Prerequisites

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **npm**: `v10.x` or later
- **Operating System**: macOS, Linux, or Windows

### Installation

Clone the repository and install the dependencies:

```bash
git clone <repository-url>
cd techAssignment
npm install
```

---

## How to Run the Tests

The project includes pre-configured npm scripts in `package.json`:

| Command | Description |
| :--- | :--- |
| `npm test` | Runs the entire test suite (all 8 specs, 55 tests) headlessly with electron |
| `npm run cypress:run` | Equivalent to `npm test` |
| `npm run cypress:open` | Launches the interactive Cypress Test Runner GUI |
| `npm run test:cucumber` | Runs only the BDD Cucumber `.feature` specs (40 tests across 7 features) |
| `npm run test:cypress` | Runs only the standard Cypress `.cy.js` spec (15 tests) |
| `npm run test:headed` | Runs all tests in headed mode to visually see the browser |

### 1. Interactive Mode (Cypress GUI)

To open the Cypress Test Runner where you can view specs, inspect DOM elements, and use time-travel debugging:

```bash
npm run cypress:open
```

1. Select **E2E Testing**.
2. Select your browser of choice (e.g. Electron, Chrome, Firefox).
3. Click on any spec in the list to execute it interactively.

### 2. Headless Mode (CLI)

To execute all tests headlessly in terminal:

```bash
npm test
```

### 3. Run BDD Feature Tests Only

To run only the Gherkin feature files:

```bash
npm run test:cucumber
```

### 4. Run Plain Cypress Spec Only

To run only the plain Cypress specification:

```bash
npm run test:cypress
```

### 5. Run in a Specific Browser / Headed Mode

```bash
# Run in Chrome
npx cypress run --browser chrome

# Run in Firefox
npx cypress run --browser firefox

# Run in headed mode (browser window visible)
npm run test:headed
```

### 6. Run Individual Specs

You can pass the `--spec` parameter to target any specific feature or spec:

```bash
# Run Logout & Session Management feature
npx cypress run --spec "cypress/e2e/features/logout.feature"

# Run Product Details feature
npx cypress run --spec "cypress/e2e/features/product-details.feature"

# Run Login feature
npx cypress run --spec "cypress/e2e/features/login.feature"

# Run Inventory feature
npx cypress run --spec "cypress/e2e/features/inventory.feature"

# Run Checkout feature
npx cypress run --spec "cypress/e2e/features/checkout.feature"

# Run Cart feature
npx cypress run --spec "cypress/e2e/features/cart.feature"

# Run End-to-End feature
npx cypress run --spec "cypress/e2e/features/end-to-end.feature"
```

### 7. Running on Headless Linux / CI Environments

On Linux servers without a running X server display (e.g., GitHub Actions, Docker, Jenkins), run with `xvfb-run`:

```bash
xvfb-run -a npm test
```

---

## What the Tests Are (Test Suite Breakdown)

The test suite covers **55 automated tests** across 8 spec files, exercising authentication, session termination, route guarding, catalog browsing, product details, cart operations, checkout validation, and complete end-to-end workflows.

### 1. Login Functionality
- **Files**:
  - `cypress/e2e/features/login.feature` (BDD Cucumber)
  - `cypress/e2e/features/loginCypress.cy.js` (Native Cypress)
- **Scenarios Covered (15 tests)**:
  - **Happy Path**: Successful authentication using valid credentials (`standard_user` / `secret_sauce`), verifying redirection to `/inventory.html`.
  - **Negative & Edge Cases (Data-driven Scenario Outline)**:
    1. *Locked user*: Validates that `locked_out_user` receives `Epic sadface: Sorry, this user has been locked out`.
    2. *Unknown user*: Verifies appropriate error when credentials do not exist.
    3. *Bad password*: Verifies error on invalid password for existing user.
    4. *Username Missing*: Validates required field validation when username is empty (`Epic sadface: Username is required`).
    5. *Password Missing*: Validates required field validation when password is empty (`Epic sadface: Password is required`).
    6. *Whitespace before*: Checks input sanitation when whitespace precedes the password.
    7. *Whitespace after*: Checks input sanitation when whitespace trails the password.
    8. *Whitespace in middle*: Checks input handling with internal spaces.
    9. *Username capitalization*: Verifies case sensitivity on usernames (`Standard_user`).
    10. *Password capitalization*: Verifies case sensitivity on passwords (`Secret_sauce`).
    11. *Username special characters*: Tests behavior when input contains special characters (`standard_user&`).
    12. *Password special characters*: Tests behavior when password contains special characters (`Secret_sauce&`).
    13. *Username SQL injection*: Tests security posture against SQL injection payload (`' OR '1'='1`).
    14. *Password SQL injection*: Tests password field security with injection payload.

### 2. Inventory Functionality
- **File**: `cypress/e2e/features/inventory.feature`
- **Scenarios Covered (10 tests)**:
  - **Product Loading**: Verifies that all 6 catalog products render properly with names, descriptions, images, and prices.
  - **Sorting Options**: Tests all 4 sorting permutations via the dropdown:
    - *Name (A to Z)*
    - *Name (Z to A)*
    - *Price (low to high)*
    - *Price (high to low)*
  - **Dynamic Multi-Item Cart Counter**: Data-driven scenarios adding and removing variable quantities of items (1, 2, and 3 products) directly from the catalog view, verifying that the cart badge counter updates accurately and clears to 0 upon removal.
  - **Single Addition Integrity ("Confirm can only add item once")**: Adding a specific product ("Sauce Labs Backpack") asserts that the button toggles to "Remove", the "Add to cart" button is no longer present for that item, and the cart badge equals 1.
  - **Individual Increment/Decrement ("Add and remove products individually")**: Adds multiple named products in sequence ("Sauce Labs Backpack" -> cart count 1, "Sauce Labs Bike Light" -> cart count 2), then removes them individually, asserting that the cart badge accurately increments and decrements at each step down to 0.

### 3. Cart Functionality
- **File**: `cypress/e2e/features/cart.feature`
- **Scenarios Covered (2 tests)**:
  - **Remove from Cart**: User with 2 items navigates to `/cart.html`, removes the first item, and verifies that the remaining item count updates to 1.
  - **Continue Shopping Navigation**: User removes an item from cart, clicks "Continue Shopping", returns to the inventory page, and verifies that the cart badge retains the updated count (1).

### 4. Checkout Functionality
- **File**: `cypress/e2e/features/checkout.feature`
- **Scenarios Covered (6 tests)**:
  - **Successful Checkout**: End-to-end checkout filling in First Name, Last Name, and Postal Code, advancing to checkout overview, clicking "Finish", and asserting order completion header (`Thank you for your order!`).
  - **Session Token Manipulation**: Tests security and state recovery by modifying `session-username` in browser `localStorage` during checkout.
  - **Session Expiry / State Clearing**: Clears browser cookies and local storage mid-checkout, clicks Continue, and asserts that the user is immediately redirected to the login page with an authorization error (`Epic sadface: You can only access '/checkout-step-two.html' when you are logged in.`).
  - **Form Validation (Missing Fields)**:
    - Missing *First Name* -> verifies `Error: First Name is required`.
    - Missing *Last Name* -> verifies `Error: Last Name is required`.
    - Missing *Zip/Postal Code* -> verifies `Error: Postal Code is required`.

### 5. Logout & Session Management Functionality
- **File**: `cypress/e2e/features/logout.feature`
- **Scenarios Covered (3 tests)**:
  - **Successful Logout via Sidebar Menu**: Authenticated user opens the sidebar burger menu (`#react-burger-menu-btn`), clicks the logout link (`#logout_sidebar_link`), and is returned to the login page with session terminated.
  - **Route Guard Protection After Logout**: Asserts that an unauthenticated user attempting to directly visit protected routes (`/inventory.html`) after logging out is blocked and redirected to the login page with the error message: `Epic sadface: You can only access '/inventory.html' when you are logged in.`.
  - **Reset App State**: User with items in their cart opens the sidebar menu, clicks "Reset App State" (`#reset_sidebar_link`), closes the menu, and verifies that all items in the cart are reset to 0 without terminating the session.

### 6. Product Details Functionality
- **File**: `cypress/e2e/features/product-details.feature`
- **Scenarios Covered (3 tests)**:
  - **View Product Details**: Clicks a product item name ("Sauce Labs Backpack") in the catalog grid, transitions to `/inventory-item.html?id=...`, and verifies the item name, non-empty description, and correct price (`$29.99`).
  - **Add and Remove from Product Details Page**: Adds the product to the cart directly from the details page, verifies the cart badge displays 1 and the button switches to "Remove", then removes it and asserts the cart badge clears.
  - **Back to Products Navigation**: Clicks the "Back to products" button (`[data-test="back-to-products"]`) from the details page and verifies successful return to the inventory catalog page.

### 7. End-to-End Shopping Journey
- **File**: `cypress/e2e/features/end-to-end.feature`
- **Scenarios Covered (1 test)**:
  - Full multi-page user journey: Log in -> add items -> view cart -> remove item -> proceed to checkout -> submit shipping details -> review order summary -> complete purchase -> verify confirmation page.

---

## Test Execution Reports

At the end of every test run (`cypress run`), test reports are automatically generated in the `cypress/reports/` directory.

### 1. Interactive HTML Report
- **File**: `cypress/reports/index.html`
- **Features**:
  - **Executive Summary**: Total tests, passed, failed, pending/skipped, pass rate percentage, and total execution time.
  - **Execution Metadata**: Date and timestamp, browser version, headless/headed state, Cypress version, Node version, OS, and Target Base URL.
  - **Real-Time Filtering**: Instant filter tabs for *All*, *Passed*, *Failed*, and *Skipped* tests.
  - **Live Search**: Instant keyword search filtering by test title, scenario name, or spec path.
  - **Spec Accordions**: Grouped by test file with expand/collapse-all controls.
  - **Failure Diagnostics**: Full error message, stack trace block, and failure screenshot preview with click-to-zoom modal.
  - **Self-Contained**: 100% offline-compatible with zero external CDN dependencies.

To view the report, open it in any web browser:
```bash
# On Linux
xdg-open cypress/reports/index.html

# On macOS
open cypress/reports/index.html

# On Windows
start cypress/reports/index.html
```

### 2. Cucumber BDD HTML Report
- **File**: `cypress/reports/cucumber-report.html`
- **Features**:
  - Official `@cucumber/html-formatter` report showing step-by-step Gherkin execution (`Given`, `When`, `Then`), step durations, data tables, and scenario outlines.

### 3. Machine-Readable JSON Results
- **Files**:
  - `cypress/reports/test-results.json` (comprehensive Cypress run results for all specs)
  - `cypress/reports/cucumber-report.json` (Cucumber BDD JSON format)
- Useful for CI/CD pipeline integration, dashboard ingestion, or archival.

### 4. Terminal Console Summary
At the end of CLI test execution, a formatted summary table is printed directly to stdout:

```text
================================================================================
                           TEST EXECUTION SUMMARY                               
================================================================================
  Spec                                         Tests Passing Failing  Duration
  ────────────────────────────────────────────────────────────────────────────
  ✔ cypress/e2e/features/cart.feature              2       2       -     2.76s
  ✔ cypress/e2e/features/checkout.feature          6       6       -    10.80s
  ✔ cypress/e2e/features/end-to-end.feature        1       1       -     2.71s
  ✔ cypress/e2e/features/inventory.feature        10      10       -    10.21s
  ✔ cypress/e2e/features/login.feature            15      15       -    11.77s
  ✔ cypress/e2e/features/logout.feature            3       3       -     4.51s
  ✔ .../e2e/features/product-details.feature       3       3       -     3.36s
  ✔ cypress/e2e/features/loginCypress.cy.js       15      15       -    10.98s
  ────────────────────────────────────────────────────────────────────────────
  Total (8 specs)                                  55      55       -    57.10s
================================================================================
  Report Generated: file:///.../techAssignment/cypress/reports/index.html
================================================================================
```

---

## Project Directory Structure

```text
techAssignment/
├── cypress/
│   ├── e2e/
│   │   ├── features/                  # Test specifications
│   │   │   ├── cart.feature           # Cart BDD feature
│   │   │   ├── checkout.feature       # Checkout BDD feature
│   │   │   ├── end-to-end.feature     # End-to-end flow BDD feature
│   │   │   ├── inventory.feature      # Inventory catalog & item tests
│   │   │   ├── login.feature          # Login BDD feature & outlines
│   │   │   ├── loginCypress.cy.js     # Native Cypress spec counterpart
│   │   │   ├── logout.feature         # Logout, route guards & reset state
│   │   │   └── product-details.feature# Product Details Page (PDP) feature
│   │   └── step_definitions/          # Cucumber step definitions
│   │       ├── cart.steps.js
│   │       ├── checkout.steps.js
│   │       ├── common.steps.js        # Shared steps (cookies, storage)
│   │       ├── inventory.steps.js
│   │       ├── login.steps.js
│   │       ├── logout.steps.js        # Sidebar & logout step definitions
│   │       └── productDetails.steps.js# Product details step definitions
│   ├── page_objects/                  # Page Object Model abstractions
│   │   ├── cartPage.js
│   │   ├── checkoutPage.js
│   │   ├── inventoryPage.js
│   │   ├── loginPage.js
│   │   ├── productDetailsPage.js      # Product Details Page object
│   │   └── sidebarMenu.js             # Sidebar/Burger navigation drawer object
│   ├── reporter/                      # End-of-run report generator
│   │   └── generateReport.js
│   ├── reports/                       # Generated report artifacts (git-ignored)
│   │   ├── cucumber-report.html
│   │   ├── cucumber-report.json
│   │   ├── index.html
│   │   └── test-results.json
│   └── support/                       # Support commands & utilities
│       ├── commands.js                # Custom cy.login() command
│       ├── e2e.js                     # Global configuration & imports
│       └── utils.js                   # String token parser ([SPACE])
├── cypress.config.js                  # Cypress configuration & lifecycle events
├── package.json                       # Scripts and project dependencies
└── README.md                          # Documentation
```

---

## General Comments & Recommendations

- **Environment Variables**:
  - Valid user credentials (such as `standard_user` and `secret_sauce`) and target environment URLs should ideally be injected via Cypress environment variables (`cypress.env.json` or `CYPRESS_*` environment variables). This avoids hardcoding credentials in repository files and facilitates testing against different environments (e.g. dev, staging, prod).
- **Suggested Additional Scenarios**:
  - *Cart Persistence*: Ensure items added to cart remain in the cart across logout/login sessions.
  - *Order Tax & Total Calculation*: Verify item subtotal, tax computation (8% on SauceDemo), and total sum on the checkout overview page.
  - *Navigation Back/Cancel*: Validate that clicking "Cancel" on checkout step one redirects to the cart page, and "Cancel" on step two returns to the inventory page.
