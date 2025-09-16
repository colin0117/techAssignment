import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

/**
 * These step are available for all feature files
 */

// When step definitions

When('I clear the browser cookies', () => {
	cy.clearCookies();
});

When('I clear the local storage', () => {
	cy.clearLocalStorage();
});

When('I manipulate the session token in localStorage', () => {
	const storageName = 'session-username';
	cy.window().then((window) => {
		const originalValue = window.localStorage.getItem(storageName);
		window.localStorage.setItem(storageName, `${originalValue}XXX`);
	});
});


