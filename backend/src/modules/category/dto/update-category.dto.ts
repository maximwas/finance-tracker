import { Field, InputType } from '@nestjs/graphql';
import { IsHexColor, IsNotEmpty, Length, MaxLength } from 'class-validator';

@InputType()
export class UpdateCategoryDto {
  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @Length(3, 128, {
    message: 'The name must contain between 3 and 128 characters',
  })
  name?: string;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsHexColor()
  color?: string;
}
