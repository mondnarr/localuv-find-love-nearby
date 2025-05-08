
import { useState } from 'react';
import { ChevronRight, Heart, ShoppingBag, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import ProductGallery from '@/components/product/ProductGallery';
import ProductHeader from '@/components/product/ProductHeader';
import ProductActions from '@/components/product/ProductActions';
import ProductTabs from '@/components/product/ProductTabs';
import Footer from '@/components/Footer';

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Mock product data
  const product = {
    id: 'prod-12345',
    name: 'Handcrafted Ceramic Mug',
    description: 'A beautiful handcrafted ceramic mug made by local artisans. Each piece is unique with subtle variations in glaze and form.',
    longDescription: `
      <p>This beautiful ceramic mug is handcrafted by skilled local artisans using traditional techniques passed down through generations.</p>
      <p>Each piece is carefully formed, glazed, and fired to create a unique item that combines functionality with artistic expression.</p>
      <p>The ergonomic handle and balanced weight make it comfortable to use, while the durable finish ensures it will last for years to come.</p>
      <h3>Features:</h3>
      <ul>
        <li>Handcrafted from locally-sourced clay</li>
        <li>Food-safe, lead-free glaze</li>
        <li>Microwave and dishwasher safe</li>
        <li>Capacity: 12 oz</li>
        <li>Dimensions: 4" height x 3.5" diameter</li>
      </ul>
    `,
    price: 28.00,
    originalPrice: 35.00,
    discount: 20,
    inventory: 15,
    imageUrl: 'https://images.unsplash.com/photo-1577566346886-6016b26913c8?auto=format&fit=crop&q=80&w=600',
    images: [
      'https://images.unsplash.com/photo-1577566346886-6016b26913c8?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3a2615e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1578079876614-31d6a96266d9?auto=format&fit=crop&q=80&w=600'
    ],
    businessId: 'business-789',
    businessName: 'Clay & Fire Pottery',
    businessLogo: 'https://images.unsplash.com/photo-1565193566173-7a0ee3a2615e?auto=format&fit=crop&q=80&w=100',
    businessDescription: 'Handcrafted ceramics made with love in our local studio.',
    businessLocation: 'Portland, OR',
    category: 'Home Goods',
    tags: ['ceramic', 'handcrafted', 'kitchenware'],
    color: 'Blue',
    material: 'Ceramic',
    reviewCount: 24,
    rating: 4.7,
    isLocalPickupAvailable: true,
    isShippingAvailable: true,
    shippingInfo: 'Free shipping on orders over $50',
    estimatedDelivery: '3-5 business days',
    isFavorited: false,
  };

  // Fixed type specifications for these arrays
  const specifications = [
    { name: 'Material', value: 'Ceramic' },
    { name: 'Dimensions', value: '4" x 3.5"' },
    { name: 'Weight', value: '12 oz' },
    { name: 'Color', value: 'Blue' },
    { name: 'Care', value: 'Dishwasher safe' }
  ];
  
  const reviews = [
    { 
      id: '1', 
      user: 'Sarah L.', 
      rating: 5, 
      date: '2023-09-10', 
      content: 'Beautiful mug that keeps my coffee hot for a long time. The craftsmanship is excellent!' 
    },
    { 
      id: '2', 
      user: 'Michael T.', 
      rating: 4, 
      date: '2023-08-22', 
      content: 'Love the design and feel of this mug. The only reason for 4 stars is that the handle is a bit small for my hands.' 
    },
    { 
      id: '3', 
      user: 'Alex R.', 
      rating: 5, 
      date: '2023-07-15', 
      content: 'This is now my favorite mug. The glaze is beautiful and it feels substantial in the hand.' 
    }
  ];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: quantity,
      businessName: product.businessName
    });
    
    toast({
      title: "Added to cart!",
      description: `${quantity} × ${product.name} has been added to your cart.`,
    });
  };

  const handleFavorite = () => {
    toast({
      description: "Added to your wishlist!",
    });
  };

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-6 text-sm text-gray-500 dark:text-gray-400">
          <a href="/" className="hover:text-gray-700 dark:hover:text-gray-200">Home</a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <a href="/marketplace" className="hover:text-gray-700 dark:hover:text-gray-200">Marketplace</a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <a href={`/category/${product.category}`} className="hover:text-gray-700 dark:hover:text-gray-200">{product.category}</a>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-gray-900 dark:text-white font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Product Gallery */}
          <ProductGallery images={product.images} />

          {/* Product Info */}
          <div className="space-y-6">
            <ProductHeader 
              name={product.name}
              businessName={product.businessName}
              businessLogo={product.businessLogo}
              rating={product.rating}
              reviewCount={product.reviewCount}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
            />
            
            <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <Badge key={tag} variant="outline" className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <Separator />
            
            <ProductActions 
              quantity={quantity}
              setQuantity={setQuantity}
              inventory={product.inventory}
              onAddToCart={handleAddToCart}
              onFavorite={handleFavorite}
              isLocalPickupAvailable={product.isLocalPickupAvailable}
              isShippingAvailable={product.isShippingAvailable}
              estimatedDelivery={product.estimatedDelivery}
              shippingInfo={product.shippingInfo}
            />
          </div>
        </div>
        
        <ProductTabs 
          description={product.longDescription}
          specifications={specifications}
          reviews={reviews}
          businessDescription={product.businessDescription}
          businessName={product.businessName}
          businessLocation={product.businessLocation}
        />
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Related product cards would go here */}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
