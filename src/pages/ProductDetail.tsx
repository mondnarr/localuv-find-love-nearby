import { useParams } from 'react-router-dom';
import ProductGallery from '@/components/product/ProductGallery';
import ProductHeader from '@/components/product/ProductHeader';
import ProductActions from '@/components/product/ProductActions';
import ProductTabs from '@/components/product/ProductTabs';

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
      content: "Beautiful mug! I love the design and colors. It feels great in the hand and keeps my coffee warm."
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
  
  // In a real app, we would fetch based on the ID
  const product = mockProduct;

  return (
    <div className="min-h-screen bg-localuv-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <ProductGallery images={product.images} productName={product.name} />
          
          {/* Product Details */}
          <div>
            <div className="bg-white rounded-lg p-6 dark:bg-gray-800">
              <ProductHeader 
                category={product.category}
                name={product.name}
                price={product.price}
                rating={product.rating}
                reviewCount={product.reviewCount}
                vendorId={product.vendor.id}
                vendorName={product.vendor.name}
              />
              
              <p className="text-gray-700 mb-6 dark:text-gray-300">{product.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full dark:bg-gray-700 dark:text-gray-300">{tag}</span>
                ))}
              </div>
              
              <ProductActions productName={product.name} />
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <ProductTabs specs={product.specs} reviews={product.reviews} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
