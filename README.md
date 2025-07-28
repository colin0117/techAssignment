# Comments on "techAssignment" - Colin Marks

## 1 Automation of the specific scenarios

### General comments on the code

- Added baseUrl instead of hard-coded URL, though this should also be extended to use an enivornment variables in the declaration. This is useful if tests are to run on different environments, such as test/uat/prod
- User enivornment variables ideally should be used for the valid login accounts too. This provides better security, and as per the point above, handy if testing required on different environments.

### Step definition files

- I've moved the step definition files to be alongside their feature file. This makes it easier to find the relevant steps. The alternative is to have a `step_definitions` directory under `support`. I've used both approaches in the past, but recently tend to prefer keeping them close to the feature files.
- Some of the code has been simplified, other bits removed as redundant. For most of these changes I've kept the original code in place, and commented it out with an explanatory comment.

### Page object files

- I changed the CSS locators to use `data-test` attributes instead, as better practice and less prone to future failings. When a text string locator isn't enough, such as when `cy.contains()` needs to be used instead (for example, some of the buttons), those are kept in an `elements` object.

## 2 API and SQL

### API

`cy.request()` can be used for API testing within the Cypress framework. This is useful as a shortcut for certain tasks, such as logging a user in without the need to go through the login form. When many tests are being used, these small savings are compounded over a test run to make a significant difference.

I've also used the APIs in standard test runs to get values of the feature flags, something like this

```
  getFeatureStatus() {
    cy.request(Cypress.env('PRODUCT_URL')).then(response => {
      expect(response.status).to.eq(200);
      Object.keys(response.body).forEach(key => {
        cy.wrap(response.body[key]).as(key);
      });
    });
  }
```

In a similar way, you can explicitly test APIs with Cypress, manipulating the `body` object inside `cy.request()` to test various scenarios.  

### SQL

SQL commands can be very useful for determining the expected results of a test by querying the database directly, or, for seeding the database prior to a test commencing.

These can be executed within a `task` command with the `setupNodeEvents` in the Cypress config. A third party SQL NPM library could then provide the back-end connection.

This would look something like this in the test:

```
  cy.task('SQL', 'SELECT * FROM basket WHERE user_id = "standard_user"')
    .then((basket) => {
      expect(basket).to.have.length(1);
      expect(basket[0].item_count).to.eq(3);
    });
```

## 3 Negative and flakey tests

### Negative tests

These would verify the error handling of the application, such as the login tests where there are tests for unknown users, and the suggested tests for missing username/password. Always important to have to catch those edge case regressions.

### Flakey tests

Flakey/brittle tests are normally caused by timing issues - such as when the response times vary on different test runs, or if poor selectors are chosen which do not provide consistent and reliable element selection.

For frequent timing issues, it may be worth stubbing or mocking endpoints, or using targeted longer waits for specific `get()` commands or actions. Hard coded waits are rarely a good solution, other solutions are generally available, such as deploying `cy.intercept()` to determine when the client has received a response.

As a last resort for unreliable tests due to timing issues, Cypress can be configured to retry each test a number of times in an event of a failure (with different values permitted in `runMode` and `openMode`). I tend not to use these as they can mask intermittent problems that the end-user may see.

## 4 Additional tests

A number of additional tests are listed at the end of each feature file.
