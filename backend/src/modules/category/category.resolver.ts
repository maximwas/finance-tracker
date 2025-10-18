import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import type { User } from '@prisma/client';

import { CategoryModel } from './category.models';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GqlAuthGuard } from '../auth/guard/gql-auth.guard';
import { GqlCurrentUser } from '../user/decorator/user.decorator';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => CategoryModel)
  getCategoryById(@Args('id') id: string): Promise<CategoryModel> {
    return this.categoryService.findById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [CategoryModel])
  getCategoriesByName(
    @Args('name') name: string,
    @GqlCurrentUser() user: User,
  ): Promise<CategoryModel[]> {
    return this.categoryService.findManyByNameAndUserId(name, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CategoryModel)
  createCategory(
    @Args('createCategoryDto') createCategoryDto: CreateCategoryDto,
    @GqlCurrentUser() user: User,
  ): Promise<CategoryModel> {
    return this.categoryService.create(createCategoryDto, user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CategoryModel)
  deleteById(@Args('id') id: string): Promise<CategoryModel> {
    return this.categoryService.deleteById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CategoryModel)
  updateById(
    @Args('id') id: string,
    @Args('data') data: UpdateCategoryDto,
  ): Promise<CategoryModel> {
    return this.categoryService.updateById(id, data);
  }
}
