import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma';

@Module({
  imports: [PrismaModule],
  providers: [],
  exports: [],
})
export class RepositoryModule {}
