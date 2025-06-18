import React, { useState, useMemo } from 'react';
import { Game, GameFilter } from '../../types';

interface GameFiltersProps {
  games: Game[];
  filters: GameFilter;
  onChange: (newFilters: GameFilter) => void;
}

export const GameFilters: React.FC<GameFiltersProps> = ({ games, filters, onChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<keyof GameFilter | null>(null);

  // Derive unique options from loaded games
  const accounts = useMemo(() => [...new Map(games.map(g => [g.account.id, g.account])).values()], [games]);
  const champions = useMemo(() => [...new Map(games.map(g => [g.champion.id, g.champion])).values()], [games]);
  const positions = useMemo(() => Array.from(new Set(games.map(g => g.position))), [games]);
  const patches = useMemo(() => Array.from(new Set(games.map(g => g.patch))), [games]);
  const tags = useMemo(() => Array.from(new Set(games.flatMap(g => g.tags))), [games]);

  const filterFields: Array<{ key: keyof GameFilter; label: string }> = [
    { key: 'accountId', label: 'Account' },
    { key: 'championId', label: 'Champion' },
    { key: 'position', label: 'Position' },
    { key: 'patch', label: 'Patch' },
    { key: 'tagIncludes', label: 'Tags' },
    // build filter omitted for now
  ];

  // Retrieve current value display
  const getCurrentDisplay = (key: keyof GameFilter) => {
    const val = (filters as any)[key];
    if (!val) return key;
    if (Array.isArray(val)) return val.join(', ');
    return val;
  };

  // Retrieve options for a given filter key
  const getOptions = (key: keyof GameFilter) => {
    switch (key) {
      case 'accountId': return accounts.map(a => ({ id: a.id, name: a.name }));
      case 'championId': return champions.map(c => ({ id: c.id, name: c.name }));
      case 'position': return positions.map(p => ({ id: p, name: p }));
      case 'patch': return patches.map(p => ({ id: p, name: p }));
      case 'tagIncludes': return tags.map(t => ({ id: t, name: t }));
      default: return [];
    }
  };

  const applyFilter = (key: keyof GameFilter, value: string | number) => {
    const newFilters = { ...filters };
    if (key === 'tagIncludes') {
      newFilters.tagIncludes = [...(filters.tagIncludes || []), String(value)];
    } else {
      (newFilters as any)[key] = value;
    }
    onChange(newFilters);
    setActiveFilter(null);
    setMenuOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="px-3 py-1 bg-gray-200 rounded"
        onClick={() => setMenuOpen(open => !open)}
      >
        Filters
      </button>

      {menuOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-white border rounded shadow-lg">
          {activeFilter === null ? (
            // Main menu: list filter fields
            <ul>
              {filterFields.map(f => (
                <li key={f.key as string}>
                  <button
                    className="w-full text-left px-2 py-1 hover:bg-gray-100"
                    onClick={() => setActiveFilter(f.key)}
                  >
                    {getCurrentDisplay(f.key)}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            // Sub-menu: list options for activeFilter
            <ul>
              <li>
                <button
                  className="w-full text-left px-2 py-1 hover:bg-gray-100"
                  onClick={() => setActiveFilter(null)}
                >
                  ← Back
                </button>
              </li>
              {getOptions(activeFilter).map(opt => (
                <li key={opt.id.toString()}>
                  <button
                    className="w-full text-left px-2 py-1 hover:bg-gray-100"
                    onClick={() => applyFilter(activeFilter, opt.id)}
                  >
                    {opt.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default GameFilters;
