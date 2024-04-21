import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  MedSpa,
  MedSpaAddress,
  MedSpaContact,
  Prisma,
} from '@prisma/client';
import {
  isPaginationWithId,
  isPaginationWithSortByKeys,
  type PaginatedRecords,
  type Pagination,
} from '../../core/types/pagination.js';
import { PrismaService } from '../../core/services/prisma/prisma.service.js';

@Injectable()
export class MedSpaService {
  constructor(public readonly prisma: PrismaService) {}
  async listMedSpas(pagination?: Pagination): Promise<
    PaginatedRecords<
      MedSpa & {
        contacts: MedSpaContact[];
        addresses: MedSpaAddress[];
      }
    >
  > {
    const findManyArgs: Prisma.MedSpaFindManyArgs = {
      where: {
        deletedAt: null,
      },
    };
    if (pagination) {
      if (pagination.limit) {
        findManyArgs.take = pagination.limit;
      }
      if (isPaginationWithId<number>(pagination)) {
        findManyArgs.cursor = {
          id: pagination.fromId,
        };
      } else {
        findManyArgs.skip = pagination.offset * (pagination.limit ?? 1);
      }
      if (isPaginationWithSortByKeys<['createdAt', 'id', 'name']>(pagination)) {
        findManyArgs.orderBy = pagination.sortBy;
      }
    }

    const [records, totalCount] = await Promise.all([
      this.prisma.medSpa.findMany({
        ...findManyArgs,
        include: {
          addresses: true,
          contacts: true,
        },
      }),
      this.prisma.medSpa.count({
        where: findManyArgs.where,
      }),
    ]);

    return {
      records,
      totalCount,
      count: records.length,
      size: pagination?.limit ?? records.length,
      page: pagination?.offset ?? 0,
    };
  }

  async getMedSpa(medSpaId: number): Promise<
    MedSpa & {
      contacts: MedSpaContact[];
      addresses: MedSpaAddress[];
    }
  > {
    const response = await this.prisma.medSpa.findFirst({
      where: {
        id: medSpaId,
        deletedAt: null,
      },
      include: {
        addresses: true,
        contacts: true,
      },
    });

    if (response == null) {
      throw new NotFoundException(`MedSpa with id ${medSpaId} not found`);
    }

    return response;
  }
}
