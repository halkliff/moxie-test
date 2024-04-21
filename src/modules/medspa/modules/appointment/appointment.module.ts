import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller.js';
import { AppointmentService } from './appointment.service.js';
import { ServiceModule } from '../service/service.module.js';

@Module({
  imports: [ServiceModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
