
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ShoppingBag, Settings, Star, Clock } from 'lucide-react';
import { mockBusinesses } from '@/lib/businessData';

// Mock user data
const mockUser = {
  name: "Jane Smith",
  email: "jane.smith@example.com",
  joined: "January 2023",
  favorites: [mockBusinesses[0], mockBusinesses[2]],
  orders: [
    {
      id: "ord-001",
      date: "2023-04-15",
      business: mockBusinesses[1],
      items: ["Product 1", "Product 2"],
      total: 59.98,
      status: "Delivered"
    },
    {
      id: "ord-002",
      date: "2023-03-22",
      business: mockBusinesses[0],
      items: ["Product 3"],
      total: 24.99,
      status: "Delivered"
    }
  ]
};

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");

  return (
    <div className="min-h-screen bg-localuv-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl mb-2">My Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome back, {mockUser.name}</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left sidebar with user info */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h2 className="text-xl font-medium text-center">{mockUser.name}</h2>
                  <p className="text-gray-600 text-center">{mockUser.email}</p>
                </div>
                <div className="text-sm text-gray-500">
                  <p>Member since: {mockUser.joined}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content area */}
          <div className="md:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="orders" className="flex items-center">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Orders
                </TabsTrigger>
                <TabsTrigger value="favorites" className="flex items-center">
                  <Heart className="mr-2 h-4 w-4" />
                  Favorites
                </TabsTrigger>
                <TabsTrigger value="reviews" className="flex items-center">
                  <Star className="mr-2 h-4 w-4" />
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {mockUser.orders.length > 0 ? (
                      <div className="space-y-4">
                        {mockUser.orders.map(order => (
                          <div key={order.id} className="border-b pb-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">Order #{order.id}</h3>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <Clock className="mr-1 h-4 w-4" />
                                  <span>{order.date}</span>
                                </div>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="mt-2">{order.business.name}</p>
                            <p className="text-sm text-gray-600">{order.items.join(", ")}</p>
                            <p className="font-bold mt-2">${order.total.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">You haven't placed any orders yet.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="favorites">
                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Businesses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {mockUser.favorites.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {mockUser.favorites.map(business => (
                          <div key={business.id} className="border rounded-lg overflow-hidden">
                            <div className="h-40">
                              <img 
                                src={business.imageUrl} 
                                alt={business.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium">{business.name}</h3>
                              <p className="text-sm text-gray-600">{business.category}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">You haven't added any favorites yet.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500">You haven't written any reviews yet.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-500 mb-4">Manage your account settings and preferences.</p>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Notifications</h3>
                        <div className="flex items-center justify-between border-b py-2">
                          <span>Email notifications</span>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between border-b py-2">
                          <span>Order updates</span>
                          <input type="checkbox" className="toggle" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <span>Promotional emails</span>
                          <input type="checkbox" className="toggle" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
