import { useState } from "react";
import type { Game } from "../../types";
import React from "react";
import GameEntry from "./GameEntry";
import GameEntryDetails from "./GameEntryDetails";

interface GamesViewProps {
  viewName: string;
  games: Game[];
  // TODO: filters props will go here
}

const GamesView: React.FC<GamesViewProps> = ({ viewName, games }) => {
  const [expandedGameIds, setExpandedGameIds] = useState<Set<string>>(new Set());

  const toggleExpand = (gameId: string) => {
    setExpandedGameIds(prev => {
      const next = new Set(prev);
      if (next.has(gameId)) next.delete(gameId);
      else next.add(gameId);
      return next;
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{viewName}</h2>

      {/* Filters Section (to be designed) */}
      {/* <div className="mb-4">
          TODO: Filters UI here
      </div> */}

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
          {games.map(game => {
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