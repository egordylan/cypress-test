/// <reference types="cypress" />
import BasePage from './basePage'

class CheckoutPage extends BasePage {
    get pageTitle() {
        return cy.get('.header_secondary_container')
    }
    get userFirstName() {
        return cy.get('#first-name')
    }
    get userLastName() {
        return cy.get('#last-name')
    }
    get userPostalCode() {
        return cy.get('#postal-code')
    }
    get continueButton() {
        return cy.get('#continue')
    }

    verifyPageLoaded(title) {
        this.pageTitle.should('have.text', title)
        return this
    }

    inputUserData(firstName, lastName, postalCode) {
        this.userFirstName.click().clear().type(firstName)
        this.userLastName.click().clear().type(lastName)
        this.userPostalCode.click().clear().type(postalCode)
        return this
    }

    clickContinueButton() {
        this.continueButton.click()
        return this
    }
}

export default new CheckoutPage();
