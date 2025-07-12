import { IsString, Length } from 'class-validator';
import { IsCountryCode } from '../../common/validators/is-country-code.validator';

export class IncrementCountryDto {
  @IsString()
  @Length(2, 2, { message: 'Country code must be exactly 2 characters' })
  @IsCountryCode({
    message: 'Country code must be a valid code',
  })
  countryCode: string;
}
