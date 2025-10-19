import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Category, CategoryType } from '@prisma/client';

registerEnumType(CategoryType, {
  name: 'CategoryType',
});

@ObjectType()
export class CategoryModel implements Category {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => CategoryType)
  type: CategoryType;

  @Field(() => String)
  color: string;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => String)
  userId: string;
}
