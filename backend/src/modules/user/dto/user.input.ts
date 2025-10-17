import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, Matches, MinLength } from 'class-validator';

@InputType()
export class UserInputDto {
  @Field(() => String)
  id: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String)
  @MinLength(12, {
    message: 'Password must be at least 12 characters long',
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

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}
