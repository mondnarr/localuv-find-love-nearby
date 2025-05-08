
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ProductActionsProps {
  productName: string;
  productId: string;
  productPrice: number;
  productImage: string;
  vendorName: string;
}

const ProductActions = ({ productName, productId, productPrice, productImage, vendorName }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    // Add item to cart
    const item = {
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      vendor: vendorName,
    };
    
    // Add the item to cart the specified number of times
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }
  };
  
  const handleAddToWishlist = () => {
    // Functionality for wishlist can be added later
  };

  return (
    <>
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center border rounded-md dark:border-gray-700">
          <button 
            className="px-3 py-1 text-xl"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </button>
          <span className="px-4 py-1 border-x dark:border-gray-700">{quantity}</span>
          <button 
            className="px-3 py-1 text-xl"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>
        <Button 
          className="flex-1 flex items-center justify-center"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
      
      <div className="flex space-x-4">
        <Button variant="outline" className="flex-1 flex items-center justify-center" onClick={handleAddToWishlist}>
          <Heart className="mr-2 h-4 w-4" />
          Save
        </Button>
        <Button variant="outline" className="flex-1 flex items-center justify-center">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>
    </>
  );
};

export default ProductActions;
