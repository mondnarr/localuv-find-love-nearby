import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Star, Heart, ShoppingCart, Share2, MapPin } from 'lucide-react';

// Mock product data
const mockProduct = {
  id: '1',
  name: 'Handcrafted Coffee Mug',
  description: 'This beautiful handcrafted mug is made by local artisans using traditional techniques. Each piece is unique with subtle variations in glaze and form.',
  price: 24.99,
  images: ['/placeholder-retail.jpg', '/placeholder-retail.jpg', '/placeholder-retail.jpg'],
  rating: 4.7,
  reviewCount: 124,
  vendor: {
    id: '1',
    name: 'Vintage Finds',
    location: '888 Retro Road',
    rating: 4.3
  },
  category: 'Home Goods',
  tags: ['Handmade', 'Ceramic', 'Local'],
  specs: [
    {
      name: 'Material',
      value: 'Ceramic'
    },
    {
      name: 'Capacity',
      value: '12 oz'
    },
    {
      name: 'Care',
      value: 'Dishwasher Safe'
    },
    {
      name: 'Dimensions',
      value: '4" x 3.5" x 3.5"'
    }
  ],
  reviews: [
    {
      id: '1',
      user: 'Jane D.',
      rating: 5,
      date: '2023-03-15',
      content: "I've bought several of these mugs as gifts and everyone loves them. Supporting local artisans is a bonus!"
    },
    {
      id: '2',
      user: 'Mike R.',
      rating: 4,
      date: '2023-02-22',
      content: 'Good quality mug. The handle is comfortable to hold. Shipping was fast too.'
    },
    {
      id: '3',
      user: 'Sarah L.',
      rating: 5,
      date: '2023-02-10',
      content: "I've bought several of these mugs as gifts and everyone loves them. Supporting local artisans is a bonus!"
    }
  ]
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // In a real app, we would fetch based on the ID
  const product = mockProduct;
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added to your cart.`
    });
  };
  
  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist!",
      description: `${product.name} saved to your wishlist.`
    });
  };

  return (
    <div className="min-h-screen bg-localuv-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-lg overflow-hidden h-96 mb-4">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`w-20 h-20 cursor-pointer border-2 rounded ${selectedImage === index ? 'border-localuv-primary' : 'border-transparent'}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{product.category}</span>
                <div className="flex items-center">
                  <Star className="text-yellow-500 h-4 w-4" />
                  <span className="ml-1 text-sm">{product.rating} ({product.reviewCount} reviews)</span>
                </div>
              </div>
              
              <h1 className="font-serif text-3xl mb-2">{product.name}</h1>
              <p className="text-2xl font-bold text-localuv-primary mb-4">${product.price.toFixed(2)}</p>
              
              <div className="flex items-center mb-4 text-sm">
                <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                <span>From <a href={`/business/${product.vendor.id}`} className="text-localuv-secondary hover:underline">{product.vendor.name}</a></span>
              </div>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">{tag}</span>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border rounded-md">
                  <button 
                    className="px-3 py-1 text-xl"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x">{quantity}</span>
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
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details & Specs</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="p-6 bg-white rounded-lg mt-2">
              <h2 className="text-xl font-medium mb-4">Product Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
                {product.specs.map(spec => (
                  <div key={spec.name} className="flex justify-between border-b pb-2">
                    <span className="font-medium">{spec.name}</span>
                    <span>{spec.value}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="p-6 bg-white rounded-lg mt-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium">Customer Reviews</h2>
                <Button>Write a Review</Button>
              </div>
              
              {product.reviews.map(review => (
                <Card key={review.id} className="mb-4">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{review.user}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                              fill={i < review.rating ? 'currentColor' : 'none'}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="mt-3">{review.content}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="shipping" className="p-6 bg-white rounded-lg mt-2">
              <h2 className="text-xl font-medium mb-4">Shipping Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Delivery</h3>
                  <p>Standard shipping takes 3-5 business days. Expedited shipping options available at checkout.</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Returns</h3>
                  <p>Returns accepted within 30 days of purchase. Item must be unused and in original packaging.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
