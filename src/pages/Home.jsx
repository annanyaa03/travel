import Hero from '../sections/Hero';
import TypewriterStrip from '../sections/TypewriterStrip';
import FeaturedDestinations from '../sections/FeaturedDestinations';
import AIPlannerTeaser from '../sections/AIPlannerTeaser';
import HotDeals from '../sections/HotDeals';
import TravelInspiration from '../sections/TravelInspiration';
import Testimonials from '../sections/Testimonials';

export default function Home() {
  return (
    <main className="home-page">
      <Hero />
      <TypewriterStrip />
      <FeaturedDestinations />
      <AIPlannerTeaser />
      <HotDeals />
      <TravelInspiration />
      <Testimonials />
    </main>
  );
}
