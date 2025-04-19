
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  CalendarCheck,
  Box
} from 'lucide-react';

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackingResult, setTrackingResult] = useState<null | {
    orderNumber: string;
    status: 'processing' | 'shipped' | 'out-for-delivery' | 'delivered';
    items: string[];
    shippedDate?: string;
    estimatedDelivery?: string;
    deliveredDate?: string;
    trackingNumber?: string;
  }>(null);

  const handleTrackOrder = () => {
    // In a real app, this would make an API call
    // For demo purposes, we'll use mock data
    setTrackingResult({
      orderNumber: orderNumber || 'ORD-2023-04781',
      status: 'shipped',
      items: ['Handcrafted Coffee Mug (2)', 'Local Honey 8oz (1)'],
      shippedDate: '2023-04-17',
      estimatedDelivery: '2023-04-22',
      trackingNumber: 'TRK92837465'
    });
  };

  return (
    <div className="min-h-screen bg-localuv-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl mb-8">Track Your Order</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Track by Order Number</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="order-number" className="block text-sm font-medium mb-1">
                    Order Number
                  </label>
                  <Input
                    id="order-number"
                    placeholder="e.g., ORD-2023-04781"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    placeholder="Enter the email used for your order"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleTrackOrder}>
                  Track Order
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {trackingResult && (
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    <span>Order #{trackingResult.orderNumber}</span>
                    <span className="text-sm font-normal">
                      {trackingResult.trackingNumber && (
                        <>Tracking #: {trackingResult.trackingNumber}</>
                      )}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between mb-6">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trackingResult.status === 'processing' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                          <Clock className="h-5 w-5" />
                        </div>
                        <span className="text-xs mt-1">Processing</span>
                      </div>
                      <div className={`flex-1 h-1 self-center ${trackingResult.status === 'processing' ? 'bg-gray-200' : 'bg-green-500'}`} />
                      
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trackingResult.status === 'shipped' ? 'bg-blue-100 text-blue-600' : trackingResult.status === 'processing' ? 'bg-gray-100 text-gray-400' : 'bg-green-100 text-green-600'}`}>
                          <Package className="h-5 w-5" />
                        </div>
                        <span className="text-xs mt-1">Shipped</span>
                      </div>
                      <div className={`flex-1 h-1 self-center ${trackingResult.status === 'processing' || trackingResult.status === 'shipped' ? 'bg-gray-200' : 'bg-green-500'}`} />
                      
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trackingResult.status === 'out-for-delivery' ? 'bg-blue-100 text-blue-600' : (trackingResult.status === 'processing' || trackingResult.status === 'shipped') ? 'bg-gray-100 text-gray-400' : 'bg-green-100 text-green-600'}`}>
                          <Truck className="h-5 w-5" />
                        </div>
                        <span className="text-xs mt-1">Out for Delivery</span>
                      </div>
                      <div className={`flex-1 h-1 self-center ${trackingResult.status !== 'delivered' ? 'bg-gray-200' : 'bg-green-500'}`} />
                      
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trackingResult.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <span className="text-xs mt-1">Delivered</span>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 mt-2">
                      <h3 className="font-medium mb-2">Items in this Order:</h3>
                      <ul className="list-disc pl-5 mb-4">
                        {trackingResult.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {trackingResult.shippedDate && (
                          <div className="flex items-center">
                            <CalendarCheck className="h-5 w-5 mr-2 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">Shipped Date</p>
                              <p className="font-medium">{trackingResult.shippedDate}</p>
                            </div>
                          </div>
                        )}
                        
                        {trackingResult.estimatedDelivery && (
                          <div className="flex items-center">
                            <Box className="h-5 w-5 mr-2 text-gray-500" />
                            <div>
                              <p className="text-xs text-gray-500">Est. Delivery</p>
                              <p className="font-medium">{trackingResult.estimatedDelivery}</p>
                            </div>
                          </div>
                        )}
                        
                        {trackingResult.deliveredDate && (
                          <div className="flex items-center">
                            <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                            <div>
                              <p className="text-xs text-gray-500">Delivered On</p>
                              <p className="font-medium">{trackingResult.deliveredDate}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
