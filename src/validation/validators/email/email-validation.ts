import { InvalidFieldError } from "@/validation/errors";
import { FieldValidation } from "@/validation/protocols/field-validation";

export class EmailValidation implements FieldValidation {
  constructor (readonly field: string){}
  validate(field: string): Error {
    return new InvalidFieldError();
  }
}