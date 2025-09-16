import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../page_objects/loginPage';
import { processString } from '../../support/utils';

// Given step definitions

Given('I am at the login page', () => {
	LoginPage.visit();
});

Given('I am logged in as {string} with password {string}', (username, password) => {
	cy.login(username, password);
});

// When step definitions

When('I open the login page', () => {
	LoginPage.visit();
});

When('I see the login page', () => {
	LoginPage.assertPageReady();
});

When('I enter username {string}', (username) => {
	const processed = processString(username);
	LoginPage.enterUsername(processed);
});

When('I enter password {string}', (password) => {
	const processed = processString(password);
	LoginPage.enterPassword(processed);
});

When('I click the login button', () => {
	LoginPage.clickSubmit();
});

// Then step definitions

Then('I see a login error with {string}', (errorMessage) => {
	LoginPage.assertError(errorMessage);
});
