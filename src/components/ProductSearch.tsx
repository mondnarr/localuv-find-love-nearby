
import { useState } from 'react';
import { useProductSearch } from '@/hooks/useProductSearch';
import { Product } from '@/types/product';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface ProductSearchProps {
  products: Product[];
  onProductsFiltered?: (products: Product[]) => void;
}

const ProductSearch = ({ products, onProductsFiltered }: ProductSearchProps) => {
  const categories = [...new Set(products.map(product => product.category))];
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  
  const {
    filteredProducts,
    searchQuery,
    setSearchQuery,
    updateFilter,
    resetFilters,
    isFiltering
  } = useProductSearch({ products });
  
  // Notify parent component when filtered products change
  useState(() => {
    onProductsFiltered?.(filteredProducts);
  }, [filteredProducts, onProductsFiltered]);
  
  // Handle price range change
  const handlePriceRangeChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setPriceRange(range);
    updateFilter('priceRange', range);
  };
  
  // Handle category selection
  const handleCategoryChange = (category: string) => {
    updateFilter('categories', category ? [category] : []);
  };
  
  // Handle sort by selection
  const handleSortChange = (value: string) => {
    updateFilter('sortBy', value as any);
  };
  
  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input 
            type="search" 
            placeholder="Search products..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select onValueChange={handleSortChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Relevance</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
            <SelectItem value="rating-desc">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium block mb-2">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
          <Slider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            className="mx-2"
          />
        </div>
        
        <div className="flex justify-between">
          <p className="text-sm text-gray-500">
            {filteredProducts.length} products found
          </p>
          
          {isFiltering && (
            <Button variant="outline" size="sm" onClick={resetFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
