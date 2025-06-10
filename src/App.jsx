import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home/Home';
import GameDetail from './pages/GameDetail/GameDetail';
import About from './pages/About/About';
import NotFound from './pages/NotFound/NotFound';
import './styles/global.css';

/**
 * Main App component with routing
 * @returns {JSX.Element} The main application component
 */
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/:gameId" element={<GameDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 