
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, ArrowRight, CreditCard, Shield, Truck, Package } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock cart items
const mockCartItems = [
  {
    id: '1',
    name: 'Handcrafted Coffee Mug',
    price: 24.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    vendor: 'Vintage Finds'
  },
  {
    id: '3',
    name: 'Local Honey 8oz',
    price: 12.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1587049352851-8d4b89133611?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    vendor: 'Fresh Market Grocery'
  }
];

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState('');
  const { toast } = useToast();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      description: "Item removed from cart",
    });
  };

  const handleApplyPromo = () => {
    if (!promoCode) return;
    
    toast({
      title: "Invalid code",
      description: "The promo code you entered is not valid.",
      variant: "destructive"
    });
    setPromoCode('');
  };

  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-localuv-background dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl mb-8 dark:text-white">Your Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h2 className="text-xl font-medium mb-4 dark:text-white">Cart Items ({cartItems.length})</h2>
                
                {cartItems.map(item => (
                  <div key={item.id} className="flex border-b dark:border-gray-700 py-4">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    
                    <div className="flex-1 ml-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between">
                        <div>
                          <h3 className="font-medium dark:text-white">{item.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Sold by {item.vendor}</p>
                        </div>
                        <div className="text-right mt-2 sm:mt-0">
                          <p className="font-bold dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border rounded-md dark:border-gray-600">
                          <button 
                            className="px-3 py-1 dark:text-white"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-x dark:border-gray-600 dark:text-white">{item.quantity}</span>
                          <button 
                            className="px-3 py-1 dark:text-white"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Shipping Benefits */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Truck className="h-8 w-8 text-localuv-primary dark:text-localuv-secondary mr-3" />
                    <div>
                      <h4 className="font-medium dark:text-white">Free Shipping</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">On orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Package className="h-8 w-8 text-localuv-primary dark:text-localuv-secondary mr-3" />
                    <div>
                      <h4 className="font-medium dark:text-white">Easy Returns</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">30 day return policy</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-8 w-8 text-localuv-primary dark:text-localuv-secondary mr-3" />
                    <div>
                      <h4 className="font-medium dark:text-white">Secure Checkout</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Encrypted payment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-4 shadow-md">
                <h2 className="text-xl font-medium mb-4 dark:text-white">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between dark:text-gray-200">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between dark:text-gray-200">
                    <span>Shipping:</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between dark:text-gray-200">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t dark:border-gray-700 pt-2 font-bold text-lg flex justify-between dark:text-white">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Payment Options */}
                <div className="mb-4">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <CreditCard className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    <img src="https://cdn-icons-png.flaticon.com/128/196/196578.png" alt="PayPal" className="h-6" />
                    <img src="https://cdn-icons-png.flaticon.com/128/349/349230.png" alt="Apple Pay" className="h-6" />
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2 dark:text-white">Promo Code</h3>
                  <div className="flex space-x-2">
                    <Input 
                      type="text" 
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    <Button onClick={handleApplyPromo}>Apply</Button>
                  </div>
                </div>
                
                <Button className="w-full flex items-center justify-center bg-localuv-primary hover:bg-localuv-primary/90">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="mt-4 text-center">
                  <Link to="/marketplace" className="text-localuv-secondary hover:underline text-sm dark:text-localuv-secondary">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-16 text-center shadow-md">
            <h2 className="text-2xl font-serif mb-4 dark:text-white">Your cart is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Add items from the marketplace to get started.</p>
            <img 
              src="https://images.unsplash.com/photo-1586769852044-692d6e3703f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Empty shopping cart" 
              className="w-40 h-40 object-contain mx-auto mb-6"
            />
            <Link to="/marketplace">
              <Button size="lg">Browse Marketplace</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
