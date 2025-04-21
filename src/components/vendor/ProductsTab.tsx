
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit } from 'lucide-react';

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
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Product Name</th>
                <th className="text-left py-3 px-4">Price</th>
                <th className="text-left py-3 px-4">Inventory</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-left py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{product.name}</td>
                  <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                  <td className="py-3 px-4">{product.inventory}</td>
                  <td className="py-3 px-4">{product.category}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      product.status === 'active' ? 'bg-green-100 text-green-800' : 
                      product.status === 'low-stock' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsTab;
