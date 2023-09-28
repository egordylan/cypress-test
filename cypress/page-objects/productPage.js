/// <reference types="cypress" />
import BasePage from './basePage'

class ProductPage extends BasePage {
    get pageTitle() {
        return cy.get('.title')
    }
    get burgerButton() {
        return cy.get('#react-burger-menu-btn')
    }
    get logOutMenueItem() {
        return cy.get('#logout_sidebar_link')
    }
    get inventory() {
        return cy.get('.inventory_item_name')
    }
    get addToCartButton() {
        return cy.get('.inventory_item')
    }
    get shoppingCart() {
        return cy.get('.shopping_cart_link')
    }
    get shoppingCartBadge() {
        return cy.get('.shopping_cart_badge')
    }
    get inventiryImage() {
        return cy.get('.inventory_item_img')
    }

    verifyPageLoaded(title) {
        this.pageTitle.should('have.text', title)
        return this
    }

    clickBurgerButton() {
        this.burgerButton.click()
        return this
    }

    clickLogOutMenueItem() {
        this.logOutMenueItem.click()
        return this
    }

    addToCart(product) {
        cy.get(`#add-to-cart-sauce-labs-${product}`).click()
        return this
    }

    addProductToCart(product) {
        this.inventory
            .contains(product)
            .parents('div')
            //.parent()
            //.parent()
            .find('button')
            .contains('Add to cart')
            .click()
        return this
    }

    verifyProductImageIsVisible(product) {
        this.inventory
            .contains(product)
            .parents('div')
            .find('img')
            .should('be.visible')
        return this
    }

    verifyShoppingCartBadgeIsVisible() {
        this.shoppingCartBadge.should('be.visible')
        return this
    }

    verifyShoppingCartBadgeIsNotVisible() {
        this.shoppingCartBadge.should('not.exist')
        return this
    }
    
    goToShopingCart() {
        this.shoppingCart.click()
        return this
    }
}

export default new ProductPage();
