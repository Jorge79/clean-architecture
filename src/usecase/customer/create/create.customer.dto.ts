export interface InputCreateCustomerDto {
  name: string,
  address: {
    street: string,
    number: number,
    zip: number,
    city: string,
  };
}

export interface OutputCreateCustomerDto {
  id: string,
  name: string,
  address: {
    street: string,
    number: number,
    zip: number,
    city: string,
  };
}