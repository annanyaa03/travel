import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Hotels from './pages/Hotels';
import LoginPage from './pages/LoginPage';
import AIChatbot from './components/AIChatbot';
import AuthModal from './components/AuthModal';
import ScrollToTop from './components/ScrollToTop';
import ConciergePlanner from './pages/ConciergePlanner';
import About from './pages/About';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Experiences from './pages/Experiences';
import Blog from './pages/Blog';

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/concierge-plan" element={<ConciergePlanner />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>

        <Footer />
        <AIChatbot />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    </Router>
  );
}

export default App;
