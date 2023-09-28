/// <reference types="cypress" />
import BasePage from './basePage'

class ShopingCart extends BasePage {
    get pageTitle() {
        return cy.get('.header_secondary_container')
    }
    get cartList() {
        return cy.get('.cart_list')
    }
    get inventoryItem() {
        return cy.get('.inventory_item_name')
    }
    get checkoutButton() {
        return cy.get('#checkout')
    }
    
    verifyPageLoaded(title) {
        this.pageTitle.should('have.text', title)
        return this
    }

    verifyProductInCart(product) {
        this.inventoryItem.should('have.text', product)
        return this
    }

    clickCheckoutButton() {
        this.checkoutButton.click()
        return this
    }
}

export default new ShopingCart();
