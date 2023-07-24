import { ICountryObject } from 'src/common/constants';

export interface IContactPhoneNumber {
  phoneNumber: string;
  type: string;
  isVerified: boolean;
}

export interface IContactEmail {
  email: string;
  type: string;
  isVerified: boolean;
}

export interface IContactAddress {
  street: string;
  city: string;
  state: string;
  country: string | ICountryObject;
  zipCode: number | null;
}

export interface IContacts {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  phoneNumbers: IContactPhoneNumber[];
  emails: IContactEmail[];
  address: IContactAddress;
  rating: number;
  reference: string;
  websites?: string[];
  socialLinks?: string[];
  technologies?: any[];
  status: string;
  type: string;
  countries?: string[];
  createdBy?: any;
  updateBy?: any;
}
