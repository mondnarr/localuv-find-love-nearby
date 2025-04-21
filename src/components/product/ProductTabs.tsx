
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

interface ProductTabsProps {
  specs: Array<{ name: string; value: string; }>;
  reviews: Array<{
    id: string;
    user: string;
    rating: number;
    date: string;
    content: string;
  }>;
}

const ProductTabs = ({ specs, reviews }: ProductTabsProps) => {
  return (
    <Tabs defaultValue="details">
      <TabsList>
        <TabsTrigger value="details">Details & Specs</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="p-6 bg-white rounded-lg mt-2 dark:bg-gray-800">
        <h2 className="text-xl font-medium mb-4">Product Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
          {specs.map(spec => (
            <div key={spec.name} className="flex justify-between border-b pb-2 dark:border-gray-700">
              <span className="font-medium">{spec.name}</span>
              <span>{spec.value}</span>
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="reviews" className="p-6 bg-white rounded-lg mt-2 dark:bg-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium">Customer Reviews</h2>
          <Button>Write a Review</Button>
        </div>
        
        {reviews.map(review => (
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
                <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
              </div>
              <p className="mt-3">{review.content}</p>
            </CardContent>
          </Card>
        ))}
      </TabsContent>
      
      <TabsContent value="shipping" className="p-6 bg-white rounded-lg mt-2 dark:bg-gray-800">
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
  );
};

export default ProductTabs;
