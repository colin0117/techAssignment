class CheckoutPage {
	/***
	 * Private selectors
	 */

	// Page One
	_firstNameInput = '[data-test="firstName"]';
	_lastNameInput = '[data-test="lastName"]';
	_zipInput = '[data-test="postalCode"]';

	_errorText = '[data-test="error"]';

	_cancelButton = '[data-test="cancel"]';
	_continueButton = '[data-test="continue"]';

	// Page two
	_finishButton = '[data-test="finish"]';

	// Complete
	_thankYouText = '[data-test="complete-header"]';

	/***
	 * Public methods
	 */

	// Actions

	fillCheckoutForm(details) {
		if (details.firstname) {
			cy.get(this._firstNameInput).type(details.firstname);
		}
		if (details.lastname) {
			cy.get(this._lastNameInput).type(details.lastname);
		}
		if (details.zipCode) {
			cy.get(this._zipInput).type(details.zipCode);
		}
	}

	clickContinueButton() {
		cy.get(this._continueButton).click();
	}

	clickFinishButton() {
		cy.get(this._finishButton).click();
	}

	clickCancelButton() {
		cy.get(this._cancelButton).click();
	}

	// Assertions

	assertOrderSuccessful() {
		cy.get(this._thankYouText)
			.should('be.visible')
			.and('contain.text', 'Thank you for your order!');
	}

	assertError(errorMessage) {
		cy.get(this._errorText).should('be.visible').and('have.text', errorMessage);
	}
}

export default new CheckoutPage();
