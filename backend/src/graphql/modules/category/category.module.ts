import { Module } from '@nestjs/common';

import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { AuthModule } from '../../../api/modules/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
