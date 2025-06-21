import { Injectable, Logger } from '@nestjs/common';
import { PlatformId, RiotAPI } from '@fightmegg/riot-api';

@Injectable()
export class RiotApiService {
    private readonly logger = new Logger(RiotApiService.name);
    private readonly client: RiotAPI;

  constructor(apiKey: string) {
    this.client = new RiotAPI(apiKey);
  }

  /** Fetch an account by its gameName and tag */
  async get(name: string, tag: string) {
    return this.client.account.getByRiotId({
        region: PlatformId.EUROPE,
        gameName: name,
        tagLine: tag,
    });
  }

  async getMatchById(matchId: string) {
    const data = await this.client.matchV5.getMatchById({
      cluster: PlatformId.EUROPE,
      matchId: matchId
    })
  }

  /** Fetches all items from DDragon */
  async getItems(version: string) {
    const data = await this.client.ddragon.items({
      version: version
    });
    return data;
  }

}
