import React, { useEffect, useState } from "react";
import { BuildEntry, BuildFilter } from "../../types";
import BuildEntryRow from "./BuildEntryRow";
import BuildEntryDetails from "./BuildEntryDetails";
import { useBuilds } from "../../hooks/useBuilds";
import BuildFilterContext from "./BuildFilterContext";

interface BuildsViewProps {
  onAdd: () => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onUpdate: (entry: BuildEntry) => void;
}

export const BuildsView: React.FC<BuildsViewProps> = ({ onAdd, onDelete, onDuplicate, onUpdate }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  //need all the build Entries saved in db
  const [buildEntries, setBuildEntries] = useState<BuildEntry[]>([]);
  const [filters, setFilters] = useState<BuildFilter>({}); // for BuildFilterContext
  const { getBuildEntries } = useBuilds();

    useEffect(()=>{
      getBuildEntries()
      .then(setBuildEntries)
      .catch(console.error);
    }, [getBuildEntries])

  const toggle = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Builds</h2>
          {/* BuildFilterContext goes here */}
          <BuildFilterContext
            buildEntries={buildEntries}
            filters={filters}
            onChange={setFilters}
          />
        </div>
        <button
          onClick={onAdd}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Add Build
        </button>
      </div>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Keystone</th>
            <th className="border px-2 py-1">Core Items</th>
            <th className="border px-2 py-1">Summoner Spells</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {buildEntries.map(entry => {
            const isExpanded = expanded.has(entry.id);
            return (
              <React.Fragment key={entry.id}>
                <BuildEntryRow
                  entry={entry}
                  isExpanded={isExpanded}
                  onToggle={toggle}
                />
                {isExpanded && (
                  <BuildEntryDetails
                    entry={entry}
                    isExpanded={isExpanded}
                    onToggle={toggle}
                    onDelete={onDelete}
                    onDuplicate={onDuplicate}
                    onUpdate={onUpdate}
                  />
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BuildsView;