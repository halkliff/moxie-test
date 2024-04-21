import { Module } from '@nestjs/common';
import { AppointmentModule } from './modules/appointment/appointment.module.js';
import { MedSpaController } from './medspa.controller.js';
import { MedSpaService } from './medspa.service.js';
import { ServiceModule } from './modules/service/service.module.js';

@Module({
  imports: [AppointmentModule, ServiceModule],
  controllers: [MedSpaController],
  providers: [MedSpaService],
  exports: [AppointmentModule],
})
export class MedSpaModule {}
