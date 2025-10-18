import { Field, InputType } from '@nestjs/graphql';
import { CategoryType } from '@prisma/client';
import { IsHexColor, MaxLength } from 'class-validator';

@InputType()
export class CreateCategoryDto {
  @Field(() => String)
  @MaxLength(128, {
    message: 'The name must contain at most 128 characters',
  })
  name: string;

  @Field(() => CategoryType)
  type: CategoryType;

  @Field(() => String)
  @IsHexColor()
  color: string;
}
