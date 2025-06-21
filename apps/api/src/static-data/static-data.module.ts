import { Module } from '@nestjs/common';
import { StaticDataController } from './static-data.controller';
import { StaticDataService } from './static-data.service';
import { RiotApiModule } from 'src/riot-api/riot-api.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [RiotApiModule, PrismaModule],
  controllers: [StaticDataController],
  providers: [StaticDataService]
})
export class StaticDataModule {}
