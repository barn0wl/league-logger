import React, { useState } from "react";
import { BuildEntry, ReferenceEntity } from "../../types";
import BuildEntryRow from "./BuildEntryRow";
import BuildEntryDetails from "./BuildEntryDetails";

interface BuildViewProps {
  buildEntries: BuildEntry[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onUpdate: (entry: BuildEntry) => void;
  // Static options loaded from API
  keystoneOptions: ReferenceEntity[];
  runeOptions: ReferenceEntity[];
  shardOptions: ReferenceEntity[];
  itemOptions: ReferenceEntity[];
  spellOptions: ReferenceEntity[];
}

export const BuildView: React.FC<BuildViewProps> = ({ buildEntries, onAdd, onDelete, onDuplicate, onUpdate,
    keystoneOptions, runeOptions, shardOptions, itemOptions, spellOptions }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

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
        <h2 className="text-2xl font-bold">Builds</h2>
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
                    keystoneOptions={keystoneOptions}
                    runeOptions={runeOptions}
                    shardOptions={shardOptions}
                    itemOptions={itemOptions}
                    spellOptions={spellOptions}
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

export default BuildView;