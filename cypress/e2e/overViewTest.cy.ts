import loginPage from "../pages/LoginPage";
import inventoryPage from "../pages/InventoryPage";
import cartPage from "../pages/CartPage";
import checkoutPage from "../pages/CheckoutPage";
import overviewPage from "../pages/OverViewPage";

describe("SauceDemo Overview Page Tests", () => {
  beforeEach(() => {
    // 🟢 Login and go through checkout flow
    loginPage.visit();
    loginPage.login("standard_user", "secret_sauce");

    inventoryPage.addBackpack();
    inventoryPage.addBikeLight();

    cartPage.openCart();
    cartPage.checkout();

    checkoutPage.fillYourInformation("Ali", "Hassan", "1030");
  });

  it("✅ should finish order successfully", () => {
    overviewPage.finishOrder();

    // assertion → should go to confirmation page
    cy.url().should("include", "/checkout-complete");
    cy.contains("Thank you for your order!").should("be.visible");
  });

  it("🚫 should allow cancel from overview page", () => {
    overviewPage.cancelOrder();

    // assertion → should go back to inventory
    cy.url().should("include", "/inventory");
  });
});
