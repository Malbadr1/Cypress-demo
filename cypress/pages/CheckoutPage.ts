class CheckoutPage{


    private first_name : string = '[data-test="firstName"]'
    private last_name : string = '[data-test="lastName"]'
    private zip_postalCode :string = '[data-test="postalCode"]'
    private continue_button :string = '[data-test="continue"]'
    private cancel_button : string = '[data-test="cancel"]'
    private errorMsg: string = '[data-test="error"]';

   fillYourInformation(first_name: string, last_name: string, zip_postalCode: string) {
  if (first_name) {
    cy.get(this.first_name).type(first_name);
  }
  if (last_name) {
    cy.get(this.last_name).type(last_name);
  }
  if (zip_postalCode) {
    cy.get(this.zip_postalCode).type(zip_postalCode);
  }
  cy.get(this.continue_button).click();
}


    cancelPage(){
        cy.get(this.cancel_button).click()
    }
     getError() {
    return cy.get(this.errorMsg);
  }
  
}
export default new CheckoutPage();