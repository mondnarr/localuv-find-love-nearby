
import { useState } from 'react';
import { Search, Filter, Star, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

// Sample categories for filtering
const categories = [
  'All Categories',
  'Food & Drink',
  'Home Goods',
  'Fashion',
  'Health & Beauty',
  'Art & Crafts',
  'Services',
  'Tech',
  'Other'
];

// Sample locations
const locations = [
  'All Locations',
  'Downtown',
  'Westside',
  'Eastside',
  'Northside',
  'Southside',
  'Midtown',
  'Uptown',
  'Suburbs'
];

const SearchWithFilters = ({
  onSearch,
  onFilterChange,
}: {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: any) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [location, setLocation] = useState('All Locations');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [minRating, setMinRating] = useState(0);
  const [isLocal, setIsLocal] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
    
    if (onFilterChange) {
      onFilterChange({
        query: searchQuery,
        category,
        location,
        priceRange,
        minRating,
        isLocal,
        isOnline
      });
    }
  };

  const renderStars = (rating: number) => (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search products, services, or businesses..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSearch}>Search</Button>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="advanced-filters">
            <AccordionTrigger className="text-sm">Advanced Filters</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div>
                  <h4 className="text-sm font-medium mb-2">Price Range</h4>
                  <div className="px-2">
                    <Slider 
                      value={priceRange} 
                      onValueChange={setPriceRange} 
                      min={0} 
                      max={1000} 
                      step={10}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div 
                        key={rating}
                        className="flex items-center cursor-pointer"
                        onClick={() => setMinRating(rating)}
                      >
                        <input 
                          type="radio" 
                          id={`rating-${rating}`} 
                          name="rating" 
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="mr-2"
                        />
                        <label htmlFor={`rating-${rating}`} className="flex items-center cursor-pointer">
                          {renderStars(rating)} <span className="ml-1">& Up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Business Type</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="local" 
                        checked={isLocal}
                        onChange={() => setIsLocal(!isLocal)}
                        className="mr-2"
                      />
                      <label htmlFor="local" className="flex items-center cursor-pointer">
                        <MapPin className="h-4 w-4 mr-1" /> Local Businesses
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="online" 
                        checked={isOnline}
                        onChange={() => setIsOnline(!isOnline)}
                        className="mr-2"
                      />
                      <label htmlFor="online" className="cursor-pointer">
                        Online Only
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        <div className="flex gap-2 mb-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              type="search" 
              placeholder="Search..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle>Search Filters</SheetTitle>
                <SheetDescription>
                  Refine your search with these filters.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Select value={location} onValueChange={setLocation}>
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc) => (
                        <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Price Range</h4>
                  <div className="px-2">
                    <Slider 
                      value={priceRange} 
                      onValueChange={setPriceRange} 
                      min={0} 
                      max={1000} 
                      step={10}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <div 
                        key={rating}
                        className="flex items-center"
                        onClick={() => setMinRating(rating)}
                      >
                        <input 
                          type="radio" 
                          id={`mobile-rating-${rating}`} 
                          name="mobile-rating" 
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="mr-2"
                        />
                        <label htmlFor={`mobile-rating-${rating}`} className="flex items-center cursor-pointer">
                          {renderStars(rating)} <span className="ml-1">& Up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Business Type</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="mobile-local" 
                        checked={isLocal}
                        onChange={() => setIsLocal(!isLocal)}
                        className="mr-2"
                      />
                      <label htmlFor="mobile-local" className="flex items-center cursor-pointer">
                        <MapPin className="h-4 w-4 mr-1" /> Local Businesses
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="mobile-online" 
                        checked={isOnline}
                        onChange={() => setIsOnline(!isOnline)}
                        className="mr-2"
                      />
                      <label htmlFor="mobile-online" className="cursor-pointer">
                        Online Only
                      </label>
                    </div>
                  </div>
                </div>
                <SheetClose asChild>
                  <Button className="w-full" onClick={handleSearch}>
                    Apply Filters
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchWithFilters;
