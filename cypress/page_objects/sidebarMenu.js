class SidebarMenu {
	/***
	 * Private selectors
	 */
	_burgerMenuButton = '#react-burger-menu-btn';
	_closeMenuButton = '#react-burger-cross-btn';
	_logoutLink = '#logout_sidebar_link';
	_resetAppStateLink = '#reset_sidebar_link';
	_allItemsLink = '#inventory_sidebar_link';
	_menuWrap = '.bm-menu-wrap';

	/***
	 * Element Getters
	 */
	get burgerMenuButton() {
		return cy.get(this._burgerMenuButton);
	}

	get closeMenuButton() {
		return cy.get(this._closeMenuButton);
	}

	get logoutLink() {
		return cy.get(this._logoutLink);
	}

	get resetAppStateLink() {
		return cy.get(this._resetAppStateLink);
	}

	get allItemsLink() {
		return cy.get(this._allItemsLink);
	}

	get menuWrap() {
		return cy.get(this._menuWrap);
	}

	/***
	 * Public methods
	 */

	// Actions

	open() {
		this.burgerMenuButton.should('be.visible').click();
		this.logoutLink.should('be.visible');
	}

	close() {
		this.closeMenuButton.should('be.visible').click();
	}

	clickLogout() {
		this.logoutLink.click();
	}

	clickResetAppState() {
		this.resetAppStateLink.click();
	}

	clickAllItems() {
		this.allItemsLink.click();
	}

	// Assertions

	assertMenuOpen() {
		this.logoutLink.should('be.visible');
	}
}

export default new SidebarMenu();
