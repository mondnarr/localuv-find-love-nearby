
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingBag, Settings, BarChart3, Package, Plus, Search, Edit } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Mock data for vendor
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

const mockOrders = [
  {
    id: 'ord-001',
    date: '2023-04-15',
    customer: 'John Smith',
    items: ['Handcrafted Coffee Mug (2)', 'Local Honey 8oz (1)'],
    total: 61.98,
    status: 'Shipped'
  },
  {
    id: 'ord-002',
    date: '2023-04-14',
    customer: 'Sarah Johnson',
    items: ['Organic Lavender Soap (3)'],
    total: 25.50,
    status: 'Processing'
  },
  {
    id: 'ord-003',
    date: '2023-04-10',
    customer: 'Mike Williams',
    items: ['Local Honey 8oz (2)'],
    total: 24.00,
    status: 'Delivered'
  }
];

const VendorDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('products');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
      toast({
        title: "Access denied",
        description: "Please login to access the vendor dashboard",
        variant: "destructive"
      });
    }
  }, [user, loading, navigate, toast]);

  if (loading) {
    return <div className="min-h-screen bg-localuv-background flex items-center justify-center">Loading...</div>;
  }

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-localuv-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl mb-2">Vendor Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your products, orders and business settings</p>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="products" className="flex items-center">
              <Package className="mr-2 h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
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
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Order ID</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Customer</th>
                        <th className="text-left py-3 px-4">Items</th>
                        <th className="text-left py-3 px-4">Total</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map(order => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{order.id}</td>
                          <td className="py-3 px-4">{order.date}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4">
                            <ul className="list-disc ml-4">
                              {order.items.map((item, index) => (
                                <li key={index} className="text-sm">{item}</li>
                              ))}
                            </ul>
                          </td>
                          <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="ghost" size="sm">
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500">Analytics dashboard coming soon!</p>
                  <p className="text-sm text-gray-400 mt-2">Track sales, customer engagement and more</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Business Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Business Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label htmlFor="business-name" className="block text-sm font-medium mb-1">
                          Business Name
                        </label>
                        <Input id="business-name" defaultValue="Your Business Name" />
                      </div>
                      <div>
                        <label htmlFor="business-description" className="block text-sm font-medium mb-1">
                          Business Description
                        </label>
                        <textarea 
                          id="business-description" 
                          rows={4}
                          defaultValue="Enter a detailed description of your business..."
                          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">
                          Phone
                        </label>
                        <Input id="phone" defaultValue="(123) 456-7890" />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <Input id="email" defaultValue="your@email.com" />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium mb-1">
                          Address
                        </label>
                        <Input id="address" defaultValue="123 Main St" />
                      </div>
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium mb-1">
                          Website
                        </label>
                        <Input id="website" defaultValue="https://yourbusiness.com" />
                      </div>
                    </div>
                  </div>
                  <Button className="mt-4">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorDashboard;
