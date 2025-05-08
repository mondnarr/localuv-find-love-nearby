
import React, { useState } from 'react';
import { Plus, Search, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/types/product';
import StatusBadge from '@/components/ui/status-badge';
import DataTable from '@/components/ui/data-table';

// Mock products
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Handcrafted Wooden Bowl',
    description: 'A beautiful handcrafted wooden bowl made from reclaimed oak.',
    price: 45,
    imageUrl: '/placeholder.svg',
    businessId: 'business-1',
    businessName: 'Woodland Crafts',
    category: 'Home Goods',
    status: 'active',
    inventory: 12,
    reviewCount: 24,
    rating: 4.5
  },
  {
    id: '2',
    name: 'Artisanal Honey',
    description: 'Local wildflower honey harvested from urban beehives.',
    price: 12,
    imageUrl: '/placeholder.svg',
    businessId: 'business-1',
    businessName: 'Urban Apiaries',
    category: 'Food & Drink',
    status: 'out_of_stock',
    inventory: 0,
    reviewCount: 47,
    rating: 5
  },
  {
    id: '3',
    name: 'Hand-poured Candle',
    description: 'Soy wax candle with essential oil fragrances.',
    price: 22,
    imageUrl: '/placeholder.svg',
    businessId: 'business-1',
    businessName: 'Glow & Co.',
    category: 'Home Goods',
    status: 'draft',
    inventory: 35,
    reviewCount: 8,
    rating: 4
  }
];

const ProductsTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>(mockProducts);
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Table columns with fixed TypeScript errors
  const columns = [
    {
      header: 'Product',
      accessor: 'product', // Add accessor property
      cell: (product: Product) => (
        <div className="flex items-center gap-3">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-10 h-10 rounded object-cover"
          />
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-xs text-gray-500">{product.category}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Price',
      accessor: 'price', // Add accessor property
      cell: (product: Product) => <span>${product.price.toFixed(2)}</span>
    },
    {
      header: 'Inventory',
      accessor: 'inventory', // Add accessor property
      cell: (product: Product) => <span>{product.inventory || 0}</span>
    },
    {
      header: 'Status',
      accessor: 'status', // Add accessor property
      cell: (product: Product) => (
        <StatusBadge status={product.status || 'draft'} />
      )
    },
    {
      header: 'Actions',
      accessor: 'actions', // Add accessor property
      cell: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">Edit</Button>
          <Button variant="ghost" size="sm">View</Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="h-10">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button className="h-10">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <DataTable 
            columns={columns}
            data={filteredProducts}
            emptyMessage="No products found."
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsTab;
