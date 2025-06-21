import React, { useEffect, useState } from "react";
import { BuildFilter } from "../../types";
import BuildEntryRow from "./BuildEntryRow";
import BuildEntryDetails from "./BuildEntryDetails";
import { useBuilds } from "../../hooks/useBuilds";
import BuildFilterContext from "./BuildFilterContext";

export const BuildsView: React.FC = () => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<BuildFilter>({}); // for BuildFilterContext
  //need all the build Entries saved in db
  const { buildEntries, addBuildEntry, fetchBuildEntries } = useBuilds();

    useEffect(()=>{
      fetchBuildEntries();
    }, [fetchBuildEntries])

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
          onClick={() => addBuildEntry()}
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