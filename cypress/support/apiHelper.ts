import { ContactFormData } from '../constants/types'
import { getApiAuthorization } from './helpers'

export function createContactApi(contact: ContactFormData) {
  return cy.request({
    method: 'POST',
    url: `/api/contacts`,
    headers: { Cookie: getApiAuthorization() },
    body: {
      contact: {
        city: contact.city || null,
        company_number: contact.id || null,
        country_code: 'CZ',
        email: contact.city || null,
        id: null,
        name: contact.name || null,
        phone: contact.tel || null,
        postcode: contact.zip || null,
        street: contact.street || null,
        subdivision: null,
        tax_number: contact.vat || null,
        vat_number: contact.vat_number || null,
        web: contact.web || null,
      },
    },
  })
}

export function deleteContactApi(id:string){
return cy.request({
    method: 'DELETE',
    url: `/api/contacts/${id}`,
    headers: { Cookie: getApiAuthorization() },    
  })
}