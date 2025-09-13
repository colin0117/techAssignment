import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import inventoryPage from '../../page_objects/inventoryPage';

// Given step definitions

Given('I sort products by {string}', (sortingOption) => {
	inventoryPage.selectSortingOption(sortingOption);
});

Given('I have {int} products in my cart', (productCount) => {
	inventoryPage.addNproducts(productCount);
});

// When step definitions

When('I am on my cart page', () => {
	cy.get(inventoryPage.shoppingCartLink).click();
});

When('I add {int} product to my cart', (productCount) => {
	inventoryPage.addNproducts(productCount);
});

When('I can remove {int} product from my cart', (productCount) => {
	for (let i = 0; i < productCount; i++) {
		inventoryPage.elements.inventoryItemRemoveButton().last().click();
	}
});

// Then step definitions

Then('All products are loaded correctly', () => {
    /**
     * See comment in the inventoryPage file - TL;DR - this isn't a good step
     */
	cy.get(inventoryPage.inventoryItem)
		.should('have.length', inventoryPage.productCount)
		.each(($product) => {
			cy.wrap($product).within(() => {
				cy.get(inventoryPage.inventoryItemName).should('be.visible');
				inventoryPage.elements.inventoryItemAddButton().should('be.visible');
				cy.get(inventoryPage.inventoryItemPrice).should('be.visible');
			});
		});
});

Then('The products are sorted by {string}', (sortingOption) => {
	const getFuncPromise = sortingOption.includes('Price')
		? inventoryPage.getAllPrices()
		: inventoryPage.getAllNames();

	// Get the ordering on the page
	getFuncPromise.then((currentValues) => {
		const isDescending = sortingOption.includes('descending');

		// Copy the array and sort based on the sort type
		const expectedValues = [...currentValues];

		if (sortingOption.includes('Price')) {
			expectedValues.sort((a, b) => (isDescending ? b - a : a - b));
		} else {
			expectedValues.sort();

			if (isDescending) {
				expectedValues.reverse();
			}
		}

		// Now just compare the two arrays
		expect(currentValues).to.deep.equal(expectedValues);
	});
});

Then('I see {int} products in my cart', (cartCount) => {
    // If cart is empty, replace the count with an empty string
	cy.get(inventoryPage.shoppingCartLink).should('have.text', cartCount || '');
});

