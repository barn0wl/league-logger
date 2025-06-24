import { Injectable } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { RiotApiService } from 'src/riot-api/riot-api.service';

export type Lookback =
  | { type: 'count';     value: number }  // last N games
  | { type: 'days';      value: number }  // last N days;

  
@Injectable()
export class GamesService {

    constructor(private readonly riot: RiotApiService,
        private readonly account: AccountsService,
    ) {}

        /**
     * Fetch match IDs for a puuid according to one of three lookback modes:
     *   - last 50 games
     *   - last 100 games
     *   - last 30 days
     *
     * Optionally only fetch *new* games since lastFetchTimestamp.
     * If both lastFetchTimestamp and lookback window exist, we start from the later of the two.
     *
     * @param puuid                Player UUID
     * @param lookback             { type: 'count'|'days'; value: number }
     * @param lastFetchTimestampMs Optional epoch ms of your last successful fetch for that account
     */
    private async fetchMatchIdsForAccount(
        puuid: string,
        lookback: Lookback,
    ): Promise<string[]> {
        const nowMs = Date.now();
        const lastFetchDate = await this.account.getAccountLastFetchDate(puuid);
        const lastFetchTimestampMs = lastFetchDate?.getTime();

        let startTime: number | undefined;
        let count: number | undefined;

        if (lookback.type === 'days') {
        // compute epoch ms for now - N days
        const msPerDay = 24 * 60 * 60 * 1000;
        const daysAgoMs = nowMs - lookback.value * msPerDay;

        // start from the later of lastFetch or daysAgo
        startTime =
            lastFetchTimestampMs && lastFetchTimestampMs > daysAgoMs
            ? lastFetchTimestampMs
            : daysAgoMs;
        } else {
        // count-based lookback
        count = lookback.value;
        // only apply startTime if we have a last fetch date
            if (lastFetchTimestampMs) {
                startTime = lastFetchTimestampMs;
            }
        }

        // call Riot’s match-list endpoint
        const matchIds = await this.riot.getMatchList(
        puuid,
        startTime,
        count,
        );

        return matchIds;
    }

    async fetchMatchIdsForAccounts(
        ids: string[],
        lookback: Lookback
    ): Promise<string[]> {
        const results = await Promise.all(
            ids.map(id => this.fetchMatchIdsForAccount(id, lookback))
        );
        return results.flat();
    }
}

