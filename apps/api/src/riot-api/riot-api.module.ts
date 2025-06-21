import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RiotApiService } from './riot-api.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: RiotApiService,
      useFactory: (config: ConfigService) => {
        const apiKey = config.get<string>('RIOT_API_KEY') || '';
        return new RiotApiService(apiKey);
      },
      inject: [ConfigService],
    },
  ],
  exports: [RiotApiService],
})
export class RiotApiModule {}
