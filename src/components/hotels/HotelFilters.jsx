import React from 'react';

const HotelFilters = ({ activeFilter, setActiveFilter, priceRange, setPriceRange }) => {
  const filters = ['All', '5 Stars', '4 Stars', 'Boutique', 'Resort', 'Pool', 'Spa', 'Pet Friendly'];

  const handleMinChange = (e) => {
    const val = parseInt(e.target.value);
    setPriceRange(prev => [Math.min(val, prev[1] - 50), prev[1]]);
  };

  const handleMaxChange = (e) => {
    const val = parseInt(e.target.value);
    setPriceRange(prev => [prev[0], Math.max(val, prev[0] + 50)]);
  };

  return (
    <div className="bg-[#FAF9F6]">
      {/* Filter Pills Container */}
      <div className="px-12 py-4 flex flex-wrap gap-2 border-b border-[rgba(0,0,0,0.06)]">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-5 py-2 rounded-full text-[12px] transition-all duration-200 cursor-pointer border
              ${activeFilter === filter 
                ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] font-normal' 
                : 'bg-transparent text-[#6b6b6b] border-[#e0e0e0] font-light hover:bg-white hover:border-[#C9A84C] hover:text-[#C9A84C]'
              }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Price Range Slider Container */}
      <div className="px-12 pt-3 pb-5">
        <div className="flex flex-col max-w-[300px]">
          <label className="text-[10px] tracking-[0.15em] uppercase text-[#9e9e9e] mb-3">
            RANGE: ${priceRange[0]} — ${priceRange[1]}
          </label>
          
          <div className="relative h-5 flex items-center">
            {/* Slider Track Background */}
            <div className="absolute w-full h-[2px] bg-[#e5e5e5] rounded-full"></div>
            
            {/* Active Track */}
            <div 
              className="absolute h-[2px] bg-[#C9A84C] rounded-full"
              style={{
                left: `${(priceRange[0] / 1000) * 100}%`,
                right: `${100 - (priceRange[1] / 1000) * 100}%`
              }}
            ></div>

            {/* Hidden Inputs for range logic */}
            <input 
              type="range" 
              min="0" 
              max="1000" 
              step="10"
              value={priceRange[0]} 
              onChange={handleMinChange}
              className="absolute w-full appearance-none pointer-events-none bg-transparent z-10"
              style={{ height: '2px' }}
            />
            <input 
              type="range" 
              min="0" 
              max="1000" 
              step="10"
              value={priceRange[1]} 
              onChange={handleMaxChange}
              className="absolute w-full appearance-none pointer-events-none bg-transparent z-20"
              style={{ height: '2px' }}
            />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        input[type=range]::-webkit-slider-thumb {
          appearance: none;
          pointer-events: all;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: transform 0.1s ease;
        }
        input[type=range]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        input[type=range]::-moz-range-thumb {
          appearance: none;
          pointer-events: all;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          cursor: pointer;
        }
      `}} />
    </div>
  );
};

export default HotelFilters;
