import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { MedSpaModule } from './modules/medspa/medspa.module.js';
import { CoreModule } from './core/core.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
    MedSpaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
