/// <reference types="cypress" />
import BasePage from './basePage'

class CheckoutOverviewPage extends BasePage {
    get pageTitle() {
        return cy.get('.header_secondary_container')
    }
    get finishButton() {
        return cy.get('#finish')
    }
    get summaryInfoLabel() {
        return cy.get('.summary_info_label')
    }
    get inventoryItem() {
        return cy.get('.inventory_item_name')
    }
    get taxInformation() {
        return cy.get('.summary_tax_label')
    }
    get inventoryPrice() {
        return cy.get('.inventory_item_price')
    }
    get totalPrice() {
        return cy.get('.summary_info_label.summary_total_label')
    }

    verifyPageLoaded(title) {
        this.pageTitle.should('have.text', title)
        return this
    }

    verifySummaryLabelIsPresented(labels) {
        let data = new Array()
        this.summaryInfoLabel.each(($el) => {
            data.push($el.text().split(':')[0])
        })
        cy.wrap([data, labels]).then(($el) => {
            expect(data).to.deep.equal(labels)
        })
        return this
    }

    clickFinishButton() {
        this.finishButton.click()
        return this
    }

    getInventoryPrice() {
        let data = new Array()
        this.inventoryPrice.then(($el) => {
            data.push($el.text().split('$')[1])
        })
        return data
    }

    getTaxPrice() {
        let data = new Array()
        this.taxInformation.then(($el) => {
            data.push($el.text().split('$')[1])
        })
        return data
    }

    getTotalPrice() {
        let data = new Array()
        this.totalPrice.then(($el) => {
            data.push($el.text().split('$')[1])
        })
        return data
    }

    verifyTotalPrice() {
        const tax = this.getTaxPrice()
        const inventoryPr = this.getInventoryPrice()
        const totalPriceSum = Number(tax[0]) + Number(inventoryPr[0])
        const totalPrice = this.getTotalPrice()
        cy.wrap([tax, inventoryPr, totalPrice]).then(($el) => {
            const totalPriceSum = Number(tax[0]) + Number(inventoryPr[0])
            expect(totalPriceSum).to.be.eq(Number(totalPrice[0]))
        })
        return this
    }
    
    verifyProductInCheckoutOverview(product) {
        this.inventoryItem.should('have.text', product)
        return this
    }
}

export default new CheckoutOverviewPage();
