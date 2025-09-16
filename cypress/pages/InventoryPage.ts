class InventoryPage {
  private productsTitle: string = "Products";
  private backpackBtn: string = '[data-test="add-to-cart-sauce-labs-backpack"]';
  private bikeLightBtn: string =
    '[data-test="add-to-cart-sauce-labs-bike-light"]';
  private cartBadge: string = ".shopping_cart_badge";

  verifyOnPage(): void {
    cy.contains(this.productsTitle).should("be.visible");
  }

  addBackpack(): void {
    cy.get(this.backpackBtn).click();
  }

  addBikeLight(): void {
    cy.get(this.bikeLightBtn).click();
  }

  getCartBadge() {
    return cy.get(this.cartBadge);
  }
}

export default new InventoryPage();
