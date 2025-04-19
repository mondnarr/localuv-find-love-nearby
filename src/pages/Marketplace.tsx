
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mockBusinesses } from '@/lib/businessData';

// Generate mock products based on businesses
const generateMockProducts = () => {
  const products = [];
  
  for (const business of mockBusinesses) {
    // Generate 1-3 products per business
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
      });
    }
  }
  
  return products;
};

const mockProducts = generateMockProducts();

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Extract unique categories
  const categories = Array.from(new Set(mockProducts.map(product => product.category)));
  
  // Filter products
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-localuv-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl mb-8">Local Marketplace</h1>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="font-serif text-xl mb-4">Categories</h2>
              <div className="space-y-2">
                <div 
                  className={`px-3 py-2 cursor-pointer rounded-md ${!selectedCategory ? 'bg-localuv-primary/10 font-medium' : 'hover:bg-gray-100'}`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </div>
                {categories.map(category => (
                  <div 
                    key={category}
                    className={`px-3 py-2 cursor-pointer rounded-md ${selectedCategory === category ? 'bg-localuv-primary/10 font-medium' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Main content */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {/* Search bar */}
            <div className="mb-6 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Products grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1">{product.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{product.businessName}</p>
                    <p className="text-lg font-bold mb-3">${product.price}</p>
                    <Button className="w-full">Add to Cart</Button>
                  </div>
                </Card>
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center p-8">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
