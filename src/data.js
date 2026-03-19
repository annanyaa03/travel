export const destinations = [
  // EUROPE (8)
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    continent: 'Europe',
    type: ['Beach', 'Luxury'],
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&q=80',
    bestTime: 'Apr-Oct',
    budget: '$$$',
    tags: ['Oia Sunset', 'Red Beach', 'Akrotiri'],
    description: 'Stunning sunsets, white-washed buildings and volcanic beaches'
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    continent: 'Europe',
    type: ['City', 'Cultural', 'Food'],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
    bestTime: 'Apr-Jun',
    budget: '$$$',
    tags: ['Eiffel Tower', 'Louvre', 'Montmartre'],
    description: 'City of light, world-class art, and exquisite culinary experiences'
  },
  {
    id: 'amalfi-coast',
    name: 'Amalfi Coast',
    country: 'Italy',
    continent: 'Europe',
    type: ['Beach', 'Luxury'],
    image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=1200&q=80',
    bestTime: 'May-Sep',
    budget: '$$$',
    tags: ['Positano', 'Ravello', 'Capri'],
    description: 'Dramatic cliffs, colorful villages, and shimmering turquoise waters'
  },
  {
    id: 'prague',
    name: 'Prague',
    country: 'Czech Republic',
    continent: 'Europe',
    type: ['City', 'Cultural', 'Budget'],
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&q=80',
    bestTime: 'Mar-May',
    budget: '$',
    tags: ['Old Town', 'Charles Bridge', 'Prague Castle'],
    description: 'Gothic architecture, historic streets, and vibrant cultural life'
  },
  {
    id: 'norwegian-fjords',
    name: 'Norwegian Fjords',
    country: 'Norway',
    continent: 'Europe',
    type: ['Nature', 'Adventure', 'Mountain'],
    image: 'https://images.unsplash.com/photo-1520769945061-0a448c463865?w=1200&q=80',
    bestTime: 'Jun-Aug',
    budget: '$$$',
    tags: ['Geirangerfjord', 'Bergen', 'Flam'],
    description: 'Breathtaking landscapes of deep blue fjords and snow-capped peaks'
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    continent: 'Europe',
    type: ['City', 'Beach', 'Food', 'Nightlife'],
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&q=80',
    bestTime: 'May-Jun',
    budget: '$$',
    tags: ['Sagrada Familia', 'Park Guell', 'La Rambla'],
    description: 'A blend of Gothic history, surreal architecture, and sunny beaches'
  },
  {
    id: 'dubrovnik',
    name: 'Dubrovnik',
    country: 'Croatia',
    continent: 'Europe',
    type: ['Beach', 'Cultural', 'Luxury'],
    image: 'https://images.unsplash.com/photo-1555990793-da11153b6c4b?w=1200&q=80',
    bestTime: 'May-Sep',
    budget: '$$',
    tags: ['Old City Walls', 'Lokrum Island', 'Cable Car'],
    description: 'The Pearl of the Adriatic, surrounded by ancient medieval walls'
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    continent: 'Europe',
    type: ['City', 'Cultural', 'Food'],
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&q=80',
    bestTime: 'May-Sep',
    budget: '$$$',
    tags: ['Big Ben', 'London Eye', 'Westminster'],
    description: 'A global metropolis where royal history meets modern innovation'
  },

  // ASIA (8)
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    continent: 'Asia',
    type: ['Cultural', 'Nature'],
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80',
    bestTime: 'Mar-May',
    budget: '$$',
    tags: ['Fushimi Inari', 'Kinkaku-ji', 'Arashiyama'],
    description: 'Cultural heart of Japan filled with temples and tea houses'
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    continent: 'Asia',
    type: ['Beach', 'Nature', 'Budget'],
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
    bestTime: 'Apr-Oct',
    budget: '$',
    tags: ['Ubud', 'Seminyak', 'Tanah Lot'],
    description: 'Tropical paradise of rice terraces, temples and surf beaches'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    continent: 'Asia',
    type: ['City', 'Food', 'Cultural', 'Nightlife'],
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80',
    bestTime: 'Mar-May',
    budget: '$$',
    tags: ['Shibuya', 'Shinjuku', 'Asakusa'],
    description: 'Ultramodern neon skyscrapers and historical Shinto shrines'
  },
  {
    id: 'phuket',
    name: 'Phuket',
    country: 'Thailand',
    continent: 'Asia',
    type: ['Beach', 'Budget', 'Nightlife'],
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=1200&q=80',
    bestTime: 'Nov-Apr',
    budget: '$',
    tags: ['Patong Beach', 'Phi Phi Islands', 'Big Buddha'],
    description: 'Crystal waters, white sands, and a vibrant island atmosphere'
  },
  {
    id: 'angkor-wat',
    name: 'Angkor Wat',
    country: 'Cambodia',
    continent: 'Asia',
    type: ['Cultural', 'Budget', 'Adventure'],
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200&q=80',
    bestTime: 'Nov-Mar',
    budget: '$',
    tags: ['Angkor Wat', 'Bayon Temple', 'Ta Prohm'],
    description: 'Ancient temple complex, the largest religious monument in the world'
  },
  {
    id: 'maldives',
    name: 'Maldives',
    country: 'Maldives',
    continent: 'Asia',
    type: ['Beach', 'Luxury'],
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200&q=80',
    bestTime: 'Nov-Apr',
    budget: '$$$$',
    tags: ['North Male Atoll', 'Baa Atoll', 'Hulhumale'],
    description: 'Overwater bungalows, crystal lagoons and endless ocean views'
  },
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    country: 'India',
    continent: 'Asia',
    type: ['Cultural', 'Adventure', 'Budget'],
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80',
    bestTime: 'Oct-Mar',
    budget: '$',
    tags: ['Jaipur', 'Jodhpur', 'Udaipur'],
    description: 'Vibrant land of majestic forts, royal palaces and arid deserts'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    continent: 'Asia',
    type: ['City', 'Food', 'Luxury'],
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1200&q=80',
    bestTime: 'Feb-Apr',
    budget: '$$$',
    tags: ['Marina Bay', 'Gardens by the Bay', 'Sentosa'],
    description: 'City-state combining garden-greenery with high-speed innovation'
  },

  // AMERICAS (6)
  {
    id: 'patagonia',
    name: 'Patagonia',
    country: 'Argentina',
    continent: 'Americas',
    type: ['Mountain', 'Nature', 'Adventure'],
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
    bestTime: 'Nov-Mar',
    budget: '$$$',
    tags: ['Perito Moreno', 'Fitz Roy', 'Torres del Paine'],
    description: 'Wilderness of glaciers, jagged peaks and turquoise lakes'
  },
  {
    id: 'machu-picchu',
    name: 'Machu Picchu',
    country: 'Peru',
    continent: 'Americas',
    type: ['Cultural', 'Adventure', 'Mountain'],
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200&q=80',
    bestTime: 'May-Sep',
    budget: '$$',
    tags: ['Machu Picchu', 'Sacred Valley', 'Cusco'],
    description: 'Mysterious Incan citadel high in the Andes mountains'
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'USA',
    continent: 'Americas',
    type: ['City', 'Food', 'Nightlife', 'Cultural'],
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80',
    bestTime: 'Apr-Jun',
    budget: '$$$',
    tags: ['Times Square', 'Central Park', 'Brooklyn'],
    description: 'The city that never sleeps, with ikonik skyline and global culture'
  },
  {
    id: 'havana',
    name: 'Havana',
    country: 'Cuba',
    continent: 'Americas',
    type: ['Cultural', 'Budget', 'City'],
    image: 'https://images.unsplash.com/photo-1500759285222-a95626359a94?w=1200&q=80',
    bestTime: 'Nov-Apr',
    budget: '$',
    tags: ['Old Havana', 'Malecon', 'Vinales Valley'],
    description: 'Vintage cars, pastel buildings, and the rhythmic beat of salsa'
  },
  {
    id: 'banff',
    name: 'Banff',
    country: 'Canada',
    continent: 'Americas',
    type: ['Mountain', 'Nature', 'Adventure', 'Winter'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80',
    bestTime: 'Jun-Aug',
    budget: '$$$',
    tags: ['Lake Louise', 'Moraine Lake', 'Icefields Parkway'],
    description: 'Pristine mountain lakes and rugged peaks of the Canadian Rockies'
  },
  {
    id: 'rio-de-janeiro',
    name: 'Rio de Janeiro',
    country: 'Brazil',
    continent: 'Americas',
    type: ['Beach', 'City', 'Nightlife', 'Cultural'],
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1200&q=80',
    bestTime: 'Dec-Mar',
    budget: '$$',
    tags: ['Copacabana', 'Christ the Redeemer', 'Sugarloaf'],
    description: 'Sprawling coastal city known for Carnival, samba, and sun'
  },

  // AFRICA (4)
  {
    id: 'marrakesh',
    name: 'Marrakesh',
    country: 'Morocco',
    continent: 'Africa',
    type: ['Cultural', 'Budget', 'Food'],
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f0b?w=1200&q=80',
    bestTime: 'Mar-May',
    budget: '$',
    tags: ['Jemaa el-Fnaa', 'Majorelle Garden', 'Medina'],
    description: 'Sensory explosion of spices, textiles and ancient architecture'
  },
  {
    id: 'safari-kenya',
    name: 'Safari Kenya',
    country: 'Kenya',
    continent: 'Africa',
    type: ['Nature', 'Adventure', 'Luxury'],
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&q=80',
    bestTime: 'Jul-Oct',
    budget: '$$$',
    tags: ['Masai Mara', 'Amboseli', 'Tsavo'],
    description: 'Wilderness encounters with the Big Five in their natural habitat'
  },
  {
    id: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    continent: 'Africa',
    type: ['Mountain', 'Beach', 'City'],
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200&q=80',
    bestTime: 'Nov-Mar',
    budget: '$$',
    tags: ['Table Mountain', 'V&A Waterfront', 'Cape Point'],
    description: 'Breathtaking port city beneath the ikonik Table Mountain'
  },
  {
    id: 'seychelles',
    name: 'Seychelles',
    country: 'Seychelles',
    continent: 'Africa',
    type: ['Beach', 'Luxury', 'Nature'],
    image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&q=80',
    bestTime: 'Apr-May',
    budget: '$$$$',
    tags: ['La Digue', 'Mahe', 'Praslin'],
    description: 'Pristine islands with crystal waters and rare granite boulders'
  },

  // MIDDLE EAST (2)
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    continent: 'Middle East',
    type: ['City', 'Luxury', 'Nightlife'],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80',
    bestTime: 'Nov-Mar',
    budget: '$$$$',
    tags: ['Burj Khalifa', 'Palm Jumeirah', 'Desert Safari'],
    description: 'Ultramodern desert city of towering skyscrapers and luxury'
  },
  {
    id: 'istanbul',
    name: 'Istanbul',
    country: 'Turkey',
    continent: 'Middle East',
    type: ['Cultural', 'Food', 'City'],
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80',
    bestTime: 'Apr-May',
    budget: '$$',
    tags: ['Hagia Sophia', 'Grand Bazaar', 'Bosphorus'],
    description: 'Historical bridge between continents with ancient bazaar charm'
  },

  // OCEANIA (2)
  {
    id: 'queenstown',
    name: 'Queenstown',
    country: 'New Zealand',
    continent: 'Oceania',
    type: ['Adventure', 'Mountain', 'Nature'],
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=1200&q=80',
    bestTime: 'Dec-Feb',
    budget: '$$$',
    tags: ['Bungee Jumping', 'Milford Sound', 'Remarkables'],
    description: 'Adventure capital for bungee jumping, skiing, and hiking'
  },
  {
    id: 'sydney',
    name: 'Sydney',
    country: 'Australia',
    continent: 'Oceania',
    type: ['City', 'Beach', 'Cultural'],
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&q=80',
    bestTime: 'Sep-Nov',
    budget: '$$$',
    tags: ['Opera House', 'Bondi Beach', 'Harbour Bridge'],
    description: 'Coastal metropolis with world-famous harbor and surf life'
  }
];

