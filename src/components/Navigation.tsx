
import { Link } from 'react-router-dom';
import { Search, Calendar } from 'lucide-react';
import { Input } from './ui/input';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-serif text-2xl text-localuv-primary">
            LocaLuv
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/directory" className="text-gray-600 hover:text-localuv-primary">
              Directory
            </Link>
            <Link to="/events" className="text-gray-600 hover:text-localuv-primary flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Events
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
