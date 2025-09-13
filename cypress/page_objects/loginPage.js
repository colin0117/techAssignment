class loginPage {
	// Private selectors
	_userNameInput = '[data-test="username"]';
	_passwordInput = '[data-test="password"]';
	_submitButton = '[data-test="login-button"]';
	_errorBox = '[data-test="error"]';

	// Public methods
	visit() {
		cy.visit('');
		this.isReady();
	}

	enterUsername(username) {
		cy.get(this._userNameInput).type(username);
	}

	enterPassword(password) {
		cy.get(this._passwordInput).type(password);
	}

	clickSubmit() {
		cy.get(this._submitButton).click();
	}

	// Assertions
	isReady() {
		cy.get(this._userNameInput).should('be.visible');
	}

	assertError(errorText) {
		cy.get(this._errorBox).should('be.visible').and('contain.text', errorMessage);
	}
}

export default new loginPage();
