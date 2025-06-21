import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { ViewsModule } from './views/views.module';
import { AccountsModule } from './accounts/accounts.module';
import { BuildsModule } from './builds/builds.module';
import { StaticDataModule } from './static-data/static-data.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    GamesModule, ViewsModule, AccountsModule, BuildsModule, StaticDataModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
