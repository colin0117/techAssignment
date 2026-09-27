class InventoryPage {
	// Constants
	url = '/inventory.html';

	/***
	 * Private selectors
	 */
	_inventoryItem = '[data-test="inventory-item"]';
	_inventoryItemName = '[data-test="inventory-item-name"]';
	_inventoryItemPrice = '[data-test="inventory-item-price"]';

	_inventoryItemAddToCartButton = 'button:contains("Add to cart")';
	_inventoryItemRemoveButton = 'button:contains("Remove")';

	_shoppingCartLink = '[data-test="shopping-cart-link"]';
	_shoppingCartBadge = '[data-test="shopping-cart-badge"]';

	_sortDropdown = '[data-test="product-sort-container"]';

	/***
	 * Element Getters
	 */
	get sortDropdown() {
		return cy.get(this._sortDropdown);
	}

	get shoppingCartLink() {
		return cy.get(this._shoppingCartLink);
	}

	get shoppingCartBadge() {
		return cy.get(this._shoppingCartBadge);
	}

	get inventoryItems() {
		return cy.get(this._inventoryItem);
	}

	get inventoryItemNames() {
		return cy.get(this._inventoryItemName);
	}

	get inventoryItemPrices() {
		return cy.get(this._inventoryItemPrice);
	}

	get addToCartButtons() {
		return cy.get(this._inventoryItemAddToCartButton);
	}

	get removeButtons() {
		return cy.get(this._inventoryItemRemoveButton);
	}

	/***
	 * Parameterized Element Functions
	 */
	getItemByName(productName) {
		return this.inventoryItems.filter(`:contains("${productName}")`);
	}

	getItemAddToCartButton(productName) {
		return this.getItemByName(productName).find(this._inventoryItemAddToCartButton);
	}

	getItemRemoveButton(productName) {
		return this.getItemByName(productName).find(this._inventoryItemRemoveButton);
	}

	/***
	 * Public methods
	 */

	// Actions

	// Change the sorting option
	selectSortingOption(sortingOption) {
		this.sortDropdown.select(sortingOption);
	}

	addNproducts(productCount) {
		for (let i = 0; i < productCount; i++) {
			this.addToCartButtons.first().click();
		}
	}

	removeNproducts(productCount) {
		for (let i = 0; i < productCount; i++) {
			this.removeButtons.last().click();
		}
	}

	clickShoppingCart() {
		this.shoppingCartLink.click();
	}

	clickProductByName(productName) {
		this.inventoryItemNames.contains(productName).click();
	}

	addProductByName(productName) {
		this.getItemAddToCartButton(productName).click();
	}

	removeProductByName(productName) {
		this.getItemRemoveButton(productName).click();
	}

	// Assertions

	assertItemHasRemoveButton(productName) {
		this.getItemRemoveButton(productName).should('be.visible');
	}

	assertItemHasNoAddToCartButton(productName) {
		this.getItemAddToCartButton(productName).should('not.exist');
	}

	assertPageReady() {
		cy.url().should('include', this.url);
		this.shoppingCartLink.should('be.visible');
	}

	assertAllProductsLoaded(expectedProductCount) {
		this.inventoryItems
			.should('have.length', expectedProductCount)
			.each(($product) => {
				cy.wrap($product).within(() => {
					cy.get(this._inventoryItemName).should('be.visible');
					cy.get(this._inventoryItemPrice).should('be.visible');
					cy.get(this._inventoryItemAddToCartButton).should('be.visible');
				});
			});
	}

	assertProductSort(sortingOption) {
		// Determine whether sorting by Price or Name
		const isPriceSort = sortingOption.includes('Price');
		const getValuesPromise = isPriceSort ? this._getAllPrices() : this._getAllNames();

		getValuesPromise.then((currentValues) => {
			const isDescending = sortingOption.includes('descending');

			// Copy the array and sort based on the sort type
			const expectedValues = [...currentValues];

			if (isPriceSort) {
				expectedValues.sort((a, b) => (isDescending ? b - a : a - b));
			} else {
				expectedValues.sort();
				if (isDescending) {
					expectedValues.reverse();
				}
			}

			expect(currentValues).to.deep.equal(expectedValues);
		});
	}

	assertCartBadgeCount(expectedCount) {
		if (expectedCount === 0) {
			this.shoppingCartBadge.should('not.exist');
		} else {
			this.shoppingCartBadge.should('have.text', expectedCount.toString());
		}
	}

	/***
	 * Private helper methods
	 */

	// Get an array of the names
	_getAllNames() {
		return this.inventoryItemNames
			.then(($els) => $els.toArray().map((el) => el.innerText));
	}

	// Get an array of the prices (stripping currency to make them floats)
	_getAllPrices() {
		return this.inventoryItemPrices
			.then(($els) => $els.toArray().map((el) => parseFloat(el.innerText.replace('$', ''))));
	}
}

export default new InventoryPage();
