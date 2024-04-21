import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../../core/services/prisma/prisma.service.js';
import {
  isPaginationWithId,
  type Pagination,
  isPaginationWithSortByKeys,
  type PaginatedRecords,
} from '../../../../core/types/pagination.js';
import { Prisma, type MedSpaAppointment } from '@prisma/client';
import type { CreateAppointmentDTO } from './dtos/create-appointment.dto.js';
import { AppointmentStatus } from './types/appointment-status.enum.js';
import { ServiceService } from '../service/service.service.js';
import type { UpdateAppointmentDTO } from './dtos/update-appointment.dto.js';

@Injectable()
export class AppointmentService {
  constructor(
    public prisma: PrismaService,
    public serviceService: ServiceService,
  ) {}

  async createAppointment(
    medSpaId: number,
    data: CreateAppointmentDTO,
  ): Promise<
    MedSpaAppointment & {
      services: {
        medSpaService: {
          id: number;
          name: string;
          price: number;
          duration: number;
        };
      }[];
    }
  > {
    return this.prisma.$transaction(async (prisma) => {
      const services = await prisma.medSpaService.findMany({
        where: {
          medSpaId,
          id: {
            in: data.services.map((service) => service.serviceId),
          },
        },
      });

      const { totalDuration, totalPrice } = services.reduce(
        (obj, service) => {
          obj.totalDuration += service.duration;
          obj.totalPrice += service.price;
          return obj;
        },
        { totalDuration: 0, totalPrice: 0 },
      );

      return prisma.medSpaAppointment.create({
        data: {
          medSpaId,
          startTime: data.start,
          status: AppointmentStatus.SCHEDULED,
          totalDuration,
          totalPrice,
          services: {
            createMany: {
              data: services.map((service) => ({
                medSpaServiceId: service.id,
              })),
            },
          },
        },
        include: {
          services: {
            select: {
              medSpaService: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  duration: true,
                },
              },
            },
          },
        },
      });
    });
  }

  async listAppointments(
    medSpaId: number,
    pagination?: Pagination,
    status?: AppointmentStatus,
  ): Promise<
    PaginatedRecords<
      MedSpaAppointment & {
        services: {
          medSpaService: {
            id: number;
            name: string;
            price: number;
            duration: number;
          };
        }[];
      }
    >
  > {
    const findManyArgs: Prisma.MedSpaAppointmentFindManyArgs = {
      where: {
        medSpaId,
        deletedAt: null,
      },
    };
    if (status != null) {
      findManyArgs.where!.status = status;
    }
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

      if (
        isPaginationWithSortByKeys<
          ['createdAt', 'totalDuration', 'totalPrice', 'status']
        >(pagination)
      ) {
        findManyArgs.orderBy = pagination.sortBy;
      }
    }

    const [records, totalCount] = await Promise.all([
      this.prisma.medSpaAppointment.findMany({
        ...findManyArgs,
        include: {
          services: {
            select: {
              medSpaServiceId: true,
              medSpaService: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  duration: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.medSpaAppointment.count({
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

  async getAppointment(
    medSpaId: number,
    appointmentId: number,
  ): Promise<
    MedSpaAppointment & {
      services: {
        medSpaService: {
          id: number;
          name: string;
          price: number;
          duration: number;
        };
      }[];
    }
  > {
    const result = await this.prisma.medSpaAppointment.findFirst({
      where: {
        id: appointmentId,
        medSpaId,
        deletedAt: null,
      },
      include: {
        services: {
          select: {
            medSpaService: {
              select: {
                id: true,
                name: true,
                price: true,
                duration: true,
              },
            },
          },
        },
      },
    });

    if (result == null) {
      throw new NotFoundException(
        `Appointment with id ${appointmentId} not found`,
      );
    }

    return result;
  }

  async updateAppointment(
    medSpaId: number,
    appointmentId: number,
    data: UpdateAppointmentDTO,
  ): Promise<MedSpaAppointment> {
    if ('status' in data && data.status != null) {
      if (
        ![AppointmentStatus.CANCELLED, AppointmentStatus.COMPLETED].includes(
          data.status,
        )
      ) {
        throw new BadRequestException(
          'Invalid status. Can be one of "CANCELLED" or "COMPLETED"',
        );
      }
    }

    try {
      return await this.prisma.medSpaAppointment.update({
        where: {
          id: appointmentId,
          medSpaId,
        },
        data: {
          status: data.status,
        },
        include: {
          services: {
            select: {
              medSpaServiceId: true,
              medSpaService: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  duration: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Appointment with id ${appointmentId} not found`,
        );
      } else {
        throw new InternalServerErrorException(error);
      }
    }
  }
}