export const deals = [
  {
    id: 1,
    name: 'Bali Package',
    country: 'Indonesia',
    image: 'https://images.pexels.com/photos/1643130/pexels-photo-1643130.jpeg?auto=compress&cs=tinysrgb&w=1200',
    oldPrice: 1200,
    newPrice: 720,
    savings: '40%',
    endDate: '2026-04-20T23:59:59'
  },
  {
    id: 2,
    name: 'Santorini Escape',
    country: 'Greece',
    image: 'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1200',
    oldPrice: 1800,
    newPrice: 999,
    savings: '45%',
    endDate: '2026-04-25T23:59:59'
  },
  {
    id: 3,
    name: 'Parisian Romance',
    country: 'France',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1200',
    oldPrice: 2200,
    newPrice: 1599,
    savings: '27%',
    endDate: '2026-05-15T23:59:59'
  }
];

export const articles = [
  {
    id: 1,
    title: '10 Hidden Gems in Southeast Asia',
    category: 'Destinations',
    excerpt: 'Explore the off-the-beaten-path locations you need to visit this year.',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&h=200&fit=crop',
    author: 'Sarah Jenkins',
    authorAvatar: 'https://i.pravatar.cc/150?u=sarah',
    date: 'Mar 12, 2026'
  },
  {
    id: 2,
    title: 'The Ultimate Bali Packing Guide',
    category: 'Tips',
    excerpt: 'Everything you need to pack for a perfect tropical getaway.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=200&fit=crop',
    author: 'Marcus Chen',
    authorAvatar: 'https://i.pravatar.cc/150?u=marcus',
    date: 'Mar 10, 2026'
  },
  {
    id: 3,
    title: 'Street Food Guide: Tokyo to Marrakesh',
    category: 'Food',
    excerpt: 'A culinary journey through the worlds most ikonik street food markets.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=200&fit=crop',
    author: 'Aria Thorne',
    authorAvatar: 'https://i.pravatar.cc/150?u=aria',
    date: 'Mar 08, 2026'
  }
];

