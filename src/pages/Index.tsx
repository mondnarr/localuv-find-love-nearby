
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockBusinesses } from '@/lib/businessData';
import BusinessCard from '@/components/BusinessCard';
import PromotionSlider from '@/components/PromotionSlider';
import { Star, TrendingUp, Award, Users, MapPin, ShoppingBag, Heart, Shield, Coffee } from 'lucide-react';

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

  // Categories with their icons and counts
  const categories = [
    { name: 'Restaurants', count: 156, icon: ShoppingBag },
    { name: 'Beauty & Spa', count: 89, icon: Star },
    { name: 'Home Services', count: 134, icon: MapPin },
    { name: 'Fitness', count: 67, icon: Users },
    { name: 'Shopping', count: 245, icon: ShoppingBag },
    { name: 'Entertainment', count: 78, icon: Award }
  ];

  // Success metrics
  const metrics = [
    { label: 'Active Users', value: '50k+', icon: Users },
    { label: 'Local Businesses', value: '1000+', icon: ShoppingBag },
    { label: 'Customer Reviews', value: '25k+', icon: Star },
    { label: 'Monthly Sales', value: '$2M+', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-localuv-primary to-localuv-secondary text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2676&q=80"
            alt="City streets"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl md:text-6xl mb-6 leading-tight">
              Discover & Support Your Local Community
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Connect with amazing local businesses, find unique products, and earn rewards while supporting your community.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-localuv-primary hover:bg-white/90">
                Explore Directory
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Join as Business
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/50 dark:bg-gray-800/50">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl text-center mb-12 dark:text-white">Why Choose LocaLuv?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/50">
              <CardContent className="p-6 text-center">
                <div className="rounded-full bg-localuv-primary/10 p-3 w-12 h-12 mx-auto mb-4">
                  <Heart className="w-6 h-6 text-localuv-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Support Local</h3>
                <p className="text-muted-foreground">Help your community thrive by supporting local businesses and entrepreneurs.</p>
              </CardContent>
            </Card>
            <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/50">
              <CardContent className="p-6 text-center">
                <div className="rounded-full bg-localuv-primary/10 p-3 w-12 h-12 mx-auto mb-4">
                  <Shield className="w-6 h-6 text-localuv-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Trusted Platform</h3>
                <p className="text-muted-foreground">Verified reviews and secure transactions for peace of mind.</p>
              </CardContent>
            </Card>
            <Card className="bg-background/50 backdrop-blur-sm border-0 shadow-lg dark:bg-gray-800/50">
              <CardContent className="p-6 text-center">
                <div className="rounded-full bg-localuv-primary/10 p-3 w-12 h-12 mx-auto mb-4">
                  <Coffee className="w-6 h-6 text-localuv-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Unique Experiences</h3>
                <p className="text-muted-foreground">Discover hidden gems and extraordinary local experiences.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="font-serif text-3xl text-center mb-2 dark:text-white">Popular Categories</h2>
        <p className="text-center text-muted-foreground mb-8">Explore businesses by category</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(category => (
            <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800/50">
              <CardContent className="p-6 text-center">
                <category.icon className="w-8 h-8 mx-auto mb-3 text-localuv-primary" />
                <h3 className="font-medium mb-1 dark:text-white">{category.name}</h3>
                <span className="text-sm text-muted-foreground">{category.count} places</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      
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

      {/* Success Metrics Section */}
      <section className="bg-gradient-to-r from-localuv-primary to-localuv-secondary py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map(metric => (
              <div key={metric.label} className="text-center">
                <metric.icon className="w-8 h-8 mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{metric.value}</div>
                <div className="text-white/80">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl mb-4 dark:text-white">Stay Updated with Local Happenings</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter for the latest updates, exclusive offers, and community news.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            />
            <Button>Subscribe Now</Button>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="font-serif text-3xl mb-4 dark:text-white">Ready to Join Our Community?</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Whether you're a local business owner or a customer looking to support local, 
          we're here to help you connect and thrive together.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="bg-localuv-primary">
            Create Account
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
