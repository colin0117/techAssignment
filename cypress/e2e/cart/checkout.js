import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import checkoutPage from '../../pages/checkoutPage';

// When step definitions

When('I click on the Continue button', () => {
	cy.get(checkoutPage.continueButton).click();
});

When("I fill in the checkout form with the following details:", (dataTable) => {
    const checkoutData = dataTable.hashes()[0];

    if (checkoutData.firstname) {
        cy.get(checkoutPage.firstNameInput).type(checkoutData.firstname);
    }
    if (checkoutData.lastname) {
        cy.get(checkoutPage.lastNameInput).type(checkoutData.lastname);
    }
    if (checkoutData.zipCode) {
        cy.get(checkoutPage.zipInput).type(checkoutData.zipCode);
    }
});

When('I click on the Finish button', () => {
	cy.get(checkoutPage.finishButton).click();
});

When('I see the order was successful', () => {
	cy.get(checkoutPage.thankYouText)
		.should('be.visible')
		.and('contain.text', 'Thank you for your order!');
});

// Then step definitions

Then('I see the error {string}', (text) => {
	cy.get(checkoutPage.errorText).should('be.visible').and('have.text', text);
});


