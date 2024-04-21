import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import {
  asPagination,
  type Pagination,
} from '../../../../core/types/pagination.js';
import { AppointmentService } from './appointment.service.js';
import type { CreateAppointmentDTO } from './dtos/create-appointment.dto.js';
import { AppointmentStatus } from './types/appointment-status.enum.js';
import type { UpdateAppointmentDTO } from './dtos/update-appointment.dto.js';

@Controller('medspas/:medspaId/appointments')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  @Post()
  async createAppointment(
    @Param('medspaId', new ParseIntPipe()) medSpaId: number,
    @Body() createAppointmentDto: CreateAppointmentDTO,
    @Res() res: FastifyReply,
  ) {
    return res
      .status(201)
      .send(
        await this.appointmentService.createAppointment(
          medSpaId,
          createAppointmentDto,
        ),
      );
  }

  @Get()
  async listAppointments(
    @Param('medspaId', new ParseIntPipe()) medSpaId: number,
    @Res() res: FastifyReply,
    @Query('offset', new ParseIntPipe({ optional: true }))
    paginationOffset?: number,
    @Query('limit', new ParseIntPipe({ optional: true }))
    paginationLimit?: number,
    @Query('fromId') paginationFromId?: string,
    @Query('sortBy') paginationSortBy?: Pagination<['createdAt']>['sortBy'],
    @Query('status', new ParseEnumPipe(AppointmentStatus, { optional: true }))
    status?: AppointmentStatus,
  ) {
    let pagination;
    try {
      const opts: any = {};
      if (paginationLimit != null) {
        opts.limit = paginationLimit;
      }
      if (paginationFromId != null) {
        opts.fromId = parseInt(paginationFromId) || paginationFromId;
      } else {
        opts.offset = paginationOffset ?? 0;
      }
      if (paginationSortBy != null) {
        opts.sortBy = paginationSortBy;
      }

      pagination = asPagination<['createdAt']>(opts);
    } catch {
      pagination = undefined;
    }
    return res
      .status(200)
      .send(
        await this.appointmentService.listAppointments(
          medSpaId,
          pagination,
          status,
        ),
      );
  }

  @Get(':appointmentId')
  async getAppointment(
    @Param('medspaId', new ParseIntPipe()) medSpaId: number,
    @Param('appointmentId', new ParseIntPipe()) appointmentId: number,
    @Res() res: FastifyReply,
  ) {
    return res
      .status(200)
      .send(
        await this.appointmentService.getAppointment(medSpaId, appointmentId),
      );
  }

  @Patch(':appointmentId')
  async updateAppointment(
    @Param('medspaId', new ParseIntPipe()) medSpaId: number,
    @Param('appointmentId', new ParseIntPipe()) appointmentId: number,
    @Body() updateAppointmentDto: UpdateAppointmentDTO,
    @Res() res: FastifyReply,
  ) {
    return res
      .status(200)
      .send(
        await this.appointmentService.updateAppointment(
          medSpaId,
          appointmentId,
          updateAppointmentDto,
        ),
      );
  }
}
