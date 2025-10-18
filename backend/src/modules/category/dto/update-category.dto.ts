import { Field, InputType } from '@nestjs/graphql';
import { IsHexColor, MaxLength } from 'class-validator';

@InputType()
export class UpdateCategoryDto {
  @Field(() => String, { nullable: true })
  @MaxLength(128, {
    message: 'The name must contain at most 128 characters',
  })
  name?: string;

  @Field(() => String, { nullable: true })
  @IsHexColor()
  color?: string;
}
