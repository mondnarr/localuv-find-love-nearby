
import { useState, useEffect } from 'react';
import { Check, X, Star, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  features: string[];
  vendor: {
    name: string;
    rating: number;
  };
}

// Mock products for comparison
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Handcrafted Coffee Mug',
    price: 24.99,
    rating: 4.7,
    reviewCount: 124,
    image: '/placeholder-retail.jpg',
    description: 'This beautiful handcrafted mug is made by local artisans using traditional techniques.',
    features: ['Handmade', 'Ceramic', '12 oz capacity', 'Dishwasher safe', 'Microwave safe'],
    vendor: {
      name: 'Vintage Finds',
      rating: 4.3
    }
  },
  {
    id: '2',
    name: 'Artisan Coffee Tumbler',
    price: 32.50,
    rating: 4.5,
    reviewCount: 86,
    image: '/placeholder-retail.jpg',
    description: 'Double-walled insulated tumbler to keep your drinks hot or cold for hours.',
    features: ['Double-walled', 'Stainless steel', '16 oz capacity', 'Keeps drinks hot for 6 hours', 'Leak-proof lid'],
    vendor: {
      name: 'Modern Makers',
      rating: 4.6
    }
  },
  {
    id: '3',
    name: 'Eco-Friendly Travel Mug',
    price: 18.99,
    rating: 4.2,
    reviewCount: 53,
    image: '/placeholder-retail.jpg',
    description: 'Made from sustainable bamboo fiber with a silicone lid and sleeve.',
    features: ['Eco-friendly', 'Bamboo fiber', '14 oz capacity', 'Silicone grip', 'BPA free'],
    vendor: {
      name: 'Green Living',
      rating: 4.1
    }
  }
];

// Find all unique features across all products
const getAllFeatures = (products: Product[]) => {
  const allFeatures = new Set<string>();
  products.forEach(product => {
    product.features.forEach(feature => {
      allFeatures.add(feature);
    });
  });
  return Array.from(allFeatures);
};

const CompareProducts = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([mockProducts[0], mockProducts[1]]);
  const [allFeatures, setAllFeatures] = useState<string[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setAllFeatures(getAllFeatures(products));
  }, [products]);

  const handleAddToCart = (product: Product) => {
    toast({
      title: "Added to cart!",
      description: `${product.name} added to your cart.`
    });
  };

  const toggleExpandSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const handleRemoveProduct = (productId: string) => {
    if (selectedProducts.length <= 2) {
      toast({
        description: "You need at least two products to compare",
        variant: "destructive"
      });
      return;
    }
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleAddProduct = (productId: string) => {
    if (selectedProducts.length >= 4) {
      toast({
        description: "You can compare up to 4 products at once",
        variant: "destructive"
      });
      return;
    }
    const productToAdd = products.find(p => p.id === productId);
    if (productToAdd && !selectedProducts.some(p => p.id === productId)) {
      setSelectedProducts(prev => [...prev, productToAdd]);
    }
  };

  return (
    <div className="min-h-screen bg-localuv-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-4xl mb-2">Compare Products</h1>
        <p className="text-gray-600 mb-8">Compare features and specifications to find the perfect choice for you.</p>

        <div className="sticky top-0 z-10 bg-localuv-background pt-2 pb-4">
          <div className="flex items-center mb-2 overflow-x-auto pb-2">
            {products.map(product => (
              <div key={product.id} className="mr-2">
                <Button
                  variant={selectedProducts.some(p => p.id === product.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (selectedProducts.some(p => p.id === product.id)) {
                      handleRemoveProduct(product.id);
                    } else {
                      handleAddProduct(product.id);
                    }
                  }}
                >
                  {product.name}
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr>
                <th className="text-left p-4 border-b w-1/4">Product</th>
                {selectedProducts.map(product => (
                  <th key={product.id} className="p-4 border-b">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-0 right-0"
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-32 h-32 object-cover mx-auto rounded-lg"
                      />
                      <h3 className="font-medium mt-2">{product.name}</h3>
                      <p className="text-lg font-bold text-localuv-primary">${product.price.toFixed(2)}</p>
                      <div className="flex items-center justify-center mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm">{product.rating} ({product.reviewCount})</span>
                      </div>
                      <Button
                        className="w-full mt-3"
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Description section */}
              <tr className="border-b">
                <td className="p-4 font-medium bg-gray-50" onClick={() => toggleExpandSection('description')}>
                  <div className="flex items-center justify-between cursor-pointer">
                    <span>Description</span>
                    <ChevronDown className={`h-4 w-4 transform ${expandedSection === 'description' ? 'rotate-180' : ''}`} />
                  </div>
                </td>
                {selectedProducts.map(product => (
                  <td key={product.id} className="p-4 text-center">
                    {expandedSection === 'description' && (
                      <p className="text-sm">{product.description}</p>
                    )}
                  </td>
                ))}
              </tr>

              {/* Vendor section */}
              <tr className="border-b">
                <td className="p-4 font-medium bg-gray-50" onClick={() => toggleExpandSection('vendor')}>
                  <div className="flex items-center justify-between cursor-pointer">
                    <span>Vendor</span>
                    <ChevronDown className={`h-4 w-4 transform ${expandedSection === 'vendor' ? 'rotate-180' : ''}`} />
                  </div>
                </td>
                {selectedProducts.map(product => (
                  <td key={product.id} className="p-4 text-center">
                    <div className={`${expandedSection === 'vendor' ? 'block' : 'hidden'}`}>
                      <p className="font-medium">{product.vendor.name}</p>
                      <div className="flex items-center justify-center mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="ml-1 text-sm">{product.vendor.rating}</span>
                      </div>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Features section */}
              <tr>
                <td className="p-4 font-medium bg-gray-50" onClick={() => toggleExpandSection('features')}>
                  <div className="flex items-center justify-between cursor-pointer">
                    <span>Features</span>
                    <ChevronDown className={`h-4 w-4 transform ${expandedSection === 'features' ? 'rotate-180' : ''}`} />
                  </div>
                </td>
                {selectedProducts.map(product => (
                  <td key={product.id} className="p-4 text-center">
                    {expandedSection === 'features' && (
                      <ul className="text-left text-sm space-y-2 pl-2">
                        {product.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center">
                            <Check className="h-4 w-4 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                ))}
              </tr>

              {/* Feature comparison */}
              {expandedSection === 'features' && allFeatures.map((feature, index) => (
                <tr key={index} className={index < allFeatures.length - 1 ? 'border-b border-dashed' : ''}>
                  <td className="p-3 pl-8 text-sm">{feature}</td>
                  {selectedProducts.map(product => (
                    <td key={product.id} className="p-3 text-center">
                      {product.features.includes(feature) ? (
                        <Check className="h-4 w-4 text-green-500 mx-auto" />
                      ) : (
                        <X className="h-4 w-4 text-red-500 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompareProducts;
