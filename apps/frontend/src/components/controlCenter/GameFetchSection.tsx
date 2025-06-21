import React, { useState } from "react";
import { useGames } from "../../hooks/useGames";


const GameFetchSection: React.FC = () => {
  const [lookback, setLookback] = useState(100);
  const {fetchGames, loading} = useGames();

  return (
    <section className="border p-4 rounded mb-6">
      <h3 className="text-xl font-bold mb-2">Game History</h3>
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <span>Look‑back Window:</span>
          <select
            value={lookback}
            onChange={e => setLookback(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            <option value={100}>Last 100 games</option>
            <option value={30}>Last 30 days</option>
            <option value={50}>Last 50 games</option>
          </select>
        </label>
        <button
          onClick={() => fetchGames(lookback)}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-600'}`}
        >
          {loading ? 'Fetching…' : 'Fetch New Games'}
        </button>
      </div>
    </section>
  );
};

export default GameFetchSection;