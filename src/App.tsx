import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PodcastPage from './pages/PodcastPage';
import AboutPage from './pages/AboutPage';
import { AudioProvider } from './context/AudioContext';

function App() {
  return (
    <Router>
      <AudioProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/podcast/:id" element={<PodcastPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes> 
        </Layout>
      </AudioProvider>
    </Router>
  );
}

export default App;