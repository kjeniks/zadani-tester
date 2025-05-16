import { ContactPage } from '../pages/ContactsPage'
import { ContactFormData, User } from '../constants/types'
import * as api from '../support/apiHelper'
import { URLS } from '../constants/urls'

const testUser: User = {
  mail: Cypress.env('USER_MAIL'),
  password: Cypress.env('USER_PASS'),
}
let data: any, contactID: string
const domain = Cypress.env('DOMAIN')
const newData: ContactFormData = {
  name: undefined,
  email: undefined,
  id: undefined,
  dic: undefined,
  vat: undefined,
  tel: undefined,
  web: 'www.seznam.cz',
  street: undefined,
  city: undefined,
  zip: undefined,
  country: undefined,
}

describe('test', () => {
  const contacts = new ContactPage()

  beforeEach(() => {
    cy.login(testUser)
    cy.fixture(`testData.${domain}.json`).then(fixtureData => {
      data = fixtureData
    })
  })

  after(()=>{
    api.deleteContactApi(contactID)
  })

  it('text', () => {
    contacts.open()
    api.createContactApi(data.createContact).then(resp => {
      contactID = resp.body.contact_id
        contacts.open(contactID)
      contacts.fillForm(newData)
      contacts.saveEditContact(contactID)      
    })
  })
})
