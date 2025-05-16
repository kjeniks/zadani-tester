import { Domain, User } from '../constants/types'
import { URLS } from '../constants/urls'

const currentDomain: Domain = Cypress.env('DOMAIN')

export class LoginPage {
  // Elementy by měli mít specifické selectory "data-testid" které budou unikátní pro každý element
  // a budou se používat pro testování. Například: data-testid="contact-form-name"
  // a pak se budou používat v testech jako cy.get('[data-testid="contact-form-name"]')
  // nebo cy.testId('contact-form-name') pokud použijeme helper funkci pro data-testid

  el = {
    tryoutContainer: '.trial__wrapper',
    input: 'input.el-input__inner',
    submitTry: 'button.try',
    submitTry2: 'signUp.v2.try_free',
  }

  open() {
    cy.visit(URLS.LOGIN[currentDomain])
  }

  fillEmailTryout(email: string) {
    cy.intercept('GET', '/api/invoices/new').as('waitForNewInvoice')
    cy.get(this.el.tryoutContainer).within(() => {
      cy.get(this.el.input).type(email + '{enter}')
    })
    cy.wait('@waitForNewInvoice', { timeout: 60000 })
  }

  loginUser(user: User) {
    cy.intercept('GET', '/api/invoices/new').as('waitForNewInvoice')
    cy.dataAnalytics('signIn.v2.login').click()
    cy.get('.get-login__wrapper').within(() => {
      cy.get('#email').type(user.mail)
      cy.get('#current-password').type(user.password)
      cy.dataAnalytics('button.login').click()
      cy.wait('@waitForNewInvoice', { timeout: 60000 })
    })
  }
}
