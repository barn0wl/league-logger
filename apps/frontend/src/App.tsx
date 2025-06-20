import NavBar from './components/navigation/NavBar';
import { useState } from 'react';
import ControlCenter from './components/controlCenter/ControlCenter';
import ViewsList from './components/viewsList/ViewsList';
import GamesView from './components/gamesView/GamesView';
import BuildsView from './components/buildsView/BuildsView';
import { BrowserRouter } from 'react-router-dom';
import { ViewKey } from './types';

function App() {

  const [showControl, setShowControl] = useState(false);
    // which tab are we on?
  const [view, setView] = useState<ViewKey>('views')
  // when we're on games, which saved view id should we load?
  const [viewId, setViewId] = useState<string | null>(null)
  
  return (
    <BrowserRouter>
        <div className="flex flex-col h-screen">
        <header className="flex items-center justify-between px-4 py-2 bg-white shadow">
          <NavBar
            current={view}
            onChange={v => { setView(v); if (v !== 'games') setViewId(null) }}
          />
          <button
            onClick={() => setShowControl(v => !v)}
            className="ml-auto px-3 py-1 bg-blue-600 text-white rounded"
          >
            Control Center
          </button>
        </header>

        {/* Drawer / Modal for Control Center */}
        {showControl && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex"
            onClick={() => setShowControl(false)}
          >
            <div
              className="ml-auto w-80 bg-white h-full p-6 shadow-lg"
              onClick={e => e.stopPropagation()}
            >
              <ControlCenter
                /* pass props... */
              />
            </div>
          </div>
        )}

        <main className="flex-1 overflow-auto p-4">
          {view === 'views' && <ViewsList /* props */ />}
          {view === 'games' && <GamesView id={viewId} />}
          {view === 'builds' && <BuildsView /* props */ />}
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
