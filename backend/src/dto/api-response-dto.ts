import { Field, ObjectType } from '@nestjs/graphql';
import dayjs from 'dayjs';

@ObjectType()
export class ApiResponse<T = unknown> {
  @Field({ nullable: true })
  data: T | null;

  @Field()
  message: string;

  @Field()
  success: boolean;

  @Field()
  timestamp: string;

  @Field()
  requestId: string;

  constructor(partial: Partial<ApiResponse<T>>) {
    Object.assign(this, {
      timestamp: dayjs().toISOString(),
      requestId: crypto.randomUUID(),
      ...partial,
    });
  }
}
