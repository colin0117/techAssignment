class checkoutPage {
	/***
	 * Selectors
	 */

	// Page One
	firstNameInput = '[data-test="firstName"]';
	lastNameInput = '[data-test="lastName"]';
	zipInput = '[data-test="postalCode"]';

	errorText = '[data-test="error"]';

	cancelButton = '[data-test="cancel"]';
	continueButton = '[data-test="continue"]';

	// Page two
	finishButton = '[data-test="finish"]';

	// Complete
	thankYouText = '[data-test="complete-header"]';
}

export default new checkoutPage();
