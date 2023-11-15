export interface Address{
    id: number,
    country : string,
    city : string,
    street : string,
    number : string;
    zipCode : string
}

export const createEmptyAddress = (): Address => ({
    id: 0,
    country: '',
    city: '',
    street: '',
    number: '',
    zipCode: '',
  });