class LoginPage {
	/***
	 * Private selectors
	 */
	_userNameInput = '[data-test="username"]';
	_passwordInput = '[data-test="password"]';
	_submitButton = '[data-test="login-button"]';
	_errorBox = '[data-test="error"]';

	/***
	 * Element Getters
	 */
	get userNameInput() {
		return cy.get(this._userNameInput);
	}

	get passwordInput() {
		return cy.get(this._passwordInput);
	}

	get submitButton() {
		return cy.get(this._submitButton);
	}

	get errorBox() {
		return cy.get(this._errorBox);
	}

	/***
	 * Public methods
	 */

	// Actions
	visit() {
		cy.visit('');
		this.assertPageReady();
	}

	enterUsername(username) {
		if (username) {
			this.userNameInput.type(username);
		}
	}

	enterPassword(password) {
		if (password) {
			this.passwordInput.type(password);
		}
	}

	clickSubmit() {
		this.submitButton.click();
	}

	// Assertions
	assertPageReady() {
		this.userNameInput.should('be.visible');
	}

	assertError(errorMessage) {
		this.errorBox.should('be.visible').and('contain.text', errorMessage);
	}
}

export default new LoginPage();
