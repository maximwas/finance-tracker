import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Prisma, Transaction } from '@prisma/client';

@ObjectType()
export class TransactionModel implements Transaction {
  @Field(() => String)
  id: string;

  @Field(() => Float)
  amount: Prisma.Decimal;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  categoryId: string;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  createdAt: Date;
}
