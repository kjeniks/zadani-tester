import { Domain } from "../constants/types";

  
export function currentDomain(): Domain {
    return Cypress.env('DOMAIN') || 'cz'
  }