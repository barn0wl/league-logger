import React, { useState, useMemo, useEffect } from "react";
import { ViewConfig, ViewFilter } from "../../types";
import { useGames } from "../../hooks/useGames";

interface ViewFilterContextProps {
  filters: ViewFilter;
  onChange: (filters: ViewFilter) => void;
  views: ViewConfig[];
}

const ViewFilterContext: React.FC<ViewFilterContextProps> = ({ onChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filters, _setFilters] = useState<ViewFilter|null>(null);
  const [activeField, setActiveField] = useState<keyof ViewFilter | null>(null);

  // Derive options from all views' filter fields
  // Optionally, you can use useGames() to get all possible champions/tags/positions
  const { games, fetchGames } = useGames();

  useEffect(()=>{
    fetchGames();
  }, [fetchGames])

  // Get all unique champions, positions, and tags from games (for better UX)
  const champions = useMemo(
    () => [...new Map(games.map(g => [g.champion.id, g.champion])).values()],
    [games]
  );
  const positions = useMemo(
    () => Array.from(new Set(games.map(g => g.position))),
    [games]
  );
  const tags = useMemo(
    () => Array.from(new Set(games.flatMap(g => g.tags))),
    [games]
  );

  const fields: Array<{ key: keyof ViewFilter; label: string; options: { id: string; name: string }[] }> = [
    {
      key: "championId",
      label: "Champion",
      options: champions.map(c => ({ id: c.id as string, name: c.name })),
    },
    {
      key: "position",
      label: "Position",
      options: positions.map(p => ({ id: p, name: p })),
    },
    {
      key: "tagIncludes",
      label: "Tags",
      options: tags.map(t => ({ id: t, name: t })),
    },
  ];

  const displayValue = (field: keyof ViewFilter) => {
    if (!filters) return field;
    const val = filters[field];
    if (Array.isArray(val)) return val.join(", ") || field;
    return val || field;
  };

  const apply = (field: keyof ViewFilter, value: string) => {
    let updated = { ...(filters || {}) };
    if (field === "tagIncludes") {
      updated.tagIncludes = [...((filters?.tagIncludes) || []), value];
    } else {
      (updated as any)[field] = value;
    }
    onChange(updated);
    setActiveField(null);
    setMenuOpen(false);
  };

  // Remove tag
  const removeTag = (tag: string) => {
    const updated = { ...filters, tagIncludes: (filters?.tagIncludes || []).filter(t => t !== tag) };
    onChange(updated);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setMenuOpen(o => !o)}
        className="px-3 py-1 bg-gray-200 rounded"
      >
        View Filters
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
                <li key={opt.id}>
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
          {/* Show selected tags with remove buttons */}
          {filters && filters.tagIncludes && filters.tagIncludes.length > 0 && (
            <div className="mt-2">
              <span className="text-sm font-medium">Tags:</span>
              <ul className="flex flex-wrap gap-2 mt-1">
                {filters.tagIncludes.map(tag => (
                  <li key={tag} className="flex items-center space-x-1 bg-gray-100 px-2 py-0.5 rounded">
                    <span>{tag}</span>
                    <button onClick={() => removeTag(tag)} className="text-red-500">×</button>
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

export default ViewFilterContext;