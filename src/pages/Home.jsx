import Hero from '../sections/Hero';
import TypewriterStrip from '../sections/TypewriterStrip';
import WeatherStrip from '../sections/WeatherStrip';
import FeaturedDestinations from '../sections/FeaturedDestinations';
import HotDeals from '../sections/HotDeals';
import TravelInspiration from '../sections/TravelInspiration';
import Testimonials from '../sections/Testimonials';

export default function Home() {
  return (
    <main className="home-page">
      <Hero />
      <WeatherStrip />
      <TypewriterStrip />
      <FeaturedDestinations />
      <HotDeals />
      <TravelInspiration />
      <Testimonials />
    </main>
  );
}
