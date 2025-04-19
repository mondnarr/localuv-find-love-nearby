
import React from 'react';
import { Button } from '@/components/ui/button';
import { Map, ListFilter, Grid } from 'lucide-react';

interface ViewToggleProps {
  view: 'map' | 'list';
  onViewChange: (view: 'map' | 'list') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex items-center space-x-2 bg-white rounded-lg p-1 shadow-sm border">
      <Button
        variant={view === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        className={`rounded-md px-3 py-1.5 ${
          view === 'list' ? 'bg-localuv-primary text-white' : 'hover:bg-gray-100'
        }`}
      >
        <Grid className="mr-1 h-4 w-4" />
        <span className="hidden sm:inline">List View</span>
      </Button>
      <Button
        variant={view === 'map' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('map')}
        className={`rounded-md px-3 py-1.5 ${
          view === 'map' ? 'bg-localuv-primary text-white' : 'hover:bg-gray-100'
        }`}
      >
        <Map className="mr-1 h-4 w-4" />
        <span className="hidden sm:inline">Map View</span>
      </Button>
    </div>
  );
};

export default ViewToggle;
