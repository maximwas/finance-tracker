import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignupDto {
  @IsEmail(
    {},
    {
      message: 'Email must be an email',
    },
  )
  email: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password must be at least 8 characters long',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/[0-9]/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/[^A-Za-z0-9]/, {
    message: 'Password must contain at least one special character',
  })
  password: string;

  @IsNotEmpty()
  @MaxLength(128, {
    message: 'First name must be at least 128 characters long',
  })
  firstName: string;

  @IsNotEmpty()
  @MaxLength(128, {
    message: 'Last name must be at least 128 characters long',
  })
  lastName: string;

  @IsNotEmpty()
  @IsString()
  currency: string;
}
