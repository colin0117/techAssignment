class ProductDetailsPage {
	// Constants
	url = '/inventory-item.html';

	/***
	 * Private selectors
	 */
	_productName = '[data-test="inventory-item-name"]';
	_productDesc = '[data-test="inventory-item-desc"]';
	_productPrice = '[data-test="inventory-item-price"]';
	_addToCartButton = '[data-test="add-to-cart"]';
	_removeButton = '[data-test="remove"]';
	_backToProductsButton = '[data-test="back-to-products"]';
	_productImage = '.inventory_details_img';

	/***
	 * Element Getters
	 */
	get productName() {
		return cy.get(this._productName);
	}

	get productDesc() {
		return cy.get(this._productDesc);
	}

	get productPrice() {
		return cy.get(this._productPrice);
	}

	get addToCartButton() {
		return cy.get(this._addToCartButton);
	}

	get removeButton() {
		return cy.get(this._removeButton);
	}

	get backToProductsButton() {
		return cy.get(this._backToProductsButton);
	}

	get productImage() {
		return cy.get(this._productImage);
	}

	/***
	 * Public methods
	 */

	// Actions

	clickAddToCart() {
		this.addToCartButton.should('be.visible').click();
	}

	clickRemove() {
		this.removeButton.should('be.visible').click();
	}

	clickBackToProducts() {
		this.backToProductsButton.should('be.visible').click();
	}

	// Assertions

	assertPageReady(expectedProductName) {
		cy.url().should('include', this.url);
		this.productName.should('be.visible');
		if (expectedProductName) {
			this.productName.should('have.text', expectedProductName);
		}
	}

	assertDescriptionNotEmpty() {
		this.productDesc.should('be.visible').and('not.be.empty');
	}

	assertPrice(expectedPrice) {
		this.productPrice.should('be.visible').and('have.text', expectedPrice);
	}

	assertRemoveButtonVisible() {
		this.removeButton.should('be.visible');
	}

	assertAddToCartButtonVisible() {
		this.addToCartButton.should('be.visible');
	}
}

export default new ProductDetailsPage();
