import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress('John', new Address('Street', 123, 'Zip', 'City'))

const input = {
  id: customer.id,
  name: "John updated",
  address: {
    street: "Street updated",
    number: 1234,
    zip: "Zip updated",
    city: "City updated",
  },
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    update: jest.fn()
  }
}

describe("Unit test for customer update use case", () => {
  it("should create a customer", async () => {
    const customerRepository = MockRepository();
    const customerUpdateUsecase = new UpdateCustomerUseCase(customerRepository)
    
    const output = await customerUpdateUsecase.execute(input)
    
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zip: input.address.zip,
        city: input.address.city
      }
    })
  })
})