import React, { useState, useMemo } from 'react';
import { BuildEntry, BuildFilter, ReferenceEntity } from '../../types';

interface BuildFilterContextProps {
  buildEntries: BuildEntry[];
  filters: BuildFilter;
  onChange: (newFilters: BuildFilter) => void;
}

export const BuildFilterContext: React.FC<BuildFilterContextProps> = ({ buildEntries, filters, onChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeField, setActiveField] = useState<keyof BuildFilter | null>(null);

  // Derive options from buildEntries
  const keystoneOpts = useMemo(
    () => Array.from(new Set(buildEntries.map(b => b.filter.keystoneId).filter(Boolean))).map(id => ({ id, name: String(id) } as ReferenceEntity)),
    [buildEntries]
  );
  const shardOpts = useMemo(
    () => Array.from(new Set(buildEntries.flatMap(b => b.filter.shardIds || []))).map(id => ({ id, name: String(id) } as ReferenceEntity)),
    [buildEntries]
  );
  const starterOpts = useMemo(
    () => Array.from(new Set(buildEntries.map(b => b.filter.starterItemId).filter(Boolean))).map(id => ({ id, name: String(id) } as ReferenceEntity)),
    [buildEntries]
  );
  const bootsOpts = useMemo(
    () => Array.from(new Set(buildEntries.map(b => b.filter.bootsItemId).filter(Boolean))).map(id => ({ id, name: String(id) } as ReferenceEntity)),
    [buildEntries]
  );
  const coreOpts = useMemo(
    () => Array.from(new Set(buildEntries.flatMap(b => b.filter.coreItemIds || []))).map(id => ({ id, name: String(id) } as ReferenceEntity)),
    [buildEntries]
  );
  const spellOpts = useMemo(
    () => Array.from(new Set(buildEntries.flatMap(b => b.filter.summonerSpellIds || []))).map(id => ({ id, name: String(id) } as ReferenceEntity)),
    [buildEntries]
  );

  const fields: Array<{ key: keyof BuildFilter; label: string; options: ReferenceEntity[] }> = [
    { key: 'keystoneId', label: 'Keystone', options: keystoneOpts },
    { key: 'shardIds', label: 'Shards', options: shardOpts },
    { key: 'starterItemId', label: 'Starter Item', options: starterOpts },
    { key: 'bootsItemId', label: 'Boots', options: bootsOpts },
    { key: 'coreItemIds', label: 'Core Items', options: coreOpts },
    { key: 'summonerSpellIds', label: 'Summoner Spells', options: spellOpts },
  ];

  const displayValue = (field: keyof BuildFilter) => {
    const val = filters[field];
    if (Array.isArray(val)) return val.join(', ');
    return val || field;
  };

  const apply = (field: keyof BuildFilter, value: ReferenceEntity['id']) => {
    let updated = { ...filters };
    if (Array.isArray(updated[field])) {
      updated = { ...updated, [field]: [...(updated[field] as any), value] };
    } else {
      updated = { ...updated, [field]: value };
    }
    onChange(updated);
    setActiveField(null);
    setMenuOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setMenuOpen(o => !o)}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        Build Filters
      </button>

      {menuOpen && (
        <div className="absolute mt-2 w-56 bg-white border rounded shadow-lg z-10">
          {activeField === null ? (
            <ul>
              {fields.map(f => (
                <li key={f.key as string}>
                  <button
                    className="w-full text-left px-2 py-1 hover:bg-gray-100"
                    onClick={() => setActiveField(f.key)}
                  >
                    {displayValue(f.key)}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              <li>
                <button
                  className="w-full text-left px-2 py-1 hover:bg-gray-100"
                  onClick={() => setActiveField(null)}
                >
                  ← Back
                </button>
              </li>
              {fields.find(f => f.key === activeField)!.options.map(opt => (
                <li key={opt.id.toString()}>
                  <button
                    className="w-full text-left px-2 py-1 hover:bg-gray-100"
                    onClick={() => apply(activeField, opt.id)}
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

export default BuildFilterContext;
