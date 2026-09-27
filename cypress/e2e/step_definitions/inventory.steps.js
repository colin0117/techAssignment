import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import InventoryPage from '../../page_objects/inventoryPage';

// Given step definitions

Given('I sort products by {string}', (sortingOption) => {
	InventoryPage.selectSortingOption(sortingOption);
});

Given('I have {int} products in my cart', (productCount) => {
	InventoryPage.addNproducts(productCount);
});

// When step definitions

When('I add {int} product to my cart', (productCount) => {
	InventoryPage.addNproducts(productCount);
});

When('I add the product {string} to my cart', (productName) => {
	InventoryPage.addProductByName(productName);
});

When('I can remove {int} product from my cart', (productCount) => {
	InventoryPage.removeNproducts(productCount);
});

When('I remove the product {string} from my cart', (productName) => {
	InventoryPage.removeProductByName(productName);
});

// Then step definitions

Then('I see the inventory page', () => {
	InventoryPage.assertPageReady();
});

Then('All products are loaded correctly', () => {
	// Assuming 6 products for this demo site. In a real app,
	// this might come from an API call or an SQL statement
	const expectedProductCount = 6;
	InventoryPage.assertAllProductsLoaded(expectedProductCount);
});

Then('The products are sorted by {string}', (sortingOption) => {
	InventoryPage.assertProductSort(sortingOption);
});

Then('I see {int} products in my cart', (cartCount) => {
	InventoryPage.assertCartBadgeCount(cartCount);
});

Then('The product {string} shows a remove button', (productName) => {
	InventoryPage.assertItemHasRemoveButton(productName);
});

Then('The product {string} does not show an add to cart button', (productName) => {
	InventoryPage.assertItemHasNoAddToCartButton(productName);
});

