
import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, Settings, BarChart3, Package } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

import ProductsTab from '@/components/vendor/ProductsTab';
import OrdersTab from '@/components/vendor/OrdersTab';
import AnalyticsTab from '@/components/vendor/AnalyticsTab';
import SettingsTab from '@/components/vendor/SettingsTab';

const VendorDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen bg-localuv-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl mb-2">Vendor Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your products, orders and business settings</p>

        <Tabs defaultValue="products">
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
            <ProductsTab />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default VendorDashboard;
