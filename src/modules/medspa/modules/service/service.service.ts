import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import type { CreateServiceDTO } from './dtos/create-service.dto.js';
import type { UpdateServiceDTO } from './dtos/update-service.dto.js';
import { PrismaService } from '../../../../core/services/prisma/prisma.service.js';
import {
  type PaginatedRecords,
  type Pagination,
  isPaginationWithId,
  isPaginationWithSortByKeys,
} from '../../../../core/types/pagination.js';
import { Prisma, type MedSpaService } from '@prisma/client';

@Injectable()
export class ServiceService {
  constructor(public readonly prisma: PrismaService) {}
  async createService(
    medSpaId: number,
    data: CreateServiceDTO,
  ): Promise<MedSpaService> {
    return await this.prisma.medSpaService.create({
      data: {
        duration: data.duration,
        name: data.name,
        price: data.cost,
        medSpaId: medSpaId,
      },
    });
  }

  async listServices(
    medSpaId: number,
    pagination?: Pagination,
  ): Promise<PaginatedRecords<MedSpaService>> {
    const findManyArgs: Prisma.MedSpaServiceFindManyArgs = {
      where: {
        medSpaId,
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

      if (isPaginationWithSortByKeys<['createdAt', 'name']>(pagination)) {
        findManyArgs.orderBy = pagination.sortBy;
      }
    }

    const [records, totalCount] = await Promise.all([
      this.prisma.medSpaService.findMany(findManyArgs),
      this.prisma.medSpaService.count({
        where: findManyArgs.where,
      }),
    ]);

    return {
      count: totalCount,
      page: pagination?.offset ?? 0,
      size: pagination?.limit ?? records.length,
      totalCount,
      records,
    };
  }

  async getService(medSpaId: number, id: number): Promise<MedSpaService> {
    const response = await this.prisma.medSpaService.findFirst({
      where: {
        id,
        medSpaId,
        deletedAt: null,
      },
    });

    if (response == null) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }

    return response;
  }

  async updateService(
    medSpaId: number,
    id: number,
    updateServiceDto: UpdateServiceDTO,
  ): Promise<MedSpaService> {
    try {
      return await this.prisma.medSpaService.update({
        where: {
          id,
          medSpaId,
          deletedAt: null,
        },
        data: {
          duration: updateServiceDto.duration,
          name: updateServiceDto.name,
          price: updateServiceDto.cost,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`Service with id ${id} not found`);
      }

      throw new InternalServerErrorException(error);
    }
  }

  async deleteService(medSpaId: number, id: number): Promise<boolean> {
    try {
      await this.prisma.medSpaService.update({
        where: {
          id,
          medSpaId,
        },
        data: {
          deletedAt: new Date(),
        },
      });
      return true;
    } catch {
      return false;
    }
  }
}
