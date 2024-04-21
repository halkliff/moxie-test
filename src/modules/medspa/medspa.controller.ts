import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Res,
} from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import { asPagination, type Pagination } from '../../core/types/pagination.js';
import { MedSpaService } from './medspa.service.js';

@Controller('medspas')
export class MedSpaController {
  constructor(public readonly medSpaService: MedSpaService) {}
  @Get()
  async listServices(
    @Res() res: FastifyReply,
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
      .send(await this.medSpaService.listMedSpas(pagination));
  }

  @Get(':medspaId')
  async getMedSpa(
    @Res() res: FastifyReply,
    @Param('medspaId', new ParseIntPipe()) medSpaId: number,
  ) {
    return res.status(200).send(await this.medSpaService.getMedSpa(medSpaId));
  }
}
