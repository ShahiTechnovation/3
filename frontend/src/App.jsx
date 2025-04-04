import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Mint from './pages/Mint';
import MyNFTs from './pages/MyNFTs';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/my-nfts" element={<MyNFTs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;