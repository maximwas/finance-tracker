import { Module } from '@nestjs/common';

import { CornService } from './corn.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [CornService],
})
export class CornModule {}
