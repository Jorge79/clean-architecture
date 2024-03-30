import ValidatorInterface from "../../@shared/validator/validador.interface";
import Customer from "../entity/customer";
import CustomerYupValidator from "../validator/customer.yup.validator";

export default class CustomerValidatorFactory {
  static create(): ValidatorInterface<Customer> {
    return new CustomerYupValidator();
  }
}