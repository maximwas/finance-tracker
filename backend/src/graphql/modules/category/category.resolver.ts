import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import type { User } from '@prisma/client';

import { CategoryModel } from './category.models';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GqlAuthGuard } from '../../../api/modules/auth/guard/gql-auth.guard';
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
  @Query(() => [CategoryModel])
  getAllCategories(@GqlCurrentUser() user: User): Promise<CategoryModel[]> {
    return this.categoryService.getAll(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CategoryModel)
  createCategory(
    @Args('data') data: CreateCategoryDto,
    @GqlCurrentUser() user: User,
  ): Promise<CategoryModel> {
    return this.categoryService.create(data, user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CategoryModel)
  deleteCategoryById(@Args('id') id: string): Promise<CategoryModel> {
    return this.categoryService.deleteById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CategoryModel)
  updateCategoryById(
    @Args('id') id: string,
    @Args('data') data: UpdateCategoryDto,
  ): Promise<CategoryModel> {
    return this.categoryService.updateById(id, data);
  }
}
