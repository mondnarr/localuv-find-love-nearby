
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit } from 'lucide-react';
import { DataTable, Column } from '@/components/ui/data-table';
import { StatusBadge } from '@/components/ui/status-badge';

interface Product {
  id: string;
  name: string;
  price: number;
  inventory: number;
  category: string;
  status: string;
}

const mockProducts = [
  {
    id: '1',
    name: 'Handcrafted Coffee Mug',
    price: 24.99,
    inventory: 15,
    category: 'Home Goods',
    status: 'active'
  },
  {
    id: '2',
    name: 'Organic Lavender Soap',
    price: 8.50,
    inventory: 32,
    category: 'Health & Beauty',
    status: 'active'
  },
  {
    id: '3',
    name: 'Local Honey 8oz',
    price: 12.00,
    inventory: 8,
    category: 'Food',
    status: 'low-stock'
  }
];

const ProductsTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: Column<Product>[] = [
    {
      header: "Product Name",
      accessor: "name"
    },
    {
      header: "Price",
      accessor: (product: Product) => `$${product.price.toFixed(2)}` as React.ReactNode
    },
    {
      header: "Inventory",
      accessor: "inventory"
    },
    {
      header: "Category",
      accessor: "category"
    },
    {
      header: "Status",
      cell: (product: Product) => <StatusBadge status={product.status} />
    },
    {
      header: "Actions",
      cell: () => (
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      )
    }
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Product Management</CardTitle>
        <Button className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </CardHeader>
      <CardContent>
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
        
        <DataTable columns={columns} data={filteredProducts} />
      </CardContent>
    </Card>
  );
};

export default ProductsTab;
