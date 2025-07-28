class loginPage {
	userNameInput = '[data-test="username"]';
	passwordInput = '[data-test="password"]';
	submitButton = '[data-test="login-button"]';
	errorBox = '[data-test="error"]';

	isReady() {
		cy.get(this.userNameInput).should('be.visible');
	}

	visit() {
		cy.visit('');
		this.isReady();
	}

	enterUsername(username) {
		cy.get(this.userNameInput).type(username);
	}

	enterPassword(password) {
		cy.get(this.passwordInput).type(password);
	}

	clickSubmit() {
		cy.get(this.submitButton).click();
	}
}

export default new loginPage();
