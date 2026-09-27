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

	// Page Two
	_finishButton = '[data-test="finish"]';

	// Complete
	_thankYouText = '[data-test="complete-header"]';

	/***
	 * Element Getters
	 */
	get firstNameInput() {
		return cy.get(this._firstNameInput);
	}

	get lastNameInput() {
		return cy.get(this._lastNameInput);
	}

	get zipInput() {
		return cy.get(this._zipInput);
	}

	get errorText() {
		return cy.get(this._errorText);
	}

	get cancelButton() {
		return cy.get(this._cancelButton);
	}

	get continueButton() {
		return cy.get(this._continueButton);
	}

	get finishButton() {
		return cy.get(this._finishButton);
	}

	get thankYouText() {
		return cy.get(this._thankYouText);
	}

	/***
	 * Public methods
	 */

	// Actions

	fillCheckoutForm(details) {
		if (details.firstname) {
			this.firstNameInput.type(details.firstname);
		}
		if (details.lastname) {
			this.lastNameInput.type(details.lastname);
		}
		if (details.zipCode) {
			this.zipInput.type(details.zipCode);
		}
	}

	clickContinueButton() {
		this.continueButton.click();
	}

	clickFinishButton() {
		this.finishButton.click();
	}

	clickCancelButton() {
		this.cancelButton.click();
	}

	// Assertions

	assertOrderSuccessful() {
		this.thankYouText
			.should('be.visible')
			.and('contain.text', 'Thank you for your order!');
	}

	assertError(errorMessage) {
		this.errorText.should('be.visible').and('have.text', errorMessage);
	}
}

export default new CheckoutPage();
