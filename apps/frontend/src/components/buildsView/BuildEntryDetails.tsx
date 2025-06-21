import { useState } from "react";
import { BuildEntry } from "../../types";
import BuildFilterEditor from "./BuildFilterEditor";
import { useBuilds } from "../../hooks/useBuilds";

interface BuildEntryDetailsProps {
  entry: BuildEntry;
  isExpanded: boolean;
}

const BuildEntryDetails: React.FC<BuildEntryDetailsProps> = ({ entry }) => {
  const [edited, setEdited] = useState(entry);

  const {updateBuildEntry, duplicateBuildEntry, deleteBuildEntry} = useBuilds();
  const handleChange = (field: keyof BuildEntry, value: any) => {
    setEdited(prev => ({ ...prev, [field]: value }));
  };

  return (
    <tr>
      <td colSpan={5} className="bg-gray-50 px-4 py-2">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              value={edited.name || ''}
              onChange={e => handleChange('name', e.target.value)}
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tags</label>
            <input
              value={edited.tags.join(', ')}
              onChange={e => handleChange('tags', e.target.value.split(',').map(t => t.trim()))}
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Notes</label>
            <textarea
              value={edited.notes || ''}
              onChange={e => handleChange('notes', e.target.value)}
              className="mt-1 block w-full border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Build Filter</label>
            <BuildFilterEditor
              filter={edited.filter}
              onChange={newFilter => setEdited(prev => ({ ...prev, filter: newFilter }))}
            />
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button
            onClick={() => updateBuildEntry(
              edited.id,
              edited
            )}
            className="px-3 py-1 bg-blue-500 text-white rounded"
          >
            Save
          </button>
          <button
            onClick={() => duplicateBuildEntry(entry.id)}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            Duplicate
          </button>
          <button
            onClick={() => deleteBuildEntry(entry.id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default BuildEntryDetails;