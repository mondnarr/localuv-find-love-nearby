
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
  Box,
  Search,
  ShieldCheck
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
    <div className="min-h-screen bg-localuv-background dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl mb-8 dark:text-white">Track Your Order</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="dark:bg-gray-800 shadow-md border-0 dark:border dark:border-gray-700">
              <CardHeader className="border-b dark:border-gray-700">
                <CardTitle className="dark:text-white flex items-center">
                  <Search className="mr-2 h-5 w-5 text-localuv-primary dark:text-localuv-secondary" />
                  Track by Order Number
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="text-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1617347454431-f49d7ff5c3b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                    alt="Package Tracking" 
                    className="w-32 h-32 object-cover mx-auto rounded-full mb-4"
                  />
                </div>
                <div>
                  <label htmlFor="order-number" className="block text-sm font-medium mb-1 dark:text-gray-200">
                    Order Number
                  </label>
                  <Input
                    id="order-number"
                    placeholder="e.g., ORD-2023-04781"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1 dark:text-gray-200">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    placeholder="Enter the email used for your order"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <Button className="w-full bg-localuv-primary hover:bg-localuv-primary/90 mt-2" onClick={handleTrackOrder}>
                  Track Order
                </Button>
              </CardContent>
            </Card>
            
            {/* Customer Support Information */}
            <Card className="mt-6 dark:bg-gray-800 shadow-md border-0 dark:border dark:border-gray-700">
              <CardHeader className="border-b dark:border-gray-700">
                <CardTitle className="dark:text-white flex items-center">
                  <ShieldCheck className="mr-2 h-5 w-5 text-localuv-primary dark:text-localuv-secondary" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="mb-4 dark:text-gray-300">Having trouble finding your order? Our customer service team is here to help.</p>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="bg-localuv-primary/10 dark:bg-localuv-primary/20 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-localuv-primary dark:text-localuv-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="dark:text-gray-200">1-800-LOCALUV</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-localuv-primary/10 dark:bg-localuv-primary/20 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-localuv-primary dark:text-localuv-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="dark:text-gray-200">support@localuv.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {trackingResult && (
            <div className="lg:col-span-2">
              <Card className="dark:bg-gray-800 shadow-md border-0 dark:border dark:border-gray-700">
                <CardHeader className="border-b dark:border-gray-700">
                  <CardTitle className="flex justify-between dark:text-white">
                    <span>Order #{trackingResult.orderNumber}</span>
                    <span className="text-sm font-normal dark:text-gray-300">
                      {trackingResult.trackingNumber && (
                        <>Tracking #: {trackingResult.trackingNumber}</>
                      )}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-8">
                    <div className="flex justify-between mb-8">
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${trackingResult.status === 'processing' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400'}`}>
                          <Clock className="h-6 w-6" />
                        </div>
                        <span className="text-xs mt-2 dark:text-gray-300">Processing</span>
                      </div>
                      <div className={`flex-1 h-1 self-center ${trackingResult.status === 'processing' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-green-500 dark:bg-green-600'}`} />
                      
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${trackingResult.status === 'shipped' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : trackingResult.status === 'processing' ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500' : 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400'}`}>
                          <Package className="h-6 w-6" />
                        </div>
                        <span className="text-xs mt-2 dark:text-gray-300">Shipped</span>
                      </div>
                      <div className={`flex-1 h-1 self-center ${trackingResult.status === 'processing' || trackingResult.status === 'shipped' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-green-500 dark:bg-green-600'}`} />
                      
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${trackingResult.status === 'out-for-delivery' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : (trackingResult.status === 'processing' || trackingResult.status === 'shipped') ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500' : 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400'}`}>
                          <Truck className="h-6 w-6" />
                        </div>
                        <span className="text-xs mt-2 dark:text-gray-300">Out for Delivery</span>
                      </div>
                      <div className={`flex-1 h-1 self-center ${trackingResult.status !== 'delivered' ? 'bg-gray-200 dark:bg-gray-700' : 'bg-green-500 dark:bg-green-600'}`} />
                      
                      <div className="flex flex-col items-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${trackingResult.status === 'delivered' ? 'bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400' : 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500'}`}>
                          <CheckCircle className="h-6 w-6" />
                        </div>
                        <span className="text-xs mt-2 dark:text-gray-300">Delivered</span>
                      </div>
                    </div>
                    
                    <div className="border-t dark:border-gray-700 pt-6 mt-4">
                      <div className="flex mb-6">
                        <img 
                          src="https://images.unsplash.com/photo-1595246140962-93118ee24bfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
                          alt="Delivery Truck" 
                          className="w-24 h-24 object-cover rounded-lg mr-6 hidden sm:block"
                        />
                        <div>
                          <h3 className="font-medium mb-2 dark:text-white">Items in this Order:</h3>
                          <ul className="list-disc pl-5 mb-4 dark:text-gray-300">
                            {trackingResult.items.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {trackingResult.shippedDate && (
                          <div className="flex items-center p-3 border rounded-lg dark:border-gray-700">
                            <CalendarCheck className="h-8 w-8 mr-3 text-localuv-primary dark:text-localuv-secondary" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Shipped Date</p>
                              <p className="font-medium dark:text-white">{trackingResult.shippedDate}</p>
                            </div>
                          </div>
                        )}
                        
                        {trackingResult.estimatedDelivery && (
                          <div className="flex items-center p-3 border rounded-lg dark:border-gray-700">
                            <Box className="h-8 w-8 mr-3 text-localuv-primary dark:text-localuv-secondary" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Est. Delivery</p>
                              <p className="font-medium dark:text-white">{trackingResult.estimatedDelivery}</p>
                            </div>
                          </div>
                        )}
                        
                        {trackingResult.deliveredDate && (
                          <div className="flex items-center p-3 border rounded-lg dark:border-gray-700">
                            <CheckCircle className="h-8 w-8 mr-3 text-green-500 dark:text-green-400" />
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Delivered On</p>
                              <p className="font-medium dark:text-white">{trackingResult.deliveredDate}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Map Visualization Placeholder */}
                      <div className="mt-6 border rounded-lg p-4 dark:border-gray-700">
                        <h4 className="text-sm font-medium mb-2 dark:text-white">Delivery Route</h4>
                        <div className="bg-gray-100 dark:bg-gray-700 h-40 rounded flex items-center justify-center">
                          <span className="text-gray-500 dark:text-gray-400">Map visualization would appear here</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!trackingResult && (
            <div className="lg:col-span-2">
              <Card className="h-full flex flex-col justify-center items-center p-8 dark:bg-gray-800 shadow-md border-0 dark:border dark:border-gray-700">
                <img 
                  src="https://images.unsplash.com/photo-1586769852836-bc648fab1f2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                  alt="Track your package" 
                  className="w-64 h-64 object-contain mb-6"
                />
                <h3 className="text-2xl font-medium mb-2 dark:text-white">Track Your Package</h3>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-4 max-w-md">
                  Enter your order number and email to see the current status of your delivery.
                </p>
                <div className="flex items-center text-gray-500 dark:text-gray-400">
                  <Package className="h-5 w-5 mr-2 text-localuv-primary dark:text-localuv-secondary" />
                  <span>Real-time tracking information</span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
