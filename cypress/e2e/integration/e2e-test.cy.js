/// <reference types="cypress" />
import checkoutCompletePage from "../../page-objects/checkoutCompletePage"
import checkoutOverviewPage from "../../page-objects/checkoutOverviewPage"
import checkoutPage from "../../page-objects/checkoutPage"
import loginPage from "../../page-objects/loginPage"
import productPage from "../../page-objects/productPage"
import shopingCart from "../../page-objects/shopingCart"


describe('Saucedemo App e2e test', () => {
	const labels = [
		'Payment Information', 
		'Shipping Information', 
		'Price Total', 
		'Total'
		]
	const completeText = 'Your order has been dispatched, and will arrive just as fast as the pony can get there!'

	beforeEach(() => {
		loginPage.navigate()
	})

	it('should successfully buy any goods', () => {
		//login to the page
		loginPage.login('standard_user', 'secret_sauce')
		loginPage.validateSucessfullLogin('Products')
		//add product to the cart
		productPage
			.verifyProductImageIsVisible('Sauce Labs Backpack')
			.addProductToCart('Sauce Labs Backpack')
			.verifyShoppingCartBadgeIsVisible()
			.goToShopingCart()
		//go to shopping cart
		shopingCart
			.verifyPageLoaded('Your Cart')
			.verifyProductInCart('Sauce Labs Backpack')
			.clickCheckoutButton()
		//go to checkout
		checkoutPage
			.verifyPageLoaded('Checkout: Your Information')
			.inputUserData('Souduou', 'Kaneki', '23-230')
			.clickContinueButton()
		//go to checkout overview page
		checkoutOverviewPage
			.verifyPageLoaded('Checkout: Overview')
			.verifyProductInCheckoutOverview('Sauce Labs Backpack')
			.verifySummaryLabelIsPresented(labels)
			.verifyTotalPrice()
			.clickFinishButton()
		//go to complete checkout page
		checkoutCompletePage
			.verifyPageLoaded('Checkout: Complete!')
			.verifyCompletePictireIsVisible()
			.verifyCompleteHeaderIsVisible()
			.verifyCompleteText(completeText)
			.clickBackToProductButton()
		productPage
			.verifyPageLoaded('Products')
			.verifyShoppingCartBadgeIsNotVisible()
	})

	afterEach('Postconditions', () => {
		productPage
			.clickBurgerButton()
			.clickLogOutMenueItem()
		loginPage.validateSucessfullLogout()
	})
})
