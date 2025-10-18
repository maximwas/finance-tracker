import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Category } from '@prisma/client';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  public async create(
    data: CreateCategoryDto,
    userId: string,
  ): Promise<Category> {
    const currentCategory = await this.findFirstByNameAndUserId(
      data.name,
      userId,
    );

    if (currentCategory) {
      throw new ConflictException(
        `Category with name "${data.name}" already exists.`,
      );
    }

    const category = this.prisma.category.create({
      data: {
        ...data,
        userId,
      },
    });

    return category;
  }

  public async findById(id: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  public async findFirstByNameAndUserId(
    name: string,
    userId: string,
  ): Promise<Category | null> {
    const category = await this.prisma.category.findFirst({
      where: {
        name,
        userId,
      },
    });

    return category;
  }

  public async findManyByNameAndUserId(
    name: string,
    userId: string,
  ): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: {
        name,
        userId,
      },
    });

    if (!categories.length) {
      throw new NotFoundException(`Categories with name "${name}" not found.`);
    }

    return categories;
  }

  public async updateById(
    id: string,
    data: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.prisma.category.update({
      where: {
        id,
      },
      data,
    });

    return category;
  }

  public async deleteById(id: string): Promise<Category> {
    const category = await this.prisma.category.delete({
      where: {
        id,
      },
    });

    return category;
  }
}
