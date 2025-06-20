import React from "react";

interface StaticDataSectionProps {
  currentVersion: string | null;
  latestVersion: string;
  onRefresh: () => void;
  loading: boolean;
}

const StaticDataSection: React.FC<StaticDataSectionProps> = ({ currentVersion, latestVersion, onRefresh, loading }) => {
  const upToDate = currentVersion === latestVersion;

  return (
    <section className="border p-4 rounded mb-6">
      <h3 className="text-xl font-bold mb-2">Static Data</h3>
      <p>
        Current DDragon Version: <strong>{currentVersion || '—'}</strong>
      </p>
      <p>
        Latest Available Version: <strong>{latestVersion}</strong>
      </p>
      <button
        onClick={onRefresh}
        disabled={loading || upToDate}
        className={`mt-2 px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : upToDate ? 'bg-green-600' : 'bg-blue-600'}`}
      >
        {loading ? 'Refreshing…' : upToDate ? 'Up-to-Date' : 'Refresh Data Dragon'}
      </button>
    </section>
  );
};

export default StaticDataSection;