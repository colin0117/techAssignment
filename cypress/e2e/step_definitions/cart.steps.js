import { When } from '@badeball/cypress-cucumber-preprocessor';
import CartPage from '../../page_objects/cartPage';
import InventoryPage from '../../page_objects/inventoryPage';

// When step definitions

// High-level navigation step
When('I am on my cart page', () => {
	InventoryPage.clickShoppingCart();
});

When('I see {int} items in the cart', (count) => {
	CartPage.assertCartItemCount(count);
});

When('I remove the first item from the cart', () => {
	CartPage.removeItem(0);
});

When('I click on the Checkout button', () => {
	CartPage.clickCheckoutButton();
});

When('I click on the Continue Shopping button', () => {
	CartPage.clickContinueShoppingButton();
});


