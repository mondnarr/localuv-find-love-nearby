
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductGallery from '@/components/product/ProductGallery';
import ProductHeader from '@/components/product/ProductHeader';
import ProductActions from '@/components/product/ProductActions';
import ProductTabs from '@/components/product/ProductTabs';
import { mockBusinesses } from '@/lib/businessData';

// Generate a mock product for the demo
const getMockProduct = (id: string) => {
  const business = mockBusinesses[Math.floor(Math.random() * mockBusinesses.length)];
  
  return {
    id,
    name: `${business.name} Signature Product`,
    description: `This is a premium product from ${business.name}, one of the top-rated local businesses in our community. Made with the finest materials and crafted with attention to detail.`,
    price: Math.floor(Math.random() * 100) + 20,
    images: Array(4).fill(business.imageUrl),
    category: business.category,
    vendor: {
      id: business.id,
      name: business.name,
      rating: business.rating
    },
    rating: (Math.random() * 2 + 3).toFixed(1),
    reviewCount: Math.floor(Math.random() * 100) + 5,
    specs: [
      { label: "Material", value: "Premium" },
      { label: "Dimensions", value: "10 x 8 x 2 inches" },
      { label: "Weight", value: "1.2 lbs" },
      { label: "Origin", value: "Locally Made" }
    ],
    reviews: [
      { 
        id: "1",
        user: "Alex Johnson",
        date: "March 15, 2023",
        rating: 5,
        comment: "Absolutely love this product! It exceeded my expectations in every way."
      },
      { 
        id: "2",
        user: "Sam Thompson",
        date: "February 28, 2023", 
        rating: 4,
        comment: "Great quality and fast shipping. Would buy again."
      }
    ]
  };
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = getMockProduct(id || 'default-id');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Gallery */}
        <div>
          <ProductGallery 
            images={product.images} 
            productName={product.name} 
          />
        </div>
        
        {/* Product Info */}
        <div>
          <ProductHeader 
            category={product.category}
            name={product.name}
            price={product.price}
            rating={parseFloat(product.rating)}
            reviewCount={product.reviewCount}
            vendorId={product.vendor.id}
            vendorName={product.vendor.name}
          />
          
          <div className="border-t border-b py-4 my-4 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400">
              {product.description}
            </p>
          </div>
          
          <ProductActions 
            productId={product.id}
            productName={product.name}
            productPrice={product.price}
            productImage={product.images[0]}
            vendorName={product.vendor.name}
          />
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-12">
        <ProductTabs 
          specs={product.specs}
          reviews={product.reviews}
        />
      </div>
      
      {/* Related Products */}
      <div className="mt-16">
        <h2 className="font-serif text-2xl mb-6 dark:text-white">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array(4).fill(null).map((_, i) => {
            const relatedBusiness = mockBusinesses[Math.floor(Math.random() * mockBusinesses.length)];
            return (
              <Card key={i} className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                <img 
                  src={relatedBusiness.imageUrl} 
                  alt={relatedBusiness.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium dark:text-white">{relatedBusiness.name} Product</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{relatedBusiness.name}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold">${Math.floor(Math.random() * 50) + 10}</p>
                    <Button size="sm">View</Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
