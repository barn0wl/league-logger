import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RiotApiModule } from 'src/riot-api/riot-api.module';

@Module({
  imports: [PrismaModule, RiotApiModule],
  providers: [AccountsService],
  controllers: [AccountsController]
})
export class AccountsModule {}
