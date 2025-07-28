import loginPage from '../pages/loginPage';
import inventoryPage from '../pages/inventoryPage';

Cypress.Commands.add('login', (username, password) => {
    loginPage.visit();
    loginPage.enterUsername(username);
    loginPage.enterPassword(password);
    loginPage.clickSubmit();
    cy.get(inventoryPage.shoppingCartLink).should('be.visible');
});