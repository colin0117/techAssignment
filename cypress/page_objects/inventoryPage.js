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
	 * Public methods
	 */

	// Actions

	// Change the sorting option
	selectSortingOption(sortingOption) {
		cy.get(this._sortDropdown).select(sortingOption);
	}

	addNproducts(productCount) {
		for (let i = 0; i < productCount; i++) {
			cy.get(this._inventoryItemAddToCartButton).first().click();
		}
	}

	removeNproducts(productCount) {
		for (let i = 0; i < productCount; i++) {
			cy.get(this._inventoryItemRemoveButton).last().click();
		}
	}

	clickShoppingCart() {
		cy.get(this._shoppingCartLink).click();
	}

	// Assertions

	assertPageReady() {
		cy.url().should('include', this.url);
		cy.get(this._shoppingCartLink).should('be.visible');
	}

	assertAllProductsLoaded(expectedProductCount) {
		cy.get(this._inventoryItem)
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
			cy.get(this._shoppingCartBadge).should('not.exist');
		} else {
			cy.get(this._shoppingCartBadge).should('have.text', expectedCount.toString());
		}
	}

	/***
	 * Private helper methods
	 */

	// Get an array of the names
	_getAllNames() {
		return cy
			.get(this._inventoryItemName)
			.then(($els) => $els.toArray().map((el) => el.innerText));
	}

	// Get an array of the prices (stripping currency to make them floats)
	_getAllPrices() {
		return cy
			.get(this._inventoryItemPrice)
			.then(($els) => $els.toArray().map((el) => parseFloat(el.innerText.replace('$', ''))));
	}
}

export default new InventoryPage();
