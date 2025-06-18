import type { Game } from "../../types";

interface GameEntryDetailsProps {
  game: Game;
}

const GameEntryDetails: React.FC<GameEntryDetailsProps> = ({ game }) => (
  <tr>
    <td colSpan={12} className="bg-gray-50 px-4 py-2">
      <div className="space-y-2">
        <div>
          <strong>Result:</strong> {game.result === 'Win' ? 'Victory' : 'Defeat'}
        </div>
        <div>
          <strong>Tags:</strong> {game.tags.join(', ')}
        </div>
        <div>
          <strong>Notes:</strong> {game.notes || '—'}
        </div>
        <div>
          <strong>Build Details:</strong>
          <ul className="list-disc ml-6">
            <li>Keystone: {game.build.runePage.keystone.name}</li>
            <li>Runes: {game.build.runePage.shards.map(r => r.name).join(', ')}</li>
            <li>
              Items: {[
                game.build.items.starter,
                game.build.items.boots,
                game.build.items.coreItems[0],
                game.build.items.coreItems[1],
                game.build.items.coreItems[2],
              ].map(it => it.name).join(', ')}
            </li>
            <li>Summoner Spells: {game.build.summonerSpells.map(s => s.name).join(', ')}</li>
            {game.build.skillOrder && (
              <li>
                Skill Path: {game.build.skillOrder.sequence.map(s => s.name).join(' → ')}
              </li>
            )}
          </ul>
        </div>
        <div>
          <strong>Stats:</strong> CS/min: {game.stats.csPerMin.toFixed(1)}, G/min: {game.stats.goldPerMin.toFixed(1)}, D/min: {game.stats.dmgPerMin.toFixed(1)}
        </div>
      </div>
    </td>
  </tr>
);

export default GameEntryDetails;