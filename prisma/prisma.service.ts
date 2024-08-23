import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  Coin: any;
  async onModuleInit() {
    await this.$connect();
  }

  User: any;
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
