
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Filter, DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

interface PriceFilterProps {
  minPrice?: number;
  maxPrice?: number;
  onPriceChange: (min: number, max: number) => void;
}

const PriceFilter = ({ 
  minPrice = 0, 
  maxPrice = 100, 
  onPriceChange 
}: PriceFilterProps) => {
  const [min, setMin] = useState<number>(minPrice);
  const [max, setMax] = useState<number>(maxPrice);
  const [sliderValue, setSliderValue] = useState<number[]>([minPrice, maxPrice]);

  // Update local state when props change
  useEffect(() => {
    setMin(minPrice);
    setMax(maxPrice);
    setSliderValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
    setMin(value[0]);
    setMax(value[1]);
  };

  const handleInputChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value, 10) || 0;
    
    if (type === 'min') {
      const safeMin = Math.max(0, Math.min(numValue, max - 1));
      setMin(safeMin);
      setSliderValue([safeMin, max]);
    } else {
      const safeMax = Math.max(min + 1, numValue);
      setMax(safeMax);
      setSliderValue([min, safeMax]);
    }
  };

  const handleApply = () => {
    onPriceChange(min, max);
  };

  return (
    <Card className="p-4 dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="h-5 w-5 text-localuv-primary" />
        <h2 className="font-serif text-xl dark:text-white">Price Range</h2>
      </div>
      
      <div className="space-y-6 dark:text-gray-300">
        <div className="px-2 py-4">
          <Slider
            value={sliderValue}
            min={0}
            max={100}
            step={1}
            onValueChange={handleSliderChange}
            className="my-6"
          />
        </div>
        
        <div className="flex gap-2 items-center">
          <Input 
            type="number" 
            placeholder="Min" 
            className="w-1/2 dark:bg-gray-700 dark:border-gray-600"
            value={min}
            onChange={(e) => handleInputChange('min', e.target.value)}
          />
          <span className="text-gray-500 dark:text-gray-400">to</span>
          <Input 
            type="number" 
            placeholder="Max" 
            className="w-1/2 dark:bg-gray-700 dark:border-gray-600"
            value={max}
            onChange={(e) => handleInputChange('max', e.target.value)}
          />
        </div>

        <Button 
          onClick={handleApply} 
          className="w-full bg-localuv-primary hover:bg-localuv-primary/90 text-white"
        >
          Apply Filter
        </Button>
      </div>
    </Card>
  );
};

export default PriceFilter;
