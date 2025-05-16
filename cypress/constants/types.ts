export interface ContactFormData {
  name: string
  email: string
  id: string
  dic: string
  vat: string
  tel: string
  web: string
  street: string
  city: string
  zip: string
  country: string
  teritorial?: string
  vat_number?: string
}

export type Domain = 'cz' | 'com' | 'sk'

export type User = {
  mail: string
  password: string
}
