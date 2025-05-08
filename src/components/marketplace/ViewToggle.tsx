
import { Button } from '@/components/ui/button';

interface ViewToggleProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  productCount: number;
}

const ViewToggle = ({ viewMode, setViewMode, productCount }: ViewToggleProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <p className="text-gray-600 dark:text-gray-400">
        {productCount} products found
      </p>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setViewMode('grid')}
          className={viewMode === 'grid' ? 'bg-localuv-primary/10' : ''}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setViewMode('list')}
          className={viewMode === 'list' ? 'bg-localuv-primary/10' : ''}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default ViewToggle;
