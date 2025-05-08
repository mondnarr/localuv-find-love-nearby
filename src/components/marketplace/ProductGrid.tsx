
import { Eye, Heart, Star, Package, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  businessId: string;
  businessName: string;
  category: string;
  reviewCount: number;
  rating: number;
}

interface ProductGridProps {
  products: Product[];
  viewMode: 'grid' | 'list';
}

const ProductGrid = ({ products, viewMode }: ProductGridProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      vendor: product.businessName,
    });
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 dark:text-gray-400">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${
      viewMode === 'grid' 
        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
        : 'grid-cols-1'
    }`}>
      {products.map(product => (
        <Card 
          key={product.id} 
          className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700 ${
            viewMode === 'list' ? 'flex' : ''
          }`}
        >
          <div className={`relative group ${viewMode === 'list' ? 'w-48' : 'h-48'}`}>
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="sm" variant="secondary">
                <Eye className="h-4 w-4 mr-1" />
                Quick View
              </Button>
              <Button size="icon" variant="secondary">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-medium dark:text-white mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{product.businessName}</p>
              </div>
              <Badge variant="secondary" className="dark:bg-gray-700">
                {product.category}
              </Badge>
            </div>
            {viewMode === 'list' && (
              <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
            )}
            <div className="flex items-center justify-between mt-2">
              <p className="text-lg font-bold dark:text-white">${product.price}</p>
              <Button 
                size="sm" 
                className="dark:bg-localuv-primary dark:text-white"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingBag className="h-4 w-4 mr-1" />
                Add to Cart
              </Button>
            </div>
            <div className="flex items-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= (product.rating || 0)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
              <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
                {product.reviewCount} reviews
              </span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ProductGrid;
