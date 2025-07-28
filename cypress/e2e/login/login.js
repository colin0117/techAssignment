import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

import loginPage from '../../pages/loginPage';

// Given step definitions

Given('I am at the login page', () => {
	loginPage.visit();
});

Given('I am logged in as {string} with password {string}', (username, password) => {
	cy.login(username, password);
});

// When step definitions

When('I open the login page', () => {
	loginPage.visit();
});

When('I see the login page', () => {
	loginPage.isReady();
});

/**
 * I'd avoid doing two testable operations at once and split into two steps
 */
// Given('I enter username {string} and password {string}', (username, password) => {
// 	loginPage.enterUsername(username);
// 	loginPage.enterPassword(password);
// });

When('I enter username {string}', (username) => {
	loginPage.enterUsername(username);
});

When('I enter password {string}', (password) => {
	loginPage.enterPassword(password);
});

When('I click the login button', () => {
	loginPage.clickSubmit();
});

/***
 * The following step isn't checking whether it's on the homepage, just that it's not on login
 */
// Given('I should see the homepage', () => {
// 	cy.url().should('not.eq', loginPage.url);
// });

// Then step definitions

Then('I see a login error with {string}', (errorMessage) => {
	cy.get(loginPage.errorBox).should('be.visible').and('contain.text', errorMessage);
});
