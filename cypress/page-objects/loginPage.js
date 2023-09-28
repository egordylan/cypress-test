/// <reference types="cypress" />
import BasePage from './basePage'

class LoginPage extends BasePage {
    // elements
    get errorMessage() {
        return cy.get('h3[data-test="error"]')
    }

    // actions
    navigate() {
        cy.visit('https://www.saucedemo.com/');
    }

    login(userName, password) {
        cy.get('#user-name').type(userName);
		cy.get('#password').type(password);
		cy.get('#login-button').click()
    }

    addUserData(firstName, secondName, zipCode) {
        cy.get('[data-test="firstName"]').type('Peter');
		cy.get('[data-test="lastName"]').type('Parker');
		cy.get('[data-test="postalCode"]').type('0001');
		cy.get('#continue').click();
    }

    clickButton() {
        cy.get('#checkout').click();
    }

    // validalions
    validateErrorLogin(expectedText) {
        this.errorMessage.should('have.text', expectedText);
        return this
    }

    validateSucessfullLogin(expectedText) {
        cy.get('span.title').should('have.text', expectedText);
    }

    validateSucessfullLogout() {
        cy.get('.login_logo').should('be.visible');
    }

    validateProductPage() {
        cy.get('span.title').should('have.text', 'Products');
    }
    
    validateCheckoutPage() {
        cy.get('span.title').should('have.text', 'Checkout: Overview');
    }
}

export default new LoginPage();
