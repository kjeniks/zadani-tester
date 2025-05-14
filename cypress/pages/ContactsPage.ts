import { ContactFormData, Domain } from "../constants/types";
import { URLS } from "../constants/urls";

const currentDomain: Domain = Cypress.env('DOMAIN') 

export class ContactPage {

  // Elementy by měli mít specifické selectory "data-testid" které budou unikátní pro každý element
  // a budou se používat pro testování. Například: data-testid="contact-form-name" 
  // a pak se budou používat v testech jako cy.get('[data-testid="contact-form-name"]')
  // nebo cy.testId('contact-form-name') pokud použijeme helper funkci pro data-testid

  el = { 
    form: {
      name: '[name="invoice_attributes_name"]',
      id: '[name="company_number"]',
      dic: '[name="tax_number"]',
      tel: 'input[type="tel"]',
      email: '[name="email"]',
      web: '[name="web"]',
      street: '[name="street"]',
      city: '[name="city"]',
      zip: '[name="postcode"]',
      country: '[name="contact_address_country_code"]',
      teritorial: '[name="contact_address_subdivision"]',
      vat_number: '[name="vat_number"]'

    },
    submitForm: 'contacts.buttons.save'
  }

    open(params?: string) {
      cy.visit(`${URLS.CONTACTS[currentDomain]}/${params}`);
    }
  
    fillForm(data: ContactFormData) {
      cy.intercept('POST', '/api/contacts').as('waitForContact');
      cy.get(this.el.form.name).clear().type(data.name);
      cy.get(this.el.form.id).clear().type(data.id);
      cy.get(this.el.form.email).clear().type(data.email);
      cy.get(this.el.form.dic).clear().type(data.dic);
      cy.get(this.el.form.tel).clear().type(data.tel);
      cy.get(this.el.form.web).clear().type(data.web);
      currentDomain === 'sk' && cy.get(this.el.form.vat_number).clear().type(data.vat_number);
      currentDomain === 'com' && cy.get(this.el.form.teritorial).clear().type(data.teritorial);
      cy.get(this.el.form.street).clear().type(data.street);
      cy.get(this.el.form.city).clear().type(data.city);
      cy.get(this.el.form.zip).clear().type(data.zip);
      cy.get(this.el.form.country).first().clear().type(data.country+'{enter}');
    }
  
    saveNewContact() {
      cy.intercept('POST', '/api/contacts').as('waitForContact');
      cy.dataAnalytics(this.el.submitForm).click();
      cy.wait('@waitForContact').its('response.statusCode').should('eq', 201);
    
    }
  }
  
  
  