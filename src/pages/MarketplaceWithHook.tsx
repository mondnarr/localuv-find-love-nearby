
import { useState } from 'react';
import { Package } from 'lucide-react';
import { Product } from '@/types/product';
import { mockBusinesses } from '@/lib/businessData';
import { useProductSearch } from '@/hooks/useProductSearch';
import MarketplaceHeader from '@/components/marketplace/MarketplaceHeader';
import CategoryFilter from '@/components/marketplace/CategoryFilter';
import PriceFilter from '@/components/marketplace/PriceFilter';
import ViewToggle from '@/components/marketplace/ViewToggle';
import ProductGrid from '@/components/marketplace/ProductGrid';
import Footer from '@/components/Footer';

// Generate mock products
const generateMockProducts = () => {
  const products: Product[] = [];
  
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

// Extract unique categories from products
const getUniqueCategories = (products: Product[]): string[] => {
  const categories = products.map(product => product.category);
  return [...new Set(categories)];
};

const MarketplaceWithHook = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const uniqueCategories = getUniqueCategories(mockProducts);
  
  const { 
    filteredProducts, 
    searchQuery, 
    setSearchQuery,
    updateFilter 
  } = useProductSearch({
    products: mockProducts,
    initialFilters: {
      priceRange: [0, 100]
    }
  });

  // Update filters when category or price range changes
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    updateFilter('categories', category ? [category] : []);
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    updateFilter('priceRange', [min, max]);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      {/* Header with search */}
      <MarketplaceHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar filters */}
          <div className="md:col-span-1 space-y-6">
            <CategoryFilter 
              categories={uniqueCategories} 
              selectedCategory={selectedCategory} 
              setSelectedCategory={handleCategoryChange} 
            />
            <PriceFilter 
              minPrice={priceRange[0]} 
              maxPrice={priceRange[1]} 
              onPriceChange={handlePriceChange} 
            />
          </div>

          {/* Main content */}
          <div className="md:col-span-3">
            <ViewToggle 
              viewMode={viewMode} 
              setViewMode={setViewMode} 
              productCount={filteredProducts.length} 
            />

            {filteredProducts.length > 0 ? (
              <div className="animate-fade-in">
                <ProductGrid 
                  products={filteredProducts} 
                  viewMode={viewMode} 
                />
              </div>
            ) : (
              <div className="text-center py-12 animate-fade-in">
                <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MarketplaceWithHook;
