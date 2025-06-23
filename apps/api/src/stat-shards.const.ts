// stat-shards.const.ts
export const STAT_SHARDS = {
  // Offense
  5008: {
    id: 5008,
    name: "Adaptive Force",
    key: "StatModsAdaptiveForceIcon",
  },
  5005: {
    id: 5005,
    name: "Attack Speed",
    key: "StatModsAttackSpeedIcon",
  },
  5007: {
    id: 5007,
    name: "Ability Haste",
    key: "StatModsCDRScalingIcon",
  },
  5002: {
    id: 5002,
    name: "Armor",
    key: "StatModsArmorIcon",
  },
  5003: {
    id: 5003,
    name: "Magic Resist",
    key: "StatModsMagicResIcon",
  },
  
  // Defense
  5001: {
    id: 5001,
    name: "Health Scaling",
    key: "StatModsHealthScalingIcon",
  }
} as const;

export type StatShardId = keyof typeof STAT_SHARDS;