import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppInfo() {
    return {
      name: 'GILIA API',
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development'
    };
  }
}

