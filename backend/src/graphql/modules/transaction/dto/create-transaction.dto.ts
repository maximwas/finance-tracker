import { Field, InputType } from '@nestjs/graphql';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  Length,
  Min,
} from 'class-validator';

@InputType()
export class CreateTransactionDto {
  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    {
      message: 'Amount must be a decimal number with at most 2 decimal places',
    },
  )
  @IsPositive()
  @Min(0)
  amount: number;

  @Field(() => String, { nullable: true })
  @IsNotEmpty()
  @IsOptional()
  @Length(3, 255, {
    message: 'Description must be between 3 and 255 characters long',
  })
  description?: string | null;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate({ message: 'Date must be a valid date' })
  date: Date;

  @Field(() => String)
  @IsNotEmpty()
  categoryId: string;
}
