import type { Game } from "../../types";

interface GameEntryRowProps {
  game: Game;
  isExpanded: boolean;
  toggleExpand: (id: string) => void;
}

const GameEntryRow: React.FC<GameEntryRowProps> = ({ game, isExpanded, toggleExpand }) => {
    const kda = [game.stats.kills, game.stats.deaths, game.stats.assists]
      .join('/');
    return (
    <tr className={`border ${game.result === 'Win' ? 'bg-blue-100' : 'bg-red-100'}`}>
      <td className="px-2 py-1">{new Date(game.date).toLocaleDateString()}</td>
      <td className="px-2 py-1">{game.patch}</td>
      <td className="px-2 py-1">{game.account.name}</td>
      <td className="px-2 py-1">{game.champion.name}</td>
      <td className="px-2 py-1">{game.position}</td>
      <td className="px-2 py-1">{game.elo}</td>
      <td className="px-2 py-1">{/* Color indicates win/loss */}</td>
      <td className="px-2 py-1">{kda}</td>
      <td className="px-2 py-1">{game.build.runePage.keystone.name}</td>
      <td className="px-2 py-1">{game.build.items.coreItems[0].name}</td>
      <td className="px-2 py-1">{game.build.summonerSpells.map(s => s.name).join(', ')}</td>
      <td className="px-2 py-1">
        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => toggleExpand(game.gameId)}
        >
          {isExpanded ? 'Hide' : 'View More'}
        </button>
      </td>
    </tr>
  );
}

export default GameEntryRow;