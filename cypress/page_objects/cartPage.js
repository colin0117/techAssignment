class CartPage {
	/***
	 * Private selectors
	 */
	_inventoryItems = '[data-test="inventory-item"]';
	_removeButton = 'button:contains("Remove")';
	_checkoutButton = '[data-test="checkout"]';
	_continueShoppingButton = '[data-test="continue-shopping"]';

	/***
	 * Element Getters
	 */
	get checkoutButton() {
		return cy.get(this._checkoutButton);
	}

	get continueShoppingButton() {
		return cy.get(this._continueShoppingButton);
	}

	get inventoryItems() {
		return cy.get(this._inventoryItems);
	}

	get removeButtons() {
		return cy.get(this._removeButton);
	}

	/***
	 * Parameterized Element Functions
	 */
	getRemoveButton(itemNumber) {
		return this.removeButtons.eq(itemNumber);
	}

	getCartItems() {
		return this.inventoryItems;
	}

	/***
	 * Public methods
	 */

	// Actions

	clickCheckoutButton() {
		this.checkoutButton.click();
	}

	clickContinueShoppingButton() {
		this.continueShoppingButton.click();
	}

	removeItem(itemNumber) {
		this.getRemoveButton(itemNumber).click();
	}

	// Assertions

	assertCartItemCount(expectedCount) {
		this.inventoryItems.should('have.length', expectedCount);
	}
}

export default new CartPage();
