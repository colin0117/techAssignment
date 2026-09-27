import { When } from '@badeball/cypress-cucumber-preprocessor';
import SidebarMenu from '../../page_objects/sidebarMenu';

// When step definitions

When('I open the sidebar menu', () => {
	SidebarMenu.open();
});

When('I click on the logout link', () => {
	SidebarMenu.clickLogout();
});

When('I click on the reset app state link', () => {
	SidebarMenu.clickResetAppState();
});

When('I close the sidebar menu', () => {
	SidebarMenu.close();
});

When('I try to visit the inventory page directly', () => {
	cy.visit('/inventory.html', { failOnStatusCode: false });
});
