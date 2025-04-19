
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Heart, X, ShoppingCart } from 'lucide-react';
import { mockBusinesses } from '@/lib/businessData';

// Generate mock wishlist products
const generateWishlistProducts = () => {
  return [
    {
      id: 'wish-1',
      name: 'Handcrafted Coffee Mug',
      imageUrl: '/placeholder-retail.jpg',
      price: 24.99,
      businessName: 'Vintage Finds',
      businessId: mockBusinesses[0].id
    },
    {
      id: 'wish-2',
      name: 'Organic Lavender Soap',
      imageUrl: '/placeholder-retail.jpg',
      price: 8.50,
      businessName: 'Green Haven',
      businessId: mockBusinesses[1].id
    },
    {
      id: 'wish-3',
      name: 'Local Honey 8oz',
      imageUrl: '/placeholder-retail.jpg',
      price: 12.00,
      businessName: 'Farm Fresh',
      businessId: mockBusinesses[2].id
    }
  ];
};

const WishlistTab = () => {
  const [wishlistItems, setWishlistItems] = useState(generateWishlistProducts());
  const { toast } = useToast();

  const handleRemoveItem = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
    toast({
      description: "Item removed from wishlist",
    });
  };

  const handleAddToCart = (item: any) => {
    toast({
      title: "Added to cart!",
      description: `${item.name} added to your cart.`,
    });
  };

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-medium mb-6">My Wishlist</h2>
        
        {wishlistItems.length > 0 ? (
          <div className="space-y-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex items-center border-b pb-4 gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.businessName}</p>
                  <p className="font-bold mt-1">${item.price.toFixed(2)}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center gap-1"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="hidden sm:inline">Add to Cart</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-gray-500"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium">Your wishlist is empty</h3>
            <p className="text-gray-500 mt-1">Save items you love to your wishlist and revisit them anytime.</p>
            <Button className="mt-4" onClick={() => window.location.href = '/marketplace'}>
              Browse Products
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WishlistTab;
