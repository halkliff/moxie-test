import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service.js';
import type { FastifyReply } from 'fastify';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  healthCheck(@Res() res: FastifyReply) {
    return res.status(200).send(this.appService.healthCheck());
  }
}
