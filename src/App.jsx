import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Hotels from './pages/Hotels';
import AIChatbot from './components/AIChatbot';
import AuthModal from './components/AuthModal';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar onLoginClick={() => setIsAuthOpen(true)} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/hotels" element={<Hotels />} />
        </Routes>

        <Footer />
        <AIChatbot />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