export const testimonials = [
  {
    id: 1,
    text: "Compass & Co. planned my entire Bali trip in minutes. The AI itinerary was perfect!",
    traveler: "Sarah M.",
    location: "New York",
    avatar: "https://i.pravatar.cc/150?u=sarah_m"
  },
  {
    id: 2,
    text: "Found deals I couldn't find anywhere else. Saved $400 on my Santorini trip!",
    traveler: "James K.",
    location: "London",
    avatar: "https://i.pravatar.cc/150?u=james_k"
  },
  {
    id: 3,
    text: "The interactive map helped me discover Patagonia. Best trip of my life!",
    traveler: "Priya S.",
    location: "Mumbai",
    avatar: "https://i.pravatar.cc/150?u=priya_s"
  },
  {
    id: 4,
    text: "24/7 support saved us when our flight got cancelled in Tokyo. Amazing team!",
    traveler: "David L.",
    location: "Sydney",
    avatar: "https://i.pravatar.cc/150?u=david_l"
  },
  {
    id: 5,
    text: "AI packing list was spot on for Morocco. Didn't forget a single thing!",
    traveler: "Emma R.",
    location: "Paris",
    avatar: "https://i.pravatar.cc/150?u=emma_r"
  },
  {
    id: 6,
    text: "Booked Maldives overwater villa at half price. Unbelievable experience!",
    traveler: "Ahmed K.",
    location: "Dubai",
    avatar: "https://i.pravatar.cc/150?u=ahmed_k"
  }
];

export const stats = [
  { value: '25K+', label: 'Happy Travelers' },
  { value: '150+', label: 'Destinations' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '24/7', label: 'Global Support' }
];
