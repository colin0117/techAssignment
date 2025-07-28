import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import inventoryPage from '../../pages/inventoryPage';

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

// Then step definitions

Then('I see the homepage', () => {
	inventoryPage.isReady();
});
