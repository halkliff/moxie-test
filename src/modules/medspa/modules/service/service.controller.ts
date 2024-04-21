import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import { ServiceService } from './service.service.js';
import type { CreateServiceDTO } from './dtos/create-service.dto.js';
import type { UpdateServiceDTO } from './dtos/update-service.dto.js';
import type { FastifyReply } from 'fastify';
import {
  asPagination,
  type Pagination,
} from '../../../../core/types/pagination.js';

@Controller('medspas/:medspaId/services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post('/')
  async create(
    @Res() res: FastifyReply,
    @Param('medspaId', new ParseIntPipe()) medSpaId: number,
    @Body() createServiceDto: CreateServiceDTO,
  ) {
    return res
      .status(201)
      .send(
        await this.serviceService.createService(medSpaId, createServiceDto),
      );
  }

  @Get('/')
  async listServices(
    @Res() res: FastifyReply,
    @Param('medspaId', new ParseIntPipe()) medSpaId: number,
    @Query('offset', new ParseIntPipe({ optional: true }))
    paginationOffset?: number,
    @Query('limit', new ParseIntPipe({ optional: true }))
    paginationLimit?: number,
    @Query('fromId') paginationFromId?: string,
    @Query('sortBy') paginationSortBy?: Pagination<['createdAt']>['sortBy'],
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
      .send(await this.serviceService.listServices(medSpaId, pagination));
  }

  @Get(':id')
  async getService(
    @Param('medspaId', new ParseIntPipe()) medSpaId: number,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return await this.serviceService.getService(medSpaId, id);
  }

  @Patch(':id')
  async updateService(
    @Param('medspaId', new ParseIntPipe()) medSpaId: number,
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateServiceDto: UpdateServiceDTO,
  ) {
    return await this.serviceService.updateService(
      medSpaId,
      id,
      updateServiceDto,
    );
  }

  @Delete(':id')
  async deleteService(
    @Res() res: FastifyReply,
    @Param('medspaId', new ParseIntPipe()) medSpaId: number,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    const result = await this.serviceService.deleteService(medSpaId, id);

    return res.status(result ? 204 : 404).send();
  }
}
