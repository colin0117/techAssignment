class inventoryPage {
	url = '/inventory.html';

	/***
	 * productCount is brittle as likely to break if products are added. Would be better to
	 * use SQL to interrogate the DB for the expected value as part of the setup
	 */
	productCount = 6;

	/***
	 * Selectors
	 */
	inventoryItem = '[data-test="inventory-item"]';
	inventoryItemName = '[data-test="inventory-item-name"]';
	inventoryItemPrice = '[data-test="inventory-item-price"]';

	/***
	 * Messy and brittle to use styling classes - should be last resort
	 */
	// inventoryItemAddButton = '[class="btn btn_primary btn_small btn_inventory "]';

	shoppingCartLink = '[data-test="shopping-cart-link"]';
	sortDropdown = '[data-test="product-sort-container"]';

	elements = {
		inventoryItemAddButton: () => cy.contains('button', 'Add to cart'),
		inventoryItemRemoveButton: () => cy.contains('button', 'Remove')
	};

	/***
	 * Actions
	 ***/

	// Used to determine whether page is loaded
	isReady() {
		cy.url().should('include', this.url);
		cy.get(this.shoppingCartLink).should('be.visible');
	}

	/***
	 * No real value to having getters for these locator strings
	 */
	// getItem() {
	// 	return this.inventoryItem;
	// }

	// // The following should be used within a cy.within block
	// getItemPrice() {
	// 	return this.inventoryItemPrice;
	// }

	// getItemName() {
	// 	return this.inventoryItemName;
	// }

	// getItemAddButton() {
	// 	return this.inventoryItemAddButton;
	// }

	// Change the sorting option
	selectSortingOption(sortingOption) {
		cy.get(this.sortDropdown).select(sortingOption);
	}

	// Get an array of the names
	getAllNames() {
		return cy.get(this.inventoryItemName).then(($elements) => {
			return Cypress._.map($elements, (el) => el.innerText);
		});
	}

	// Get an array of the prices (stripping currency to make them floats)
	getAllPrices() {
		return cy.get(this.inventoryItemPrice).then(($elements) => {
			return Cypress._.map($elements, (el) => parseFloat(el.innerText.replace('$', '')));
		});
	}

	addNproducts(productCount) {
		for (let i = 0; i < productCount; i++) {
			this.elements.inventoryItemAddButton().first().click();
		}
	}
}

export default new inventoryPage();
