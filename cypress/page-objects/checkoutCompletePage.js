/// <reference types="cypress" />
import BasePage from './basePage'

class CheckoutCompletewPage extends BasePage {
    get pageTitle() {
        return cy.get('.header_secondary_container')
    }
    get completePicture() {
        return cy.get('.pony_express')
    }
    get completeHeader() {
        return cy.get('.complete-header')
    }
    get completeText() {
        return cy.get('.complete-text')
    }
    get backToProductsButton() {
        return cy.get('#back-to-products')
    }

    clickBackToProductButton() {
        this.backToProductsButton.click()
        return this
    }

    verifyPageLoaded(title) {
        this.pageTitle.should('have.text', title)
        return this
    }

    verifyCompletePictireIsVisible() {
        this.completePicture.should('be.visible')
        return this
    }
    verifyCompleteHeaderIsVisible() {
        this.completeHeader.should('be.visible')
        return this
    }
    
    verifyCompleteText(text) {
        let complText
        this.completeText.then(($el) => {
            complText = $el.text()
        })
        cy.wrap(complText).then(() => {
            expect(complText).to.be.eq(text)
        })
        return this
    }
}

export default new CheckoutCompletewPage();
