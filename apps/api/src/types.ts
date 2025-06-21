
export interface Account {
    id: string;
    gameName: string;
    tag: string;
    lastFetched: Date;  // last date the accounts' games were updated at
}

export interface GameStats {
  kills: number;
  deaths: number;
  assists: number;
  csPerMin: number;
  goldPerMin: number;
  dmgPerMin: number;
}

interface RiotMatch {
    id: string;
    patch: string;
    date: string;
    championId: string;
    stats: GameStats;
    position: string;
    win: boolean;
    items: [number, number, number];
    // elo
}

interface RunePage {
    shards: [number, number, number];
    // runes are also kind of arrays of numbers

}