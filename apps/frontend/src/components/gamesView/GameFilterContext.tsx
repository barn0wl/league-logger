import React, { useState, useMemo, useCallback } from 'react';
import { BuildEntry, Game, GameFilter, ReferenceEntity } from '../../types';

interface GameFilterContextProps {
  games: Game[];
  buildEntries: BuildEntry[];
  filters: GameFilter;
  onChange: (newFilters: GameFilter) => void;
}

export const GameFilterContext: React.FC<GameFilterContextProps> = ({ games, buildEntries, filters, onChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<keyof GameFilter | null>(null);
  const [searchText, setSearchText] = useState('');

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
    { key: 'builds', label: 'Build Entries' },
  ];

  // display current value
  const displayValue = (key: keyof GameFilter) => {
    const val = (filters as any)[key];
    if (!val || (Array.isArray(val) && val.length === 0)) return key;
    if (Array.isArray(val)) return (val as BuildEntry[]).map(b => b.name || b.id).join(', ');
    return val;
  };

  // map filter key to options
  const getOptions = useCallback((key: keyof GameFilter) => {
    switch (key) {
      case 'accountId': return accounts.map(a => ({ id: a.id, name: a.name }));
      case 'championId': return champions.map(c => ({ id: c.id, name: c.name }));
      case 'position': return positions.map(p => ({ id: p, name: p }));
      case 'patch': return patches.map(p => ({ id: p, name: p } as ReferenceEntity));
      case 'tagIncludes': return tags.map(t => ({ id: t, name: t } as ReferenceEntity));
      case 'builds': return buildEntries.map(b => ({ id: b.id, name: b.name || b.id }));
      default: return [];
    }
  }, [accounts, champions, positions, patches, tags, buildEntries]);

  // apply filter
  const applyFilter = (key: keyof GameFilter, value: any) => {
    const next: GameFilter = { ...filters };
    if (key === 'tagIncludes') {
      next.tagIncludes = [...(filters.tagIncludes || []), String(value)];
    } else if (key === 'builds') {
      next.builds = [...(filters.builds || []), buildEntries.find(b => b.id === value)!];
    } else {
      (next as any)[key] = value;
    }
    onChange(next);
    setActiveFilter(null);
    setMenuOpen(false);
    setSearchText('');
  };

  // remove build filter
  const removeBuild = (id: string) => {
    const next = { ...filters };
    next.builds = (filters.builds || []).filter(b => b.id !== id);
    onChange(next);
  };

  return (
    <div className="relative inline-block text-left">
      <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => setMenuOpen(o => !o)}>
        Filters
      </button>
      {menuOpen && (
        <div className="absolute z-10 mt-2 w-60 bg-white border rounded shadow-lg p-2">
          {activeFilter === null ? (
            <ul>
              {filterFields.map(f => (
                <li key={f.key as string}>
                  <button
                    className="w-full text-left px-2 py-1 hover:bg-gray-100"
                    onClick={() => setActiveFilter(f.key)}
                  >
                    {displayValue(f.key)}
                  </button>
                </li>
              ))}
            </ul>
          ) : activeFilter !== 'builds' ? (
            <ul>
              <li>
                <button className="px-2 py-1 w-full text-left hover:bg-gray-100" onClick={() => setActiveFilter(null)}>
                  ← Back
                </button>
              </li>
              {getOptions(activeFilter).map(opt => (
                <li key={opt.id.toString()}>
                  <button className="w-full text-left px-2 py-1 hover:bg-gray-100" onClick={() => applyFilter(activeFilter, opt.id)}>
                    {opt.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <button className="px-2 py-1 w-full text-left hover:bg-gray-100" onClick={() => setActiveFilter(null)}>
                ← Back
              </button>
              <input
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                placeholder="Search builds..."
                className="mt-2 mb-2 block w-full border rounded p-1"
              />
              <ul className="max-h-40 overflow-auto">
                {getOptions('builds')
                  .filter(opt => opt.name.toLowerCase().includes(searchText.toLowerCase()))
                  .map(opt => (
                    <li key={opt.id.toString()}>
                      <button
                        className="w-full text-left px-2 py-1 hover:bg-gray-100"
                        onClick={() => applyFilter('builds', opt.id)}
                      >
                        {opt.name}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          )}
          {/* show selected builds with remove buttons */}
          {filters.builds && filters.builds.length > 0 && (
            <div className="mt-2">
              <span className="text-sm font-medium">Selected Builds:</span>
              <ul className="space-y-1">
                {filters.builds.map(b => (
                  <li key={b.id} className="flex items-center space-x-2">
                    <span>{b.name || b.id}</span>
                    <button onClick={() => removeBuild(b.id)} className="text-red-500">×</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GameFilterContext;
