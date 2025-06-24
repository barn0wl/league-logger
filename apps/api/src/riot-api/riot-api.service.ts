import { Injectable } from '@nestjs/common';
import { PlatformId, RiotAPI } from '@fightmegg/riot-api';

@Injectable()
export class RiotApiService {
    private readonly client: RiotAPI;

  constructor(apiKey: string) {
    this.client = new RiotAPI(apiKey);
  }

  /** Fetch an account by its gameName and tag */
  async getAccountByName(name: string, tag: string) {
    const res = await this.client.account.getByRiotId({
        region: PlatformId.EUROPE,
        gameName: name,
        tagLine: tag,
    });
    return res;
  }

  async getMatchList(accountId: string, startTime?: number, count?: number) {
    const res = await this.client.matchV5.getIdsByPuuid({
      cluster: PlatformId.EUROPE,
      puuid: accountId,
      params: {
        queue: 420, // we only retrieve SR 5v5 ranked games
        count: count,
        startTime: startTime
      }
    })
    return res;
  }

  async getMatchById(matchId: string) {
    const res = await this.client.matchV5.getMatchById({
      cluster: PlatformId.EUROPE,
      matchId: matchId
    });
    return res;
  }

    async getMatchTimelineById(matchId: string) {
    const res = await this.client.matchV5.getMatchTimelineById({
      cluster: PlatformId.EUROPE,
      matchId: matchId
    });
    return res;
  }

  /** Fetches all items from DDragon */
  async getItems(version: string) {
    const res = await this.client.ddragon.items({
      version: version
    });
    return res;
  }

  async getChampions(version: string) {
    const res = await this.client.ddragon.champion.all({
      version: version
    });
    return res;
  }

  async getRunesReforged(version: string) {
    const res = await this.client.ddragon.runesReforged({
      version: version
    });
    return res;
  }

  async getSummonerSpells(version: string) {
    const res = await this.client.ddragon.summonerSpells({
      version: version
    })
    return res;
  }

  /** Returns latest version of DDragon */
  async getDDragonLatestVersion() {
    return await this.client.ddragon.versions.latest();
  }

}
