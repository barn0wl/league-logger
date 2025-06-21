import NavBar from './components/navigation/NavBar';
import { useState } from 'react';
import ControlCenter from './components/controlCenter/ControlCenter';
import ViewsList from './components/viewsList/ViewsList';
import GamesView from './components/gamesView/GamesView';
import BuildsView from './components/buildsView/BuildsView';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ViewKey } from './types';
import GamesViewWithId from './components/helper/GamesViewWithId';

function App() {

  const [showControl, setShowControl] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  return (
    <BrowserRouter>
        <div className="flex flex-col h-screen">
        <header className="flex items-center justify-between px-4 py-2 bg-white shadow">
          <NavBar
            current={location.pathname as ViewKey}
            onChange={viewKey => {
              // Use navigate to change route
              if (viewKey === 'views') navigate('/views');
              else if (viewKey === 'games') navigate('/games');
              else if (viewKey === 'builds') navigate('/builds');
            }}
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
              <ControlCenter/>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-auto p-4">
          <Routes>
            <Route path="/views" element={<ViewsList />} />
            <Route path="/games" element={<GamesView id={null} />} />
            <Route path="/games/:id" element={<GamesViewWithId />} />
            <Route path="/builds" element={<BuildsView />} />
            <Route path="*" element={<ViewsList />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
