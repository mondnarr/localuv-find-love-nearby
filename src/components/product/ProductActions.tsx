
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProductActionsProps {
  productName: string;
}

const ProductActions = ({ productName }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${productName} added to your cart.`
    });
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist!",
      description: `${productName} saved to your wishlist.`
    });
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
