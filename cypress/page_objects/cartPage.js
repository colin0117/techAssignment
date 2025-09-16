class CartPage {
	/***
	 * Private selectors
	 */
	_inventoryItems = '[data-test="inventory-item"]';
	_removeButton = 'button:contains("Remove")';

	_checkoutButton = '[data-test="checkout"]';
	_continueShoppingButton = '[data-test="continue-shopping"]';

	/***
	 * Public methods
	 */

	// Actions

	clickCheckoutButton() {
		cy.get(this._checkoutButton).click();
	}

	clickContinueShoppingButton() {
		cy.get(this._continueShoppingButton).click();
	}

	removeItem(itemNumber) {
		cy.get(this._removeButton).eq(itemNumber).click();
	}

	getCartItems() {
		return cy.get(this._inventoryItems);
	}

	// Assertions

	assertCartItemCount(expectedCount) {
		this.getCartItems().should('have.length', expectedCount);
	}
}

export default new CartPage();
