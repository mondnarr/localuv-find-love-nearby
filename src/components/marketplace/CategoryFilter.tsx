
import { Card } from '@/components/ui/card';
import { Filter, MapPin, ShoppingBag, Star, Tags } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }: CategoryFilterProps) => {
  return (
    <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <Tags className="h-5 w-5 text-localuv-primary" />
        <h2 className="font-serif text-xl dark:text-white">Categories</h2>
      </div>
      <div className="space-y-2">
        <div 
          className={`px-3 py-2 cursor-pointer rounded-md flex items-center gap-2 ${
            !selectedCategory 
              ? 'bg-localuv-primary/10 text-localuv-primary dark:bg-localuv-primary/20' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          <ShoppingBag className="h-4 w-4" />
          All Categories
        </div>
        {categories.map(category => (
          <div 
            key={category}
            className={`px-3 py-2 cursor-pointer rounded-md flex items-center gap-2 ${
              selectedCategory === category 
                ? 'bg-localuv-primary/10 text-localuv-primary dark:bg-localuv-primary/20' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            <MapPin className="h-4 w-4" />
            {category}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CategoryFilter;
