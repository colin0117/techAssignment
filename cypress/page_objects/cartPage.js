// class cartPage {
// 	/***
// 	 * Selectors
// 	 */
// 	_checkoutButton = '[data-test="checkout"]';
// 	_inventoryItems = '[data-test="inventory-item"]';

// 	elements = {
// 		removeButton: () => cy.contains('button', 'Remove')
// 	};
// }

// export default new cartPage();

/***
 * cart.html - page for checkout
 */

class CartPage {
  // Private selectors
  _checkoutButton = '[data-test="checkout"]';
  _inventoryItems = '[data-test="inventory-item"]';
  _removeButton = 'button:contains("Remove")';

  // Public methods (actions/assertions)
  clickCheckoutButton() {
    cy.get(this._checkoutButton).click();
  }

  removeItem(itemName) {
    cy.contains(this._inventoryItems, itemName)
      .find(this_removeButton)
      .click();
  }

  getCartItems() {
    return cy.get(this._inventoryItems);
  }

  assertCartItemCount(expectedCount) {
    this.getCartItems().should('have.length', expectedCount);
  }
}

export default new CartPage();