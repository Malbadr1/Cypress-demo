class LoginPage {
  private user_name: string = '[data-test="username"]';
  private password: string = '[data-test="password"]';
  private login_Button: string = '[data-test="login-button"]';
  private errorMsg: string = '[data-test="error"]';

  visit(): void {
    cy.visit("/");
  }

  login(username: string, password: string): void {
    cy.get(this.user_name).type(username);
    cy.get(this.password).type(password);
    cy.get(this.login_Button).click();
  }

  getError() {
    return cy.get(this.errorMsg);
  }
}

export default new LoginPage();
