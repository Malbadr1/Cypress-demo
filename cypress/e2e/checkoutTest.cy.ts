import loginPage from "../pages/LoginPage";
import inventoryPage from "../pages/InventoryPage";
import cartPage from "../pages/CartPage";
import checkoutPage from "../pages/CheckoutPage";

describe("Checkout Page Tests", () => {
  beforeEach(() => {
    loginPage.visit();
    loginPage.login("standard_user", "secret_sauce");
    inventoryPage.addBackpack();
    inventoryPage.addBikeLight();
    cartPage.openCart();
    cartPage.checkout();
  });

  it("✅ should continue checkout with valid data", () => {
    checkoutPage.fillYourInformation("Ali", "Hassan", "1030");

    // assertion -> should navigate to next step
    cy.url().should("include", "/checkout-step-two");
  });

it("❌ should show error when first name is missing", () => {
  checkoutPage.fillYourInformation("", "Albadr", "1030");

  checkoutPage.getError().should("be.visible");
  checkoutPage.getError().should("contain.text", "Error: First Name is required");
});


 it("🚫 should allow cancel checkout", () => {
  checkoutPage.cancelPage();
  cy.url().should("include", "/cart");
});

});
