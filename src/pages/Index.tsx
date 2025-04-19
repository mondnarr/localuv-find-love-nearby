
import { Link } from 'react-router-dom';
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
    <div className="min-h-screen bg-localuv-background">
      <header className="bg-localuv-primary text-white py-16 text-center">
        <h1 className="font-serif text-5xl mb-4">LocaLuv</h1>
        <p className="text-xl">Discover. Book. Earn. Love Local.</p>
      </header>
      
      {/* Weekly Promotions Section */}
      <section className="container mx-auto px-4 py-12 bg-white">
        <h2 className="font-serif text-3xl text-center mb-2">Weekly Promotions</h2>
        <p className="text-center text-gray-500 mb-8">Limited-time offers from local businesses</p>
        <PromotionSlider promotions={weeklyPromotions} />
      </section>
      
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-serif text-3xl text-center mb-8">Nearby Businesses</h2>
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
            Explore More
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
