import loginPage from "../pages/LoginPage";
import inventoryPage from "../pages/InventoryPage";
import cartPage from "../pages/CartPage";

describe("SauceDemo Login Tests (POM + TypeScript)", () => {
  it("✅ should login successfully with valid credentials", () => {
    loginPage.visit();
    loginPage.login("standard_user", "secret_sauce");

    cy.url().should("include", "/inventory");
    inventoryPage.verifyOnPage();

    inventoryPage.addBackpack();
    inventoryPage.addBikeLight();

    // 👇 Implicit assertion
    inventoryPage.getCartBadge().should("have.text", "2");

    // 👇 Explicit assertion
    inventoryPage
      .getCartBadge()
      .invoke("text")
      .then((cartCount) => {
        expect(cartCount).to.equal("2");
      });

    // Open cart page (اختياري)
    cartPage.openCart();
  });

  it("❌ should show error with wrong credentials", () => {
    loginPage.visit();
    loginPage.login("wrong_user", "wrong_pass");

    loginPage
      .getError()
      .should("be.visible")
      .and("contain", "Username and password do not match");

    loginPage
      .getError()
      .invoke("text")
      .then((errorText) => {
        assert.include(errorText, "Username and password do not match");
      });
  });

  it("🚫 should show locked out message for locked_out_user", () => {
    loginPage.visit();
    loginPage.login("locked_out_user", "secret_sauce");

    loginPage
      .getError()
      .should("be.visible")
      .and("contain", "Sorry, this user has been locked out");

    loginPage
      .getError()
      .invoke("text")
      .then((errorText) => {
        expect(errorText).to.contain("locked out");
      });
  });
});
