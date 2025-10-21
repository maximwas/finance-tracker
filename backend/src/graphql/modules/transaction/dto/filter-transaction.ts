import { Field, Float, InputType, registerEnumType } from '@nestjs/graphql';
import { CategoryType } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export enum OrderByField {
  DATE = 'date',
  AMOUNT = 'amount',
  CREATED_AT = 'createdAt',
}

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(OrderByField, { name: 'OrderByField' });
registerEnumType(OrderDirection, { name: 'OrderDirection' });

@InputType()
export class FilterTransactionDto {
  @Field(() => String, { nullable: true })
  @IsOptional()
  categoryId?: string | null;

  @Field(() => CategoryType, { nullable: true })
  @IsOptional()
  @IsEnum(CategoryType, { message: 'categoryType must be INCOME or EXPENSE' })
  categoryType?: CategoryType | null;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Min amount must be a number' })
  @IsPositive()
  @Min(0)
  minAmount?: number | null;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Max amount must be a number' })
  @IsPositive()
  @Min(0)
  maxAmount?: number | null;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate({ message: 'Date from must be a valid date' })
  dateFrom?: Date | null;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate({ message: 'Date to must be a valid date' })
  dateTo?: Date | null;

  @Field(() => OrderByField, { nullable: true })
  @IsOptional()
  @IsEnum(OrderByField, { message: 'Invalid order by field' })
  orderBy?: OrderByField | null;

  @Field(() => OrderDirection, { nullable: true })
  @IsOptional()
  @IsEnum(OrderDirection, { message: 'Invalid order direction' })
  orderDirection?: OrderDirection | null;
}
