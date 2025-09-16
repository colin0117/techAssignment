import LoginPage from '../../page_objects/loginPage';
import InventoryPage from '../../page_objects/inventoryPage';

import { processString } from '../../support/utils';

describe('Login Functionality', () => {
	beforeEach(() => {
		LoginPage.visit();
	});

	it('Successful login with valid credentials', () => {
		LoginPage.enterUsername(processString('standard_user'));
		LoginPage.enterPassword(processString('secret_sauce'));
		LoginPage.clickSubmit();
		InventoryPage.assertPageReady();
	});

	const errorTestCases = [
		{
			comment: 'Locked user',
			user: 'locked_out_user',
			password: 'secret_sauce',
			error: 'Epic sadface: Sorry, this user has been locked out'
		},
		{
			comment: 'Unknown user',
			user: 'unknown_user',
			password: 'secret_sauce',
			error: 'Epic sadface: Username and password do not match any user in this service'
		},
		{
			comment: 'Bad password',
			user: 'standard_user',
			password: 'secret_sauce1',
			error: 'Epic sadface: Username and password do not match any user in this service'
		},
		{
			comment: 'Password Missing',
			user: 'standard_user',
			password: '',
			error: 'Epic sadface: Password is required'
		},
		{
			comment: 'Username Missing',
			user: '',
			password: 'secret_sauce1',
			error: 'Epic sadface: Username is required'
		},
		{
			comment: 'White space before',
			user: 'standard_user',
			password: '[SPACE]secret_sauce',
			error: 'Epic sadface: Username and password do not match any user in this service'
		},
		{
			comment: 'White space after',
			user: 'standard_user',
			password: 'secret_sauce[SPACE]',
			error: 'Epic sadface: Username and password do not match any user in this service'
		},
		{
			comment: 'White space in middle',
			user: 'standard_user',
			password: 'secret_[SPACE]sauce',
			error: 'Epic sadface: Username and password do not match any user in this service'
		},
		{
			comment: 'Username capitalisation',
			user: 'Standard_user',
			password: 'secret_sauce',
			error: 'Epic sadface: Username and password do not match any user in this service'
		},
		{
			comment: 'Password capitalisation',
			user: 'standard_user',
			password: 'Secret_sauce',
			error: 'Epic sadface: Username and password do not match any user in this service'
		},
		{
			comment: 'Username special characters',
			user: 'standard_user&',
			password: 'Secret_sauce',
			error: 'Epic sadface: Username and password do not match any user in this service'
		},
		{
			comment: 'Password special characters',
			user: 'standard_user',
			password: 'Secret_sauce&',
			error: 'Epic sadface: Username and password do not match any user in this service'
		},
		{
			comment: 'Username SQL injection',
			user: "' OR '1'='1",
			password: 'Secret_sauce',
			error: 'Epic sadface: Username and password do not match any user in this service'
		},
		{
			comment: 'Password SQL injection',
			user: 'standard_user',
			password: "' OR '1'='1",
			error: 'Epic sadface: Username and password do not match any user in this service'
		}
	];

	errorTestCases.forEach((testCase) => {
		it(`Login failure test for ${testCase.comment}`, () => {
			LoginPage.enterUsername(processString(testCase.user));
			LoginPage.enterPassword(processString(testCase.password));
			LoginPage.clickSubmit();
			LoginPage.assertError(testCase.error);
		});
	});
});
