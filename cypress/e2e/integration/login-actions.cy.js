/// <reference types="cypress" />
import loginPage from "../../page-objects/loginPage"
import productPage from "../../page-objects/productPage"

describe('Saucedemo App e2e test', () => {
	beforeEach(() => {
		loginPage.navigate()
	});

	it('should not login to the page with invalid credentials', () => {
		loginPage.login('standard_user', 'invalidPassword1')
		loginPage.validateErrorLogin('Epic sadface: Username and password do not match any user in this service')
	})

	it('should not login to the page for the blocked user', () => {
		cy.fixture('invalidLogin').then(data => {
			loginPage.login(data[0].login, data[0].password)
		})
		loginPage.validateErrorLogin('Epic sadface: Sorry, this user has been locked out.')
	})

	it('should login to the page with valid credentials', () => {
		loginPage.login('standard_user', 'secret_sauce')
		loginPage.validateSucessfullLogin('Products')
		productPage
			.clickBurgerButton()
			.clickLogOutMenueItem()
		loginPage.validateSucessfullLogout()
		cy.fixture('login').then(data => {
			for(let i = 0; i < data.length; i++) {
				loginPage.login(data[i].login, data[i].password)
				loginPage.validateSucessfullLogin('Products')
				productPage
					.clickBurgerButton()
					.clickLogOutMenueItem()
				loginPage.validateSucessfullLogout()
			}
		})
	})
})
