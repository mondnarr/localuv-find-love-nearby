
import { useState } from 'react';
import { Search, Filter, Tags, ShoppingBag, Star, MapPin, Package, Heart, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import { mockBusinesses } from '@/lib/businessData';

const generateMockProducts = () => {
  const products = [];
  
  for (const business of mockBusinesses) {
    const numProducts = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < numProducts; i++) {
      products.push({
        id: `${business.id}-product-${i}`,
        name: `${business.name} Product ${i + 1}`,
        description: `A great product from ${business.name}`,
        price: Math.floor(Math.random() * 50) + 10,
        imageUrl: business.imageUrl,
        businessId: business.id,
        businessName: business.name,
        category: business.category,
        reviewCount: Math.floor(Math.random() * 100),
        rating: Math.floor(Math.random() * 5) + 1,
      });
    }
  }
  
  return products;
};

const mockProducts = generateMockProducts();

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const categories = Array.from(new Set(mockProducts.map(product => product.category)));
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      vendor: product.businessName,
    });
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <div className="relative bg-gradient-to-r from-localuv-primary to-localuv-secondary py-16">
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
            Local Marketplace
          </h1>
          <p className="text-xl text-white/90 text-center max-w-2xl mx-auto mb-8">
            Discover unique products from local businesses in your community
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search for products..." 
              className="pl-12 h-12 text-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4 lg:w-1/5 space-y-6">
            <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Tags className="h-5 w-5 text-localuv-primary" />
                <h2 className="font-serif text-xl dark:text-white">Categories</h2>
              </div>
              <div className="space-y-2">
                <div 
                  className={`px-3 py-2 cursor-pointer rounded-md flex items-center gap-2 ${
                    !selectedCategory 
                      ? 'bg-localuv-primary/10 text-localuv-primary dark:bg-localuv-primary/20' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
                  }`}
                  onClick={() => setSelectedCategory(null)}
                >
                  <ShoppingBag className="h-4 w-4" />
                  All Categories
                </div>
                {categories.map(category => (
                  <div 
                    key={category}
                    className={`px-3 py-2 cursor-pointer rounded-md flex items-center gap-2 ${
                      selectedCategory === category 
                        ? 'bg-localuv-primary/10 text-localuv-primary dark:bg-localuv-primary/20' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
                    }`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <MapPin className="h-4 w-4" />
                    {category}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="h-5 w-5 text-localuv-primary" />
                <h2 className="font-serif text-xl dark:text-white">Filters</h2>
              </div>
              <div className="space-y-4 dark:text-gray-300">
                <h3 className="font-medium">Price Range</h3>
                <div className="flex gap-2">
                  <Input 
                    type="number" 
                    placeholder="Min" 
                    className="w-1/2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <Input 
                    type="number" 
                    placeholder="Max" 
                    className="w-1/2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            </Card>
          </div>
          
          <div className="w-full md:w-3/4 lg:w-4/5">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                {filteredProducts.length} products found
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={viewMode === 'grid' ? 'bg-localuv-primary/10' : ''}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={viewMode === 'list' ? 'bg-localuv-primary/10' : ''}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </div>
            </div>

            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map(product => (
                <Card 
                  key={product.id} 
                  className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  <div className={`relative group ${viewMode === 'list' ? 'w-48' : 'h-48'}`}>
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary">
                        <Eye className="h-4 w-4 mr-1" />
                        Quick View
                      </Button>
                      <Button size="icon" variant="secondary">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium dark:text-white mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{product.businessName}</p>
                      </div>
                      <Badge variant="secondary" className="dark:bg-gray-700">
                        {product.category}
                      </Badge>
                    </div>
                    {viewMode === 'list' && (
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-lg font-bold dark:text-white">${product.price}</p>
                      <Button 
                        size="sm" 
                        className="dark:bg-localuv-primary dark:text-white"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingBag className="h-4 w-4 mr-1" />
                        Add to Cart
                      </Button>
                    </div>
                    <div className="flex items-center mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= (product.rating || 0)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                        {product.reviewCount} reviews
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
