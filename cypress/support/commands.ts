import { Domain } from "../constants/types";
import { URLS } from "../constants/urls";


const currentDomain: Domain = (process.env.DOMAIN as Domain) || 'cz';

  Cypress.Commands.add('loginAsHost', (email) => {
    cy.visit(URLS.LOGIN[currentDomain])
  });


  Cypress.Commands.add('dataAnalytics', (selector: string) => {
    cy.get(`[data-analytics-id="${selector}"]`);
  })
