import loginPage from "../pages/LoginPage";
import inventoryPage from "../pages/InventoryPage";
import cartPage from "../pages/CartPage";
import checkoutPage from "../pages/CheckoutPage";
import overviewPage from "../pages/OverViewPage";

describe("SauceDemo E2E Tests (POM + TypeScript)", () => {
  // 🟢 Login tests
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

    // Open cart page
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

  // 🟣 Checkout tests
  describe("Checkout Page Tests", () => {
    beforeEach(() => {
      // Setup flow: login → add items → go to cart → checkout
      loginPage.visit();
      loginPage.login("standard_user", "secret_sauce");
      inventoryPage.addBackpack();
      inventoryPage.addBikeLight();
      cartPage.openCart();
      cartPage.checkout();
    });

    it("✅ should continue checkout with valid data", () => {
      checkoutPage.fillYourInformation("Ali", "Hassan", "1030");
      cy.url().should("include", "/checkout-step-two");
    });

    it("❌ should show error when first name is missing", () => {
      checkoutPage.fillYourInformation("", "Albadr", "1030");
      checkoutPage.getError().should("be.visible");
      checkoutPage
        .getError()
        .should("contain.text", "Error: First Name is required");
    });

    it("🚫 should allow cancel checkout", () => {
      checkoutPage.cancelPage();
      cy.url().should("include", "/cart"); // cancel يرجع cart مو inventory
    });
  });

  // 🔵 Overview tests
  describe("Overview Page Tests", () => {
    beforeEach(() => {
      // Setup flow: login → add items → cart → checkout → fill info
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
      cy.url().should("include", "/checkout-complete");
      cy.contains("Thank you for your order!").should("be.visible");
    });

    it("🚫 should allow cancel from overview page", () => {
      overviewPage.cancelOrder();
      cy.url().should("include", "/inventory");
    });
  });
});
