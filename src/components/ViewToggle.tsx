
import React from 'react';
import { Button } from '@/components/ui/button';
import { Map, ListFilter } from 'lucide-react';

interface ViewToggleProps {
  view: 'map' | 'list';
  onViewChange: (view: 'map' | 'list') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant={view === 'list' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewChange('list')}
      >
        <ListFilter className="mr-1 h-4 w-4" />
        List View
      </Button>
      <Button
        variant={view === 'map' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onViewChange('map')}
      >
        <Map className="mr-1 h-4 w-4" />
        Map View
      </Button>
    </div>
  );
};

export default ViewToggle;
