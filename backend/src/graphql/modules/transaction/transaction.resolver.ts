import { UseGuards, UseInterceptors } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Transaction, type User } from '@prisma/client';
import { GqlAuthGuard } from 'src/api/modules/auth/guard/gql-auth.guard';
import { GqlResponseInterceptor } from 'src/graphql/interceptor/gql-response-interceptor';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FilterTransactionDto } from './dto/filter-transaction';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import {
  TransactionDeletePayload,
  TransactionPayload,
  TransactionsPayload,
} from './transaction.payload';
import { TransactionService } from './transaction.service';
import { GqlCurrentUser } from '../user/decorator/user.decorator';

@Resolver()
export class TransactionResolver {
  constructor(private readonly transactionService: TransactionService) {}

  @UseGuards(GqlAuthGuard)
  @UseInterceptors(
    new GqlResponseInterceptor<Transaction[], TransactionsPayload>(
      'transactions',
      'Transactions fetched successfully',
    ),
  )
  @Query(() => TransactionsPayload)
  getTransactionsByFilter(
    @Args('filter') filter: FilterTransactionDto,
    @GqlCurrentUser() user: User,
  ): Promise<Transaction[]> {
    return this.transactionService.getByFilter(user.id, filter);
  }

  @UseGuards(GqlAuthGuard)
  @UseInterceptors(
    new GqlResponseInterceptor<Transaction, TransactionPayload>(
      'transaction',
      'Transaction created successfully',
    ),
  )
  @Mutation(() => TransactionPayload)
  createTransaction(
    @Args('input') input: CreateTransactionDto,
    @GqlCurrentUser() user: User,
  ): Promise<Transaction> {
    return this.transactionService.create(input, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @UseInterceptors(
    new GqlResponseInterceptor<string, TransactionDeletePayload>(
      'transactionId',
      'Transaction deleted successfully',
    ),
  )
  @Mutation(() => TransactionDeletePayload)
  deleteTransaction(@Args('id') id: string): Promise<string> {
    return this.transactionService.deleteById(id);
  }

  @UseGuards(GqlAuthGuard)
  @UseInterceptors(
    new GqlResponseInterceptor<Transaction, TransactionPayload>(
      'transaction',
      'Transaction updated successfully',
    ),
  )
  @Mutation(() => TransactionPayload)
  updateTransaction(
    @Args('id') id: string,
    @Args('data') data: UpdateTransactionDto,
  ): Promise<Transaction> {
    return this.transactionService.updateById(id, data);
  }
}
