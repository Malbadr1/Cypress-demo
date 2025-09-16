import loginPage from "../pages/LoginPage";
import inventoryPage from "../pages/InventoryPage";
import cartPage from "../pages/CartPage";

describe("Cart Page Tests", () => {
  beforeEach(() => {
    loginPage.visit();
    loginPage.login("standard_user", "secret_sauce");
    inventoryPage.addBackpack();
    inventoryPage.addBikeLight();
  });

  it("✅ should open cart and go to checkout", () => {
    cartPage.openCart();

    cy.url().should("include", "/cart"); // implicit assertion

    cartPage.checkout();
    cy.url().should("include", "/checkout"); // implicit assertion
  });
});
