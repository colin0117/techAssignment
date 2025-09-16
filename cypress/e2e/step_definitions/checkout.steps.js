import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import InventoryPage from '../../page_objects/inventoryPage';
import CartPage from '../../page_objects/cartPage';
import CheckoutPage from '../../page_objects/checkoutPage';

// When step definitions

// High-level navigation step
When('I am on my checkout page', () => {
    InventoryPage.clickShoppingCart();
    CartPage.clickCheckoutButton();
});

When('I click on the Continue button', () => {
  CheckoutPage.clickContinueButton();
});

When("I fill in the checkout form with the following details:", (dataTable) => {
  // dataTable.hashes() returns an array of objects, we only pass one
  const checkoutData = dataTable.hashes()[0];
  CheckoutPage.fillCheckoutForm(checkoutData);
});

When('I click on the Finish button', () => {
  CheckoutPage.clickFinishButton();
});

// Then step definitions

Then('I see the order was successful', () => {
  CheckoutPage.assertOrderSuccessful();
});

Then('I see the error {string}', (errorMessage) => {
  CheckoutPage.assertError(errorMessage);
});