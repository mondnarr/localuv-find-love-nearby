
import { Link } from 'react-router-dom';
import { mockBusinesses } from '@/lib/businessData';
import BusinessCard from '@/components/BusinessCard';

const Index = () => {
  return (
    <div className="min-h-screen bg-localuv-background">
      <header className="bg-localuv-primary text-white py-16 text-center">
        <h1 className="font-serif text-5xl mb-4">LocaLuv</h1>
        <p className="text-xl">Discover. Book. Earn. Love Local.</p>
      </header>
      
      <section className="container mx-auto px-4 py-12">
        <h2 className="font-serif text-3xl text-center mb-8">Nearby Businesses</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {mockBusinesses.map(business => (
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
