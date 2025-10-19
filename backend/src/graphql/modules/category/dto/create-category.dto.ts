import { Field, InputType } from '@nestjs/graphql';
import { CategoryType } from '@prisma/client';
import { IsHexColor, IsNotEmpty, Length } from 'class-validator';

@InputType()
export class CreateCategoryDto {
  @Field(() => String)
  @IsNotEmpty()
  @Length(3, 128, {
    message: 'The name must contain between 3 and 128 characters',
  })
  name: string;

  @Field(() => CategoryType)
  @IsNotEmpty()
  type: CategoryType;

  @Field(() => String)
  @IsHexColor()
  @IsNotEmpty()
  color: string;
}
