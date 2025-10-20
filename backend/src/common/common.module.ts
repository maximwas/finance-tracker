import { Module } from '@nestjs/common';

import { ConfigModule } from './modules/config/config.module';
import { CornModule } from './modules/corn/corn.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [ConfigModule, PrismaModule, CornModule],
})
export class CommonModule {}
