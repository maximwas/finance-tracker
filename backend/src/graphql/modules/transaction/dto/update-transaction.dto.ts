import { InputType, PartialType, PickType } from '@nestjs/graphql';

import { CreateTransactionDto } from './create-transaction.dto';

@InputType()
export class UpdateTransactionDto extends PartialType(
  PickType(CreateTransactionDto, ['amount', 'description', 'date'] as const),
) {}
