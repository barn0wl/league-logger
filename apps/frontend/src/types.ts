
export type ViewKey = 'views' | 'games' | 'builds';

/**--- Core Enums & Aliases --------------------------------------**/
export type EloBracket =
  | "Iron" | "Bronze" | "Silver" | "Gold"
  | "Platinum" | "Diamond" | "Master" | "Grandmaster" | "Challenger";

export type Position = "Top" | "Jungle" | "Mid" | "ADC" | "Support";
export type SummonerSpell = "Flash" | "Ignite" | "Smite" | "Teleport"
  | "Heal" | "Barrier" | "Exhaust" | "Ghost" | "Cleanse" | "Revive";


/**
 * Shared reference for lookup entities.
 */
export interface ReferenceEntity {
  id: number | string;
  name: string;
  iconUrl?: string;   // optional if some have no icon
}

/**
 * Data about the runepage that was used during a game.
 */
export interface RunePage {
  keystone: ReferenceEntity;
  runes: [ReferenceEntity, ReferenceEntity, ReferenceEntity,
    ReferenceEntity, ReferenceEntity]; // ref entity ordered array of length 5
  shards: [ReferenceEntity, ReferenceEntity, ReferenceEntity];
}

/**
 * Actual data of the build that was used during a game.
 */
export interface Build {
  runePage: RunePage;
  items: {
    starter: ReferenceEntity;
    boots: ReferenceEntity;
    coreItems: [ReferenceEntity, ReferenceEntity, ReferenceEntity]; 
    // ordered array   of ref entity, length 3, for first 3 core items
  };
  summonerSpells: [ReferenceEntity, ReferenceEntity];
}

/**--- Game Record ----------------------------------------------**/

export interface GameStats {
  kills: number;
  deaths: number;
  assists: number;
  csPerMin: number;
  goldPerMin: number;
  dmgPerMin: number;
}

export interface Game {
  gameId: string;
  account: ReferenceEntity;
  patch: string;                   // e.g. "13.12"
  date: string;                    // ISO timestamp
  champion: ReferenceEntity;
  position: Position;
  build: Build;
  elo: EloBracket;
  result: "Win" | "Loss";
  tags: string[];
  notes?: string;
  stats: GameStats;
}

/**--- View Configuration ---------------------------------------**/

export interface ViewConfig {
  id: string;
  name?: string;
  filter: GameFilter;      // values of the filter object for this view
}

/**--- Build & Game Specific Filters -----------------------------**/

/**
 * Filters specific to build components: runes, items, and summoner spells
 */
export interface BuildFilter {
    keystoneId?: ReferenceEntity['id'];
    runeIds?: ReferenceEntity['id'][];
    shardIds?: ReferenceEntity['id'][];            // match any of the shards
    starterItemId?: ReferenceEntity['id'];
    bootsItemId?: ReferenceEntity['id'];
    coreItemIds?: ReferenceEntity['id'][];          // firstCore, secondCore, thirdCore
    summonerSpellIds?: ReferenceEntity['id'][];     // Match either spell
}

/**
 * Filters for Game records, including nested build filters
 */
export interface GameFilter {
  accountId?: ReferenceEntity['id'];
  patch?: string;
  championId?: ReferenceEntity['id'];
  position?: Position;
  result?: Game['result'];
  tagIncludes?: string[];                         // must include any of these tags
  buildEntryIds?: string[];                  // array of strings linking to the buildEntries this filter object uses
}

/**
 * Contains data related to custom-made and database registered build filters
 * that can be named and then used to filter games in the GamesView.
 */
export interface BuildEntry {
    id: string;
    name?: string;
    filter: BuildFilter;
    tags: string[];
    notes?: string;
    createdAt: string;
}

// To filter through the views List
export interface ViewFilter {
  championId?: ReferenceEntity["id"];
  position?: string;
  tagIncludes?: string[];
}