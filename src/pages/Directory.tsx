
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BusinessCard from '@/components/BusinessCard';
import { DirectoryFilters } from '@/components/DirectoryFilters';
import { mockBusinesses } from '@/lib/businessData';

const Directory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [] as string[],
    rating: 0,
    distance: 5
  });

  const filteredBusinesses = mockBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategories = filters.categories.length === 0 || 
      filters.categories.includes(business.category);
    
    const matchesRating = business.rating >= filters.rating;
    
    const matchesDistance = business.distance <= filters.distance;

    return matchesSearch && matchesCategories && matchesRating && matchesDistance;
  });

  return (
    <div className="min-h-screen bg-localuv-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          {/* Search Section */}
          <div className="flex flex-col space-y-4">
            <h1 className="font-serif text-4xl">Local Businesses</h1>
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search businesses..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DirectoryFilters onFiltersChange={setFilters} />
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-500">
            Found {filteredBusinesses.length} businesses
          </div>

          {/* Business Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;
