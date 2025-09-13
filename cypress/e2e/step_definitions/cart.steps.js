import { When } from '@badeball/cypress-cucumber-preprocessor';
import cartPage from '../../page_objects/cartPage';

// When step definitions

When('I see {int} items in the cart', (count) => {
	cy.get(cartPage.inventoryItems).should('have.length', count);
});

When('I remove the first item from the cart', () => {
	cartPage.elements.removeButton().first().click();
});

When('I click on the Checkout button', () => {
	cartPage.clickCheckoutButton()
});

When('I manipulate the session token in localStorage', () => {
	const storageName = 'session-username';
	cy.window().then((window) => {
		const originalValue = window.localStorage.getItem(storageName);
		window.localStorage.setItem(storageName, `${originalValue}XXX`);
	});
});
