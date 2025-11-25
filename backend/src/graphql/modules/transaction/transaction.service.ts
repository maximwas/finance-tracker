import { Injectable } from '@nestjs/common';
import { Prisma, Transaction } from '@prisma/client';

import { PrismaService } from '@backend/common/modules/prisma/prisma.service';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FilterTransactionDto, OrderDirection } from './dto/filter-transaction';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  public async create(
    data: CreateTransactionDto,
    userId: string,
  ): Promise<Transaction> {
    const transaction = this.prisma.transaction.create({
      data: {
        ...data,
        userId,
      },
    });

    return transaction;
  }

  public async getByFilter(
    userId: string,
    filter?: FilterTransactionDto,
  ): Promise<Transaction[]> {
    const transactions = await this.findAll(userId, filter);

    return transactions;
  }

  public async findAll(
    userId: string,
    filter?: FilterTransactionDto,
  ): Promise<Transaction[]> {
    const where = this.buildWhere(userId, filter);
    const orderBy = this.buildOrderBy(filter);

    return this.prisma.transaction.findMany({
      where,
      include: { category: true },
      orderBy,
    });
  }

  public async updateById(
    id: string,
    data: UpdateTransactionDto,
  ): Promise<Transaction> {
    const transaction = await this.prisma.transaction.update({
      where: {
        id,
      },
      data,
    });

    return transaction;
  }

  public async deleteById(id: string): Promise<string> {
    const transaction = await this.prisma.transaction.delete({
      where: {
        id,
      },
    });

    return transaction.id;
  }

  private buildWhere(
    userId: string,
    filter?: FilterTransactionDto,
  ): Prisma.TransactionWhereInput {
    if (!filter) return { userId };

    const { categoryId, categoryType, minAmount, maxAmount, dateFrom, dateTo } =
      filter;

    return {
      userId,
      ...(categoryId && { categoryId }),
      ...(categoryType && { category: { type: categoryType } }),
      ...(minAmount && { amount: { gte: minAmount } }),
      ...(maxAmount && { amount: { lte: maxAmount } }),
      ...(dateFrom && { date: { gte: dateFrom } }),
      ...(dateTo && { date: { lte: dateTo } }),
    };
  }

  private buildOrderBy(
    filter?: FilterTransactionDto,
  ): Prisma.TransactionOrderByWithRelationInput {
    if (!filter || !filter.orderBy) {
      return { date: OrderDirection.DESC };
    }

    return {
      [filter.orderBy]: filter.orderDirection || OrderDirection.DESC,
    };
  }
}
