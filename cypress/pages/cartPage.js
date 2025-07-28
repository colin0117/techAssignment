class cartPage {
	/***
	 * Selectors
	 */
	checkoutButton = '[data-test="checkout"]';
	inventoryItems = '[data-test="inventory-item"]';

	elements = {
		removeButton: () => cy.contains('button', 'Remove')
	};
}

export default new cartPage();
