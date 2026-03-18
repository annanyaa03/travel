import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FaSpinner, FaMapMarkedAlt, FaCalendarAlt, FaWallet, FaUserFriends } from 'react-icons/fa';
import { FaWandMagicSparkles } from 'react-icons/fa6';
import './AITripPlanner.css';

// Initialize Gemini API - Uses the key from environment or falls back to a placeholder for UI testing
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(apiKey);

export default function AITripPlanner() {
  const [formData, setFormData] = useState({
    destination: '',
    duration: '7',
    budget: 'Moderate',
    travelStyle: 'Balanced',
    travelers: '2',
    departure: ''
  });

  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateTrip = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setItinerary(null);

    if (!apiKey) {
      setError('Gemini API Key is missing. Please add VITE_GEMINI_API_KEY to your .env file.');
      setLoading(false);
      return;
    }

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      
      const prompt = `Act as an expert travel agent. Create a detailed trip itinerary based on this data:
      Destination: ${formData.destination}
      Duration: ${formData.duration} days
      Budget: ${formData.budget}
      Travel Style: ${formData.travelStyle}
      Travelers: ${formData.travelers}
      Departure City: ${formData.departure}
      
      Format the response in cleanly structured Markdown with:
      1. A short intro summary.
      2. Day-by-Day breakdown with specific morning/afternoon/evening activities.
      3. Top 3 Restaurant recommendations in that budget.
      4. A brief Packing List.
      5. Estimated totally budget ranges.
      Make it engaging and highly personalized to the travel style.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setItinerary(response.text());
    } catch (err) {
      console.error(err);
      setError('Failed to generate trip. Please check your API key and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-planner-page">
      <div className="ai-header">
        <div className="container">
          <div className="header-badge"><FaWandMagicSparkles /> Powered by Gemini AI</div>
          <h1>Design Your Dream Trip In Seconds</h1>
          <p>Tell us what you're looking for, and our AI will craft a personalized day-by-day itinerary complete with local secrets, packing lists, and budget estimates.</p>
        </div>
      </div>

      <div className="container planner-container">
        {/* Input Form */}
        <div className="planner-form-card glass-panel">
          <h2>Trip Preferences</h2>
          <form onSubmit={generateTrip}>
            <div className="form-grid">
              <div className="input-group">
                <label><FaMapMarkedAlt /> Where do you want to go?</label>
                <input type="text" name="destination" placeholder="e.g. Kyoto, Japan" value={formData.destination} onChange={handleInputChange} required />
              </div>
              
              <div className="input-group">
                <label><FaCalendarAlt /> Duration (Days)</label>
                <input type="number" name="duration" min="1" max="30" value={formData.duration} onChange={handleInputChange} required />
              </div>

              <div className="input-group">
                <label><FaWallet /> Budget Level</label>
                <select name="budget" value={formData.budget} onChange={handleInputChange}>
                  <option value="Budget">Budget / Backpacker</option>
                  <option value="Moderate">Moderate / Comfortable</option>
                  <option value="Luxury">Luxury / Premium</option>
                </select>
              </div>

              <div className="input-group">
                <label><FaWandMagicSparkles /> Travel Style</label>
                <select name="travelStyle" value={formData.travelStyle} onChange={handleInputChange}>
                  <option value="Relaxed">Relaxed & Casual</option>
                  <option value="Adventure">Adventure & Outdoors</option>
                  <option value="Cultural">Cultural & Historical</option>
                  <option value="Balanced">Balanced Mix</option>
                  <option value="Foodie">Food & Culinary Focused</option>
                </select>
              </div>

              <div className="input-group">
                <label><FaUserFriends /> Number of Travelers</label>
                <select name="travelers" value={formData.travelers} onChange={handleInputChange}>
                  <option value="1">Solo</option>
                  <option value="2">Couple (2)</option>
                  <option value="Family">Family / Small Group (3-5)</option>
                  <option value="Large Group">Large Group (6+)</option>
                </select>
              </div>

              <div className="input-group">
                <label><FaMapMarkedAlt /> Flying From (Optional)</label>
                <input type="text" name="departure" placeholder="e.g. JFK, New York" value={formData.departure} onChange={handleInputChange} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary generate-btn" disabled={loading}>
              {loading ? <><FaSpinner className="spin" /> Crafting Itinerary...</> : <><FaWandMagicSparkles /> Generate Itinerary</>}
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div className="planner-results">
          {error && <div className="error-message">{error}</div>}
          
          {loading && (
            <div className="loading-state glass-panel">
              <FaWandMagicSparkles className="pulsing-icon" />
              <h3>Our AI is exploring {formData.destination || 'the world'}...</h3>
              <p>Curating the perfect restaurants, plotting out daily routes, and calculating estimates based on your {formData.budget} budget.</p>
              
              <div className="skeleton-loaders">
                <div className="skeleton skeleton-title"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-text"></div>
                <div className="skeleton skeleton-box"></div>
              </div>
            </div>
          )}

          {itinerary && !loading && (
            <div className="itinerary-card glass-panel animate-slide-up">
              <div className="itinerary-actions">
                <button className="btn btn-outline btn-sm">Save to Profile</button>
                <button className="btn btn-outline btn-sm">Download PDF</button>
              </div>
              
              <div className="markdown-content">
                {/* Primitive markdown parser to render the AI output visually */}
                {itinerary.split('\n').map((line, i) => {
                  if (line.startsWith('## ')) return <h2 key={i}>{line.replace('## ', '')}</h2>;
                  if (line.startsWith('### ')) return <h3 key={i}>{line.replace('### ', '')}</h3>;
                  if (line.startsWith('**') && line.endsWith('**')) return <strong key={i} className="md-bold">{line.replace(/\*\*/g, '')}</strong>;
                  if (line.startsWith('- ')) return <li key={i}>{line.replace('- ', '').replace(/\*\*/g, '')}</li>;
                  if (line.trim() === '') return <br key={i} />;
                  return <p key={i}>{line.replace(/\*\*/g, '')}</p>;
                })}
              </div>
            </div>
          )}
          
          {!itinerary && !loading && !error && (
            <div className="empty-state">
              <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=600&q=80" alt="Travel map" />
              <h3>Your Itinerary Awaits</h3>
              <p>Fill out the preferences on the left and hit generate to see the magic happen.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
