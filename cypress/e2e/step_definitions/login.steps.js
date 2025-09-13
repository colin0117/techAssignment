import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

import loginPage from '../../page_objects/loginPage';

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

When('I enter username {string}', (username) => {
	loginPage.enterUsername(username);
});

When('I enter password {string}', (password) => {
	loginPage.enterPassword(password);
});

When('I click the login button', () => {
	loginPage.clickSubmit();
});

// Then step definitions

Then('I see a login error with {string}', (errorMessage) => {
	cy.get(loginPage.errorBox).should('be.visible').and('contain.text', errorMessage);
});
