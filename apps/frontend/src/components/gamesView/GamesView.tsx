import { useState } from "react";
import type { BuildEntry, Game, GameFilter } from "../../types";
import React from "react";
import GameEntry from "./GameEntry";
import GameEntryDetails from "./GameEntryDetails";
import GameFilterContext from "./GameFilterContext";

interface GamesViewProps {
  viewName: string;
  games: Game[];
  buildEntries: BuildEntry[];
}

const GamesView: React.FC<GamesViewProps> = ({ viewName, games, buildEntries }) => {
  const [expandedGameIds, setExpandedGameIds] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<GameFilter>({});

  const toggleExpand = (gameId: string) => {
    setExpandedGameIds(prev => {
      const next = new Set(prev);
      if (next.has(gameId)) next.delete(gameId);
      else next.add(gameId);
      return next;
    });
  };

  // Filtering logic
  const filteredGames = games.filter(game => {
    // Account filter
    if (filters.accountId && game.account.id !== filters.accountId) return false;
    // Champion filter
    if (filters.championId && game.champion.id !== filters.championId) return false;
    // Position filter
    if (filters.position && game.position !== filters.position) return false;
    // Patch filter
    if (filters.patch && game.patch !== filters.patch) return false;
    // Result filter
    if (filters.result && game.result !== filters.result) return false;
    // Tag includes filter
    if (filters.tagIncludes && filters.tagIncludes.length > 0) {
      if (!filters.tagIncludes.some(tag => game.tags.includes(tag))) return false;
    }
    // Build entries filter (all selected builds must match)
    if (filters.builds && filters.builds.length > 0) {
      // For each build filter, at least one must match the game's build
      const matchesAnyBuild = filters.builds.some(buildEntry => {
        const bf = buildEntry.filter;
        // Only check fields that are defined in the filter
        if (bf.keystoneId && game.build.runePage.keystone.id !== bf.keystoneId) return false;
        if (bf.runeIds && bf.runeIds.length > 0) {
          if (!bf.runeIds.every((id, idx) => !id || game.build.runePage.runes[idx]?.id === id)) return false;
        }
        if (bf.shardIds && bf.shardIds.length > 0) {
          if (!bf.shardIds.every((id, idx) => !id || game.build.runePage.shards[idx]?.id === id)) return false;
        }
        if (bf.starterItemId && game.build.items.starter.id !== bf.starterItemId) return false;
        if (bf.bootsItemId && game.build.items.boots.id !== bf.bootsItemId) return false;
        if (bf.coreItemIds && bf.coreItemIds.length > 0) {
          if (!bf.coreItemIds.every((id, idx) => !id || game.build.items.coreItems[idx]?.id === id)) return false;
        }
        if (bf.summonerSpellIds && bf.summonerSpellIds.length > 0) {
          if (!bf.summonerSpellIds.every((id, idx) => !id || game.build.summonerSpells[idx]?.id === id)) return false;
        }
        return true;
      });
      if (!matchesAnyBuild) return false;
    }
    return true;
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{viewName}</h2>

      {/* Filters Section */}
      <div className="mb-4">
        <GameFilterContext
          games={games}
          buildEntries={buildEntries}
          filters={filters}
          onChange={setFilters}
        />
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Patch</th>
            <th className="border px-2 py-1">Account</th>
            <th className="border px-2 py-1">Champion</th>
            <th className="border px-2 py-1">Position</th>
            <th className="border px-2 py-1">Elo</th>
            <th className="border px-2 py-1">Result</th>
            <th className="border px-2 py-1">KDA</th>
            <th className="border px-2 py-1">Keystone</th>
            <th className="border px-2 py-1">Core Item</th>
            <th className="border px-2 py-1">Summoner Spells</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredGames.map(game => {
            const isExpanded = expandedGameIds.has(game.gameId);
            return (
              <React.Fragment key={game.gameId}>
                <GameEntry game={game} isExpanded={isExpanded} toggleExpand={toggleExpand} />
                {isExpanded && <GameEntryDetails game={game} />}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GamesView;