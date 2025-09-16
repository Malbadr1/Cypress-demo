class CartPage {
  private cartIcon: string = ".shopping_cart_link";
  private checkoutBtn: string = '[data-test="checkout"]';

  openCart(): void {
    cy.get(this.cartIcon).click();
  }

  checkout(): void {
    cy.get(this.checkoutBtn).click();
  }
}
export default new CartPage();
