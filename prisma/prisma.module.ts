import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserService } from 'src/users/users.service';

@Global()
@Module({
  providers: [PrismaService, UserService],
  exports: [PrismaService, UserService],
})
export class PrismaModule {}
