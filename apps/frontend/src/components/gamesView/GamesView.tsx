import { useEffect, useState } from "react";
import type { BuildEntry, GameFilter, ViewConfig } from "../../types";
import React from "react";
import GameEntry from "./GameEntryRow";
import GameEntryDetails from "./GameEntryDetails";
import GameFilterContext from "./GameFilterContext";
import { useBuilds } from "../../hooks/useBuilds";
import { useGames } from "../../hooks/useGames";
import { useViews } from "../../hooks/useViews";

interface GamesViewProps {
  id: string|null; // Optional view id to know what view to access
}

const GamesView: React.FC<GamesViewProps> = ({ id }) => {
  const [expandedGameIds, setExpandedGameIds] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<GameFilter>({});
  const [buildEntries, setBuildEntries] = useState<BuildEntry[]>([]);
  const [viewConfig, setViewConfig] = useState<ViewConfig | null>(null);
  const [viewError, setViewError] = useState<string | null>(null);
  const [loadingView, setLoadingView] = useState(false);

  const { getBuildEntriesById } = useBuilds();
  const { games, fetchGames } = useGames();
  const { fetchViewById } = useViews();

  useEffect(()=> {
    fetchGames();
  }, [fetchGames]);

  // Fetch ViewConfig if id is provided
  useEffect(() => {
    let ignore = false;
    if (id) {
      setLoadingView(true);
      setViewError(null);
      fetchViewById(id)
        .then((view: ViewConfig | undefined) => {
          if (ignore) return;
          if (!view) {
            setViewError("Could not find the requested view.");
            setViewConfig(null);
            setFilters({});
            setBuildEntries([]);
            return;
          }
          setViewConfig(view);
          setFilters(view.filter || {});
          // Fetch build entries for this view
          if (view.filter?.buildEntryIds && view.filter.buildEntryIds.length > 0) {
            getBuildEntriesById(view.filter.buildEntryIds)
              .then(setBuildEntries)
              .catch(() => setBuildEntries([]));
          } else {
            setBuildEntries([]);
          }
        })
        .catch(() => {
          if (!ignore) {
            setViewError("Error fetching the requested view.");
            setViewConfig(null);
            setFilters({});
            setBuildEntries([]);
          }
        })
        .finally(() => {
          if (!ignore) setLoadingView(false);
        });
    } else {
      // No id: default view (all games, no filters)
      setViewConfig(null);
      setFilters({});
      setBuildEntries([]);
      setViewError(null);
      setLoadingView(false);
    }
    return () => {
      ignore = true;
    };
  }, [id, fetchViewById, getBuildEntriesById]);

  // If filters.buildEntryIds changes (user edits filters), update buildEntries
  useEffect(() => {
    if (filters.buildEntryIds && filters.buildEntryIds.length > 0) {
      getBuildEntriesById(filters.buildEntryIds)
        .then(setBuildEntries)
        .catch(() => setBuildEntries([]));
    } else {
      setBuildEntries([]);
    }
  }, [filters.buildEntryIds, getBuildEntriesById]);

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
    if (filters.buildEntryIds && filters.buildEntryIds.length > 0) {
      // For each build filter, at least one must match the game's build
      const matchesAnyBuild = buildEntries.some(buildEntry => {
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

  // --- Summary Stats ---
  const numberOfGames = filteredGames.length;
  const winCount = filteredGames.filter(g => g.result === "Win").length;
  const averageWinrate = numberOfGames > 0 ? ((winCount / numberOfGames) * 100).toFixed(1) + "%" : "—";
  // Placeholder for average elo
  const averageElo = ""; // To be implemented

  // Aggregate stats
  const sum = <K extends keyof typeof filteredGames[0]["stats"]>(key: K) =>
    filteredGames.reduce((acc, g) => acc + (g.stats?.[key] ?? 0), 0);

  const avg = <K extends keyof typeof filteredGames[0]["stats"]>(key: K) =>
    numberOfGames > 0 ? (sum(key) / numberOfGames).toFixed(1) : "—";

  const avgKills = avg("kills");
  const avgDeaths = avg("deaths");
  const avgAssists = avg("assists");
  const avgKDA = (() => {
    if (numberOfGames === 0) return "—";
    const totalKills = sum("kills");
    const totalAssists = sum("assists");
    const totalDeaths = sum("deaths");
    if (totalDeaths === 0) return "perfect";
    return ((totalKills + totalAssists) / totalDeaths).toFixed(2);
  })();

  const avgDmgPerMin = avg("dmgPerMin");
  const avgGoldPerMin = avg("goldPerMin");
  const avgCsPerMin = avg("csPerMin");

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {viewConfig?.name || "Untitled View"}
      </h2>

      {loadingView && (
        <div className="mb-4 text-blue-600">Loading view...</div>
      )}
      {viewError && (
        <div className="mb-4 text-red-600">{viewError}</div>
      )}

      {/* Filters Section */}
      <div className="mb-4">
        <GameFilterContext
          filters={filters}
          onChange={setFilters}
        />
      </div>
      {/* View Summary */}
      <div className="mb-4 flex flex-wrap gap-6 items-center text-sm">
        <div>
          <span className="font-semibold">Games:</span> {numberOfGames}
        </div>
        <div>
          <span className="font-semibold">Winrate:</span> {averageWinrate}
        </div>
        <div>
          <span className="font-semibold">Average Elo:</span> {averageElo}
        </div>
        <div>
          <span className="font-semibold">Avg Kills:</span> {avgKills}
        </div>
        <div>
          <span className="font-semibold">Avg Deaths:</span> {avgDeaths}
        </div>
        <div>
          <span className="font-semibold">Avg Assists:</span> {avgAssists}
        </div>
        <div>
          <span className="font-semibold">Avg KDA:</span> {avgKDA}
        </div>
        <div>
          <span className="font-semibold">Avg Dmg/Min:</span> {avgDmgPerMin}
        </div>
        <div>
          <span className="font-semibold">Avg Gold/Min:</span> {avgGoldPerMin}
        </div>
        <div>
          <span className="font-semibold">Avg CS/Min:</span> {avgCsPerMin}
        </div>
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