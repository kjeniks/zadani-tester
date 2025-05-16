import { ContactFormData, Domain } from '../constants/types'
import { URLS } from '../constants/urls'

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
      vat_number: '[name="vat_number"]',
    },
    submitForm: 'contacts.buttons.save',
    tableOfContacts: '.el-table__body-wrapper'
  }

  open(params?: string) {
    cy.visit(`${URLS.CONTACTS[currentDomain]}${params ? '/' + params : ''}`)
  }

  fillForm(data: ContactFormData) {    
const fields = {
  name: this.el.form.name,
  id: this.el.form.id,
  email: this.el.form.email,
  dic: this.el.form.dic,
  tel: this.el.form.tel,
  web: this.el.form.web,
  vat_number: currentDomain === 'sk' ? this.el.form.vat_number : undefined,
  teritorial: currentDomain === 'com' ? this.el.form.teritorial : undefined,
  street: this.el.form.street,
  city: this.el.form.city,
  zip: this.el.form.zip,
  country: this.el.form.country,
};

Object.entries(fields).forEach(([key, selector]) => {
  const value = data[key as keyof ContactFormData];
  if (value !== undefined && selector) {
    if (key === 'country') {
      cy.get(selector).first().clear().type(value + '{enter}');
    } else {
      cy.get(selector).clear().type(value);
    }
  }
});
  }

  saveEditContact(id: string){
cy.intercept('PUT', `/api/contacts/${id}`).as('waitForUpdate')
cy.dataAnalytics(this.el.submitForm).click()
cy.wait('@waitForUpdate').its('response.statusCode').should('eq', 200)
cy.get(this.el.tableOfContacts).should('be.visible')
  }

  saveNewContact() {
    
    cy.intercept('POST', '/api/contacts').as('waitForContact')
    cy.dataAnalytics(this.el.submitForm).click()
    cy.wait('@waitForContact').its('response.statusCode').should('eq', 200)
    
  }
}
