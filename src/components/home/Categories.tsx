
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Star, MapPin, Users, Award, Coffee } from 'lucide-react';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    { name: 'Restaurants', count: 156, icon: Coffee },
    { name: 'Beauty & Spa', count: 89, icon: Star },
    { name: 'Home Services', count: 134, icon: MapPin },
    { name: 'Fitness', count: 67, icon: Users },
    { name: 'Shopping', count: 245, icon: ShoppingBag },
    { name: 'Entertainment', count: 78, icon: Award }
  ];

  return (
    <section className="container mx-auto px-4 py-12 sm:py-16">
      <h2 className="font-serif text-2xl sm:text-3xl text-center mb-2 dark:text-white">Popular Categories</h2>
      <p className="text-sm sm:text-base text-center text-muted-foreground mb-6 sm:mb-8">Explore businesses by category</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {categories.map((category, index) => (
          <Link key={category.name} to={`/directory?category=${category.name.toLowerCase()}`}>
            <Card 
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer dark:bg-gray-800/50 group"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fade-in 0.5s ease-out forwards',
              }}
            >
              <CardContent className="p-4 sm:p-6 text-center">
                <category.icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-localuv-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                <h3 className="text-sm sm:text-base font-medium mb-1 dark:text-white group-hover:text-localuv-primary transition-colors">{category.name}</h3>
                <span className="text-xs sm:text-sm text-muted-foreground">{category.count} places</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
