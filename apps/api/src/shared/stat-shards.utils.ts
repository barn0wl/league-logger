import { STAT_SHARDS, StatShardId } from "./stat-shards.const";

export function getStatShardIconUrl(id: StatShardId): string {
  const shard = STAT_SHARDS[id];
  if (!shard) return '';
  
  return `https://raw.communitydragon.org/latest/game/assets/perks/statmods/${shard.key.toLowerCase()}.png`;
}