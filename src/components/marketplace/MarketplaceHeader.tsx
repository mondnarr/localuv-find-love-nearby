
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface MarketplaceHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const MarketplaceHeader = ({ searchQuery, setSearchQuery }: MarketplaceHeaderProps) => {
  return (
    <div className="relative bg-gradient-to-r from-localuv-primary to-localuv-secondary py-16">
      <div className="absolute inset-0 bg-black/30" />
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">
          Local Marketplace
        </h1>
        <p className="text-xl text-white/90 text-center max-w-2xl mx-auto mb-8">
          Discover unique products from local businesses in your community
        </p>
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input 
            type="search" 
            placeholder="Search for products..." 
            className="pl-12 h-12 text-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHeader;
