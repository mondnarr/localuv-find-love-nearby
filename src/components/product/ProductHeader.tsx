
import { Star, MapPin } from 'lucide-react';

interface ProductHeaderProps {
  category: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  vendorId: string;
  vendorName: string;
}

const ProductHeader = ({ 
  category, 
  name, 
  price, 
  rating, 
  reviewCount, 
  vendorId, 
  vendorName 
}: ProductHeaderProps) => {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{category}</span>
        <div className="flex items-center">
          <Star className="text-yellow-500 h-4 w-4" />
          <span className="ml-1 text-sm">{rating} ({reviewCount} reviews)</span>
        </div>
      </div>
      
      <h1 className="font-serif text-3xl mb-2">{name}</h1>
      <p className="text-2xl font-bold text-localuv-primary mb-4">${price.toFixed(2)}</p>
      
      <div className="flex items-center mb-4 text-sm">
        <MapPin className="h-4 w-4 mr-1 text-gray-500" />
        <span>From <a href={`/business/${vendorId}`} className="text-localuv-secondary hover:underline">{vendorName}</a></span>
      </div>
    </>
  );
};

export default ProductHeader;
