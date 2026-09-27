import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import InventoryPage from '../../page_objects/inventoryPage';
import ProductDetailsPage from '../../page_objects/productDetailsPage';

// When step definitions

When('I click on the product {string}', (productName) => {
	InventoryPage.clickProductByName(productName);
});

When('I add the product to my cart from the details page', () => {
	ProductDetailsPage.clickAddToCart();
});

When('I remove the product from my cart from the details page', () => {
	ProductDetailsPage.clickRemove();
});

When('I click on the back to products button', () => {
	ProductDetailsPage.clickBackToProducts();
});

// Then step definitions

Then('I see the product details page for {string}', (productName) => {
	ProductDetailsPage.assertPageReady(productName);
});

Then('I see the product description is not empty', () => {
	ProductDetailsPage.assertDescriptionNotEmpty();
});

Then('I see the product price is {string}', (price) => {
	ProductDetailsPage.assertPrice(price);
});

Then('I see the remove button on the details page', () => {
	ProductDetailsPage.assertRemoveButtonVisible();
});

Then('I see the add to cart button on the details page', () => {
	ProductDetailsPage.assertAddToCartButtonVisible();
});
