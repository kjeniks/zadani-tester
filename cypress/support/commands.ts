import { Domain, User } from '../constants/types'
import { URLS } from '../constants/urls'
import { LoginPage } from '../pages/LoginPage'

const currentDomain: Domain = (process.env.DOMAIN as Domain) || 'cz'
const loginPage = new LoginPage()

Cypress.Commands.add('loginAsHost', email => {
  cy.visit(URLS.LOGIN[currentDomain])
})

Cypress.Commands.add('dataAnalytics', (selector: string) => {
  cy.get(`[data-analytics-id="${selector}"]`)
})

Cypress.Commands.add('login', (user: User) => {
  cy.visit(URLS.LOGIN[currentDomain])
  loginPage.loginUser(user)
})
