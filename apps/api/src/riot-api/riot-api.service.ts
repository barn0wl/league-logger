import { Injectable, Logger } from '@nestjs/common';
import { PlatformId, RiotAPI } from '@fightmegg/riot-api';

@Injectable()
export class RiotApiService {
    private readonly logger = new Logger(RiotApiService.name);
    private readonly client: RiotAPI;

  constructor(apiKey: string) {
    this.client = new RiotAPI(apiKey);
  }

  /** Fetch an account by its gameName andd tag */
  async get(name: string, tag: string) {
    return this.client.account.getByRiotId({
        region: PlatformId.EUROPE,
        gameName: name,
        tagLine: tag,
    });
  }

}
