
import { useState } from 'react';
import { useProductSearch } from '@/hooks/useProductSearch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { mockBusinesses } from '@/lib/businessData';
import { Product } from '@/types/product';

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
      });
    }
  }
  
  return products;
};

const mockProducts = generateMockProducts();

const ProductSearchDemo = () => {
  const categories = [...new Set(mockProducts.map(product => product.category))];
  
  const { 
    filteredProducts, 
    searchQuery, 
    setSearchQuery,
    updateFilter,
    resetFilters, 
    isFiltering
  } = useProductSearch({ 
    products: mockProducts,
    initialFilters: { priceRange: [0, 100] } 
  });

  const handleCategoryFilter = (category: string) => {
    const currentCategories = filteredProducts.filter(p => p.category === category).length > 0 
      ? [] 
      : [category];
    
    updateFilter('categories', currentCategories);
  };

  return (
    <div className="min-h-screen bg-localuv-background p-8">
      <h1 className="text-3xl font-serif mb-2">Product Search Hook Demo</h1>
      <p className="text-gray-600 mb-8">
        This page demonstrates the useProductSearch hook for filtering products.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Search & Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Search</label>
                <Input 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-2">Categories</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Button 
                      key={category}
                      variant={filteredProducts.some(p => p.category === category) ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleCategoryFilter(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="pt-3 border-t">
                <div className="flex justify-between">
                  <p className="text-sm">
                    {filteredProducts.length} products found
                  </p>
                  {isFiltering && (
                    <Button variant="ghost" size="sm" onClick={resetFilters}>
                      Reset filters
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Business</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map(product => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.businessName}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  {filteredProducts.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                        No products found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductSearchDemo;
