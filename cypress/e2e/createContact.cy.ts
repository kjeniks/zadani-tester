  import { faker } from '@faker-js/faker';
import { ContactPage } from '../pages/ContactsPage';
import { LoginPage } from '../pages/LoginPage';

describe('Contact creation', () => {
  const loginPage = new LoginPage();  
  const contacts = new ContactPage();
  const domain = Cypress.env('DOMAIN') 
  const hostUser = faker.internet.email().toLowerCase();
  let data: any;
  
    beforeEach(() => { 
      cy.log(domain)     
      loginPage.open();
      loginPage.fillEmailTryout(hostUser);
      cy.fixture(`testData.${domain}.json`).then((fixtureData) => {
        data = fixtureData;
      });
    });
  
    it('creates a contact', function () {
      contacts.open('new');      
      contacts.fillForm(data.createContact);
      contacts.saveNewContact();
  
      
    });

    /*
    Každý test by měl mít cleanup, aby se odstranily vytvořené kontakty
    afterEach(() => {
        api.deleteCreatedContact(data.createContact.name);})
    */ 
  });
  
  
 

  