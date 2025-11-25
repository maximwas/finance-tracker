import { Field, ObjectType } from '@nestjs/graphql';

import { Payload } from '@backend/common/dto/payload.dto';

import { TransactionModel } from './transaction.model';

@ObjectType()
export class TransactionPayload extends Payload {
  @Field(() => TransactionModel, { nullable: true })
  transaction?: TransactionModel | null;
}

@ObjectType()
export class TransactionsPayload extends Payload {
  @Field(() => [TransactionModel], { nullable: true })
  transactions?: TransactionModel[] | null;
}

@ObjectType()
export class TransactionDeletePayload extends Payload {
  @Field(() => String, { nullable: true })
  transactionId?: string | null;
}
