import { BuildEntry } from "../../types";

interface BuildEntryProps {
  entry: BuildEntry;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onUpdate: (entry: BuildEntry) => void;
}

const BuildEntryRow: React.FC<BuildEntryProps> = ({ entry, isExpanded, onToggle }) => (
  <tr className="border">
    <td className="px-2 py-1">
      {entry.name || entry.id}
    </td>
    <td className="px-2 py-1">
      {entry.filter.keystoneId}
    </td>
    <td className="px-2 py-1">
      {entry.filter.coreItemIds?.[0] || '—'}
    </td>
    <td className="px-2 py-1">
      {entry.filter.summonerSpellIds?.join(', ') || '—'}
    </td>
    <td className="px-2 py-1">
      <button onClick={() => onToggle(entry.id)} className="px-2 py-1 bg-gray-200 rounded">
        {isExpanded ? 'Hide' : 'View'}
      </button>
    </td>
  </tr>
);

export default BuildEntryRow;