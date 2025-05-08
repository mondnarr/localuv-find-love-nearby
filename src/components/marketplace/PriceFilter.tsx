
import { Card } from '@/components/ui/card';
import { Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';

const PriceFilter = () => {
  return (
    <Card className="p-4 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-localuv-primary" />
        <h2 className="font-serif text-xl dark:text-white">Filters</h2>
      </div>
      <div className="space-y-4 dark:text-gray-300">
        <h3 className="font-medium">Price Range</h3>
        <div className="flex gap-2">
          <Input 
            type="number" 
            placeholder="Min" 
            className="w-1/2 dark:bg-gray-700 dark:border-gray-600"
          />
          <Input 
            type="number" 
            placeholder="Max" 
            className="w-1/2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
    </Card>
  );
};

export default PriceFilter;
