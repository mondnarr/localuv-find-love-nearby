
import { useState } from 'react';
import { mockBusinesses } from '@/lib/businessData';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import CategoryFilter from '@/components/marketplace/CategoryFilter';
import PriceFilter from '@/components/marketplace/PriceFilter';
import ViewToggle from '@/components/marketplace/ViewToggle';
import ProductGrid from '@/components/marketplace/ProductGrid';

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
  
  const categories = Array.from(new Set(mockProducts.map(product => product.category)));
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <MarketplaceHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/4 lg:w-1/5 space-y-6">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <PriceFilter />
          </div>
          
          <div className="w-full md:w-3/4 lg:w-4/5">
            <ViewToggle 
              viewMode={viewMode}
              setViewMode={setViewMode}
              productCount={filteredProducts.length}
            />
            <ProductGrid 
              products={filteredProducts}
              viewMode={viewMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
