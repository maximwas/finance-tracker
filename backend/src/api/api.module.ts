import { Module } from '@nestjs/common';
import { UserModule } from 'src/graphql/modules/user/user.module';

import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  exports: [AuthModule],
})
export class ApiModule {}
