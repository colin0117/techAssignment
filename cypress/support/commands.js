import LoginPage from '../page_objects/loginPage';
import InventoryPage from '../page_objects/inventoryPage';

Cypress.Commands.add('login', (username, password) => {
	LoginPage.visit();
	LoginPage.enterUsername(username);
	LoginPage.enterPassword(password);
	LoginPage.clickSubmit();
	InventoryPage.assertPageReady();
});
