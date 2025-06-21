import { Injectable, OnModuleInit, OnModuleDestroy, OnApplicationShutdown } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async onApplicationShutdown(signal: string) {
    console.log(`Application shutting down (signal: ${signal})`);
    await this.$disconnect();
  }
}