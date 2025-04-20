
import { Link } from 'react-router-dom';
import Hero from '@/components/home/Hero';
import Benefits from '@/components/home/Benefits';
import Categories from '@/components/home/Categories';
import Metrics from '@/components/home/Metrics';
import Newsletter from '@/components/home/Newsletter';
import CallToAction from '@/components/home/CallToAction';
import { mockBusinesses } from '@/lib/businessData';
import BusinessCard from '@/components/BusinessCard';
import PromotionSlider from '@/components/PromotionSlider';

const Index = () => {
  // Get featured businesses (top rated)
  const featuredBusinesses = [...mockBusinesses]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
  
  // Promotions for the week
  const weeklyPromotions = mockBusinesses
    .slice(0, 4)
    .map(business => ({
      id: business.id,
      businessName: business.name,
      title: `${Math.floor(Math.random() * 40 + 10)}% OFF`,
      description: `Special discount on ${business.tags[0]} this week only!`,
      imageUrl: business.imageUrl,
      expiresAt: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000)
    }));

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Benefits />
      <Categories />
      
      {/* Weekly Promotions Section */}
      <section className="py-16 bg-muted dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl text-center mb-2 dark:text-white">Weekly Promotions</h2>
          <p className="text-center text-muted-foreground mb-8">Limited-time offers from local businesses</p>
          <PromotionSlider promotions={weeklyPromotions} />
        </div>
      </section>
      
      {/* Featured Businesses Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-serif text-3xl text-center mb-2 dark:text-white">Top-Rated Local Businesses</h2>
        <p className="text-center text-muted-foreground mb-8">Discover the highest-rated places in your area</p>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredBusinesses.map(business => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link 
            to="/directory" 
            className="bg-localuv-secondary text-white px-6 py-3 rounded-full hover:bg-opacity-90 transition"
          >
            View All Businesses
          </Link>
        </div>
      </section>

      <Metrics />
      <Newsletter />
      <CallToAction />
    </div>
  );
};

export default Index;
