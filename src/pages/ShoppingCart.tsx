
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Mock cart items
const mockCartItems = [
  {
    id: '1',
    name: 'Handcrafted Coffee Mug',
    price: 24.99,
    quantity: 2,
    image: '/placeholder-retail.jpg',
    vendor: 'Vintage Finds'
  },
  {
    id: '3',
    name: 'Local Honey 8oz',
    price: 12.00,
    quantity: 1,
    image: '/placeholder-grocery.jpg',
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
    <div className="min-h-screen bg-localuv-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl mb-8">Your Shopping Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-xl font-medium mb-4">Cart Items ({cartItems.length})</h2>
                
                {cartItems.map(item => (
                  <div key={item.id} className="flex border-b py-4">
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
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">Sold by {item.vendor}</p>
                        </div>
                        <div className="text-right mt-2 sm:mt-0">
                          <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border rounded-md">
                          <button 
                            className="px-3 py-1"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="px-4 py-1 border-x">{item.quantity}</span>
                          <button 
                            className="px-3 py-1"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        
                        <button 
                          className="text-red-500 hover:text-red-700 flex items-center"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg p-6 sticky top-4">
                <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 font-bold text-lg flex justify-between">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Promo Code</h3>
                  <div className="flex space-x-2">
                    <Input 
                      type="text" 
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleApplyPromo}>Apply</Button>
                  </div>
                </div>
                
                <Button className="w-full flex items-center justify-center">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="mt-4 text-center">
                  <Link to="/marketplace" className="text-localuv-secondary hover:underline text-sm">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-16 text-center">
            <h2 className="text-2xl font-serif mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Add items from the marketplace to get started.</p>
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
