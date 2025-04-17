
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

const Navigation = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-serif text-2xl text-localuv-primary">
            LocaLuv
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/directory" className="text-gray-600 hover:text-localuv-primary">
              Directory
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-localuv-primary">
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
