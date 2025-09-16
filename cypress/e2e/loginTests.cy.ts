import loginPage from "../pages/LoginPage";

describe("Login Page Tests", () => {
  it("✅ should login successfully with valid credentials", () => {
    loginPage.visit();
    loginPage.login("standard_user", "secret_sauce");

    cy.url().should("include", "/inventory");
  });

  it("❌ should show error with wrong credentials", () => {
    loginPage.visit();
    loginPage.login("wrong_user", "wrong_pass");

    loginPage
      .getError()
      .should("be.visible")
      .and("contain", "Username and password do not match");
  });

  it("🚫 should show locked out message", () => {
    loginPage.visit();
    loginPage.login("locked_out_user", "secret_sauce");

    loginPage
      .getError()
      .should("be.visible")
      .and("contain", "Sorry, this user has been locked out");
  });
});
