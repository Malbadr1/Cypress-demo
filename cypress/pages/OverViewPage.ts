class OverViewPage{


    private finish_Button : string = '[data-test="finish"]'
    private cancel_Button : string = '[data-test="cancel"]'


    finishOrder(){
  cy.get(this.finish_Button).click()
    }

    cancelOrder(){
        cy.get(this.cancel_Button).click()
    }
}

export default new OverViewPage();