import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import GameDetail from './pages/GameDetail/GameDetail';
import About from './pages/About/About';
import Settings from './pages/Settings/Settings';
import NotFound from './pages/NotFound/NotFound';
import { GameProvider } from './contexts/GameContext';
import { UserSettingsProvider } from './contexts/UserSettingsContext';
import './styles/global.css';

/**
 * Main App component with routing
 * @returns {JSX.Element} The main application component
 */
function App() {
  return (
    <UserSettingsProvider>
      <GameProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/games/:gameId" element={<GameDetail />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </GameProvider>
    </UserSettingsProvider>
  );
}

export default App; 