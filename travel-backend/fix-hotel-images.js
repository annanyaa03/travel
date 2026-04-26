import supabase from './src/config/supabase.js';

const fixImages = async () => {
  console.log('--- Starting Hotel Image Fix ---');

  const updates = [
    { city: 'Paris', images: [
      'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/2869215/pexels-photo-2869215.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ]},
    { city: 'Tokyo', images: [
      'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1440476/pexels-photo-1440476.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ]},
    { city: 'Dubai', images: [
      'https://images.pexels.com/photos/3787839/pexels-photo-3787839.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ]},
    { city: 'London', images: [
      'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ]},
    { city: 'New York', images: [
      'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ]},
    { city: 'Singapore', images: [
      'https://images.pexels.com/photos/3224236/pexels-photo-3224236.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ]},
    { city: 'Santorini', images: [
      'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/4388164/pexels-photo-4388164.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ]},
    { city: 'Maldives', images: [
      'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ]},
    { city: 'Bangkok', images: [
      'https://images.pexels.com/photos/1031593/pexels-photo-1031593.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ]},
    { city: 'Sydney', images: [
      'https://images.pexels.com/photos/1619854/pexels-photo-1619854.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ]},
    { city: 'Bali', images: [
      'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ]},
    { city: 'Rome', images: [
      'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ]},
    { city: 'Marrakech', images: [
      'https://images.pexels.com/photos/4846097/pexels-photo-4846097.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/3889855/pexels-photo-3889855.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/847402/pexels-photo-847402.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ]},
    { cities: ['Udaipur', 'Agra', 'Jaipur', 'New Delhi', 'Mumbai'], images: [
      'https://images.pexels.com/photos/3581369/pexels-photo-3581369.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ]},
    { cities: ['Nairobi', 'Serengeti', 'Masai Mara', 'Ngorongoro', 'Zanzibar'], images: [
      'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/631292/pexels-photo-631292.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/2739664/pexels-photo-2739664.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ]},
    { cities: ['Machu Picchu', 'Cusco', 'Sacred Valley'], images: [
      'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/3889891/pexels-photo-3889891.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
      'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop'
    ]}
  ];

  for (const update of updates) {
    if (update.city) {
      console.log(`Updating ${update.city}...`);
      const { error } = await supabase
        .from('hotels')
        .update({ images: update.images })
        .eq('city', update.city);
      if (error) console.error(`Error updating ${update.city}:`, error.message);
    } else if (update.cities) {
      console.log(`Updating ${update.cities.join(', ')}...`);
      const { error } = await supabase
        .from('hotels')
        .update({ images: update.images })
        .in('city', update.cities);
      if (error) console.error(`Error updating ${update.cities.join(', ')}:`, error.message);
    }
  }

  console.log('--- Hotel Image Fix Completed ---');
};

fixImages();
