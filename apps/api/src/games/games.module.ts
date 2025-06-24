import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { RiotApiModule } from 'src/riot-api/riot-api.module';
import { AccountsModule } from 'src/accounts/accounts.module';

@Module({
  imports: [RiotApiModule, AccountsModule],
  providers: [GamesService],
  controllers: [GamesController]
})
export class GamesModule {}
