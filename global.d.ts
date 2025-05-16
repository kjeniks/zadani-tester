/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    loginAsHost(email: string): Chainable<Element>
    dataAnalytics(selector: string): Chainable<Element>
    clickIfExists(selector: string): Chainable<Element>
    login(user: any): Chainable<Element>
  }
}
