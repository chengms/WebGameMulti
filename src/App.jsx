import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { GameProvider } from './contexts/GameContext';
import { UserSettingsProvider } from './contexts/UserSettingsContext';
import './styles/global.css';

// Lazy load page components
const Home = lazy(() => import('./pages/Home/Home'));
const GameDetail = lazy(() => import('./pages/GameDetail/GameDetail'));
const About = lazy(() => import('./pages/About/About'));
const Settings = lazy(() => import('./pages/Settings/Settings'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

/**
 * A simple loading spinner component to be shown during lazy loading
 */
const LoadingSpinner = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div className="home__loading-spinner"></div>
  </div>
);

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
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games/:gameId" element={<GameDetail />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </Layout>
        </Router>
      </GameProvider>
    </UserSettingsProvider>
  );
}

export default App; 