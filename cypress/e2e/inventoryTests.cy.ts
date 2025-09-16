import loginPage from "../pages/LoginPage";
import inventoryPage from "../pages/InventoryPage";

describe("Inventory Page Tests", () => {
  beforeEach(() => {
    // Always login before each test
    loginPage.visit();
    loginPage.login("standard_user", "secret_sauce");
    inventoryPage.verifyOnPage();
  });

  it("✅ should add two products to cart", () => {
    inventoryPage.addBackpack();
    inventoryPage.addBikeLight();

    // implicit assertion
    inventoryPage.getCartBadge().should("have.text", "2");

    // explicit assertion
    inventoryPage
      .getCartBadge()
      .invoke("text")
      .then((cartCount: any) => {
        expect(cartCount).to.equal("2");
      });
  });
});
