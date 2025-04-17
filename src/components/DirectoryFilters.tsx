
import { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Filter, SlidersHorizontal } from 'lucide-react';

interface FiltersProps {
  onFiltersChange: (filters: {
    categories: string[];
    rating: number;
    distance: number;
  }) => void;
}

const categories = [
  'Café', 'Restaurant', 'Gym', 'Salon', 
  'Services', 'Retail', 'Grocery', 
  'Pet Services', 'Arts & Culture'
];

export function DirectoryFilters({ onFiltersChange }: FiltersProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [maxDistance, setMaxDistance] = useState(5);

  const handleCategoryChange = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(updated);
    onFiltersChange({
      categories: updated,
      rating: minRating,
      distance: maxDistance
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {(selectedCategories.length > 0 || minRating > 0 || maxDistance < 5) && (
            <span className="ml-1 rounded-full bg-primary w-2 h-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="font-medium leading-none">Categories</h4>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label 
                    htmlFor={category}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <h4 className="font-medium leading-none">Minimum Rating</h4>
              <span className="text-sm text-gray-500">{minRating} ⭐</span>
            </div>
            <Slider
              min={0}
              max={5}
              step={0.5}
              value={[minRating]}
              onValueChange={(values) => {
                setMinRating(values[0]);
                onFiltersChange({
                  categories: selectedCategories,
                  rating: values[0],
                  distance: maxDistance
                });
              }}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <h4 className="font-medium leading-none">Maximum Distance</h4>
              <span className="text-sm text-gray-500">{maxDistance} mi</span>
            </div>
            <Slider
              min={0}
              max={5}
              step={0.5}
              value={[maxDistance]}
              onValueChange={(values) => {
                setMaxDistance(values[0]);
                onFiltersChange({
                  categories: selectedCategories,
                  rating: minRating,
                  distance: values[0]
                });
              }}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
