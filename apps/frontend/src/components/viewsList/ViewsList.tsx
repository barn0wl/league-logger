import { useMemo, useState } from "react";
import { ViewConfig, ViewFilter } from "../../types";
import { useViews } from "../../hooks/useViews";
import ViewFilterContext from "./ViewFilterContext";

interface ViewsListProps {
  onDuplicate: (view: ViewConfig) => void;
  onEdit: (view: ViewConfig, newName: string) => void;
  onOpen: (view: ViewConfig) => void;
  onDelete: (view: ViewConfig) => void;
}

export const ViewsList: React.FC<ViewsListProps> = ({ onDuplicate, onEdit, onOpen, onDelete }) => {
  const [searchText, setSearchText] = useState('');
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [viewFilters, setViewFilters] = useState<ViewFilter>({});

  const {views} = useViews();

  // Filter views by id or name and by viewFilters
  const filteredViews = useMemo(() => {
    const lower = searchText.toLowerCase();
    return views.filter(v => {
      // Search filter
        const matchesSearch =
            v.id.toLowerCase().includes(lower) ||
            (v.name?.toLowerCase().includes(lower) ?? false);

        // ViewFilter filter
        const { championId, position, tagIncludes } = viewFilters;
        const f = v.filter || {};

        // Champion filter
        const matchesChampion = !championId || f.championId === championId;
        // Position filter
        const matchesPosition = !position || f.position === position;
        // Tags filter (must include at least one tag in tagIncludes)
        const matchesTags =
            !tagIncludes || tagIncludes.length === 0 ||
            (f.tagIncludes && f.tagIncludes.some((tag: string) => tagIncludes.includes(tag)));
    
        return matchesSearch && matchesChampion && matchesPosition && matchesTags;
    });
  }, [views, searchText, viewFilters]);

    const handleEditClick = (view: ViewConfig) => {
        setEditingId(view.id);
        setEditName(view.name || '');
        setActionMenuId(null);
    };

    const saveEdit = (view: ViewConfig) => {
        onEdit(view, editName);
        setEditingId(null);
    };

    const handleClear = () => {
        setSearchText('');
        setViewFilters({});
    };

    return (
    <div className="p-4">
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search Views..."
          className="border rounded px-2 py-1 flex-1"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        {/* ViewFilterContext next to search bar */}
        <ViewFilterContext
          filters={viewFilters}
          onChange={setViewFilters}
          views={views}
        />
        <button onClick={handleClear} className="px-2 py-1 bg-gray-200 rounded">
          Clear
        </button>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border px-3 py-1">ID</th>
            <th className="border px-3 py-1">Name</th>
            <th className="border px-3 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredViews.map(view => {
            const isMenuOpen = actionMenuId === view.id;
            const isEditing = editingId === view.id;

            return (
              <tr key={view.id} className="border">
                <td className="px-3 py-1">{view.id}</td>
                <td className="px-3 py-1">
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <input
                        className="border rounded px-1 py-1 flex-1"
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                      />
                      <button
                        onClick={() => saveEdit(view)}
                        className="px-2 py-1 bg-blue-500 text-white rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-2 py-1 bg-gray-300 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    view.name || '—'
                  )}
                </td>
                <td className="px-3 py-1 relative">
                  <button
                    onClick={() => setActionMenuId(isMenuOpen ? null : view.id)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    Actions
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 mt-1 w-32 bg-white border rounded shadow-lg z-10">
                      <ul>
                        <li>
                          <button
                            onClick={() => { onDuplicate(view); setActionMenuId(null); }}
                            className="w-full text-left px-2 py-1 hover:bg-gray-100"
                          >
                            Duplicate
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleEditClick(view)}
                            className="w-full text-left px-2 py-1 hover:bg-gray-100"
                          >
                            Edit Name
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => { onOpen(view); setActionMenuId(null); }}
                            className="w-full text-left px-2 py-1 hover:bg-gray-100"
                          >
                            Open
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => { onDelete(view); setActionMenuId(null); }}
                            className="w-full text-left px-2 py-1 hover:bg-gray-100 text-red-600"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewsList;