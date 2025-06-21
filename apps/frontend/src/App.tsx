import ViewsList from './components/viewsList/ViewsList';
import GamesView from './components/gamesView/GamesView';
import BuildsView from './components/buildsView/BuildsView';
import { Route, Routes } from 'react-router-dom';
import GamesViewWithId from './components/helper/GamesViewWithId';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
      <div className="flex flex-col h-screen">
        <main className="flex-1 overflow-auto p-4">
          <Routes>
            <Route path='/' element={<MainLayout/>}>
              <Route path="/views" element={<ViewsList />} />
              <Route path="/games" element={<GamesView id={null} />} />
              <Route path="/games/:id" element={<GamesViewWithId />} />
              <Route path="/builds" element={<BuildsView />} />
              <Route path="*" element={<ViewsList />} />
            </Route>
          </Routes>
        </main>
      </div>
  );
};

export default App;
