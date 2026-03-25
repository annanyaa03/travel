import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Hotels from './pages/Hotels';
import LoginPage from './pages/LoginPage';
import AIChatbot from './components/AIChatbot';
import ScrollToTop from './components/ScrollToTop';
import ConciergePlanner from './pages/ConciergePlanner';
import About from './pages/About';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Experiences from './pages/Experiences';
import Blog from './pages/Blog';
import Flights from './pages/Flights';
import FlightBooking from './pages/FlightBooking';
import Booking from './pages/Booking';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar onLoginClick={null} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/concierge-plan" element={<ConciergePlanner />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/book-flight" element={<FlightBooking />} />
          <Route path="/hotel-booking" element={<Booking />} />
        </Routes>

        <Footer />
        <AIChatbot />
      </div>
    </Router>
  );
}

export default App;
