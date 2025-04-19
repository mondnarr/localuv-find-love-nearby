
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BusinessCard from '@/components/BusinessCard';
import { DirectoryFilters } from '@/components/DirectoryFilters';
import { mockBusinesses } from '@/lib/businessData';
import MapView from '@/components/MapView';
import ViewToggle from '@/components/ViewToggle';

const Directory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    categories: [] as string[],
    rating: 0,
    distance: 5
  });
  const [view, setView] = useState<'list' | 'map'>('list');
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);

  const filteredBusinesses = mockBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategories = filters.categories.length === 0 || 
      filters.categories.includes(business.category);
    
    const matchesRating = business.rating >= filters.rating;
    
    const matchesDistance = business.distance <= filters.distance;

    return matchesSearch && matchesCategories && matchesRating && matchesDistance;
  });

  const handleBusinessSelect = (business: typeof mockBusinesses[0]) => {
    setSelectedBusiness(business.id === selectedBusiness ? null : business.id);
    if (view === 'map') {
      setView('list');
      setTimeout(() => {
        const businessElement = document.getElementById(`business-${business.id}`);
        if (businessElement) {
          businessElement.scrollIntoView({ behavior: 'smooth' });
          businessElement.classList.add('ring-2', 'ring-localuv-primary');
          setTimeout(() => {
            businessElement.classList.remove('ring-2', 'ring-localuv-primary');
          }, 2000);
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-localuv-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-8">
          {/* Search Section */}
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="font-serif text-4xl">Local Businesses</h1>
              <ViewToggle view={view} onViewChange={setView} />
            </div>
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

          {/* Map View */}
          {view === 'map' && (
            <MapView 
              businesses={filteredBusinesses} 
              onBusinessSelect={handleBusinessSelect}
            />
          )}

          {/* Business Listings */}
          {view === 'list' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((business) => (
                <div 
                  id={`business-${business.id}`}
                  key={business.id}
                  className={`transition-all duration-300 ${
                    selectedBusiness === business.id ? 'scale-102 shadow-lg' : ''
                  }`}
                >
                  <BusinessCard business={business} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Directory;
