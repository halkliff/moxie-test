import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck() {
    return {
      ok: true,
      status: 'up',
      dateTime: new Date().toISOString(),
    };
  }
}
