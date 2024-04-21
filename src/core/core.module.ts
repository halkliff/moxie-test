import { Global, Module } from '@nestjs/common';
import { PrismaServiceModule } from './services/prisma/prisma-service.module.js';

@Global()
@Module({
  imports: [PrismaServiceModule],
  exports: [PrismaServiceModule],
})
export class CoreModule {}
