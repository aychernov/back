import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { VALID_COUNTRY_CODES } from '../constants/country-codes';

@ValidatorConstraint({ async: false })
export class IsCountryCodeConstraint implements ValidatorConstraintInterface {
  validate(code: any) {
    if (typeof code !== 'string') return false;
    return VALID_COUNTRY_CODES.includes(code.toLowerCase());
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid ISO 3166-1 alpha-2 country code`;
  }
}

export function IsCountryCode(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCountryCodeConstraint,
    });
  };
}
