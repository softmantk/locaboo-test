import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);
  async onModuleInit() {
    await this.$connect();
    this.logger.log('DB connected');
  }
}
