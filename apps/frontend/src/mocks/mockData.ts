import {
  BuildEntry,
  CreateAccount,
  Game,
  ReferenceEntity,
  ViewConfig,
} from "../types";

// --- Mock Reference Entities ---
export const mockChampions: ReferenceEntity[] = [
  { id: "Aatrox", name: "Aatrox" },
  { id: "Ahri", name: "Ahri" },
  { id: "Ezreal", name: "Ezreal" },
];

export const mockAccounts: ReferenceEntity[] = [
  { id: "acc1", name: "SummonerOne" },
  { id: "acc2", name: "SummonerTwo" },
];

export const mockKeystones: ReferenceEntity[] = [
  { id: 8005, name: "Press the Attack" },
  { id: 8112, name: "Electrocute" },
];

export const mockRunes: ReferenceEntity[] = [
  { id: 9111, name: "Triumph" },
  { id: 8000, name: "Precision" },
  { id: 8128, name: "Dark Harvest" },
  { id: 8138, name: "Eyeball Collection" },
  { id: 8135, name: "Ravenous Hunter" },
];

export const mockShards: ReferenceEntity[] = [
  { id: 5008, name: "Adaptive Force" },
  { id: 5002, name: "Armor" },
  { id: 5003, name: "Magic Resist" },
];

export const mockItems: ReferenceEntity[] = [
  { id: 1055, name: "Doran's Blade" },
  { id: 1001, name: "Boots" },
  { id: 3078, name: "Trinity Force" },
  { id: 3153, name: "Blade of the Ruined King" },
  { id: 3031, name: "Infinity Edge" },
];

export const mockSpells: ReferenceEntity[] = [
  { id: 4, name: "Flash" },
  { id: 7, name: "Heal" },
];

// --- Mock Build Entries ---
export const mockBuildEntries: BuildEntry[] = [
  {
    id: "build1",
    name: "Ezreal Standard",
    filter: {
      keystoneId: 8005,
      coreItemIds: [3078, 3153, 3031],
      summonerSpellIds: [4, 7],
    },
    tags: ["adc", "poke"],
    notes: "Standard Ezreal build.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "build2",
    name: "Ahri Burst",
    filter: {
      keystoneId: 8112,
      coreItemIds: [3153, 3031, 3078],
      summonerSpellIds: [4, 7],
    },
    tags: ["mid", "burst"],
    notes: "Ahri one-shot build.",
    createdAt: new Date().toISOString(),
  },
];

// --- Mock Games ---
export const mockGames: Game[] = [
  {
    gameId: "game1",
    account: mockAccounts[0],
    patch: "14.1",
    date: new Date().toISOString(),
    champion: mockChampions[2],
    position: "ADC",
    build: {
      runePage: {
        keystone: mockKeystones[0],
        runes: [
          mockRunes[0],
          mockRunes[1],
          mockRunes[2],
          mockRunes[3],
          mockRunes[4],
        ],
        shards: [mockShards[0], mockShards[1], mockShards[2]],
      },
      items: {
        starter: mockItems[0],
        boots: mockItems[1],
        coreItems: [mockItems[2], mockItems[3], mockItems[4]],
      },
      summonerSpells: [mockSpells[0], mockSpells[1]],
    },
    elo: 1500,
    result: "Win",
    tags: ["adc", "poke"],
    stats: {
      kills: 10,
      deaths: 2,
      assists: 8,
      csPerMin: 7.5,
      goldPerMin: 430,
      dmgPerMin: 900,
    },
  },
  {
    gameId: "game2",
    account: mockAccounts[1],
    patch: "14.1",
    date: new Date().toISOString(),
    champion: mockChampions[1],
    position: "Mid",
    build: {
      runePage: {
        keystone: mockKeystones[1],
        runes: [
          mockRunes[2],
          mockRunes[3],
          mockRunes[4],
          mockRunes[0],
          mockRunes[1],
        ],
        shards: [mockShards[2], mockShards[0], mockShards[1]],
      },
      items: {
        starter: mockItems[0],
        boots: mockItems[1],
        coreItems: [mockItems[3], mockItems[4], mockItems[2]],
      },
      summonerSpells: [mockSpells[0], mockSpells[1]],
    },
    elo: 1400,
    result: "Loss",
    tags: ["mid", "burst"],
    stats: {
      kills: 5,
      deaths: 7,
      assists: 3,
      csPerMin: 6.2,
      goldPerMin: 370,
      dmgPerMin: 600,
    },
  },
];

// --- Mock Views ---
export const mockViews: ViewConfig[] = [
  {
    id: "view1",
    name: "Ezreal ADC Games",
    filter: {
      championId: "Ezreal",
      position: "ADC",
      tagIncludes: ["adc"],
      buildEntryIds: ["build1"],
    },
  },
  {
    id: "view2",
    name: "Ahri Burst Games",
    filter: {
      championId: "Ahri",
      position: "Mid",
      tagIncludes: ["burst"],
      buildEntryIds: ["build2"],
    },
  },
];

// --- Mock Accounts for AccountService ---
export const mockAccountEntities: ReferenceEntity[] = [
  { id: "acc1", name: "SummonerOne" },
  { id: "acc2", name: "SummonerTwo" },
];

// --- Mock CreateAccount ---
export const mockCreateAccount: CreateAccount = {
  name: "TestAccount",
  tag: "EUW1",
};