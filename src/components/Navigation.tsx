import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Calendar, User, Menu, X, ShoppingBag, 
  MapPin, Heart, Book, LogOut, ShoppingCart, Store,
  HelpCircle, Truck, ShoppingBasket, Compare
} from 'lucide-react';
import { Input } from './ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Button } from './ui/button';
import { useAuth } from '@/contexts/AuthContext';
import DarkModeToggle from './DarkModeToggle';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        description: "You have been logged out.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out.",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10 dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-serif text-2xl text-localuv-primary">
            LocaLuv
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-3 p-4 w-[400px]">
                      <Link to="/directory" className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                        <MapPin className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Directory</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Find local businesses</div>
                        </div>
                      </Link>
                      <Link to="/marketplace" className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                        <ShoppingBag className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Marketplace</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Shop local products</div>
                        </div>
                      </Link>
                      <Link to="/events" className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                        <Calendar className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Events</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Local happenings</div>
                        </div>
                      </Link>
                      <Link to="/blog" className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                        <Book className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Blog</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">News & insights</div>
                        </div>
                      </Link>
                      <Link to="/help-center" className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800">
                        <HelpCircle className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Help Center</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">FAQs & Support</div>
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/directory" className="text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white">
              Directory
            </Link>
            <Link to="/marketplace" className="text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white">
              Marketplace
            </Link>
            <Link to="/events" className="text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Events
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white">
              Blog
            </Link>
            <Link to="/track-order" className="text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white flex items-center">
              <Truck className="h-4 w-4 mr-1" />
              Track Order
            </Link>
            
            <Link to="/cart" className="text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white">
              <ShoppingCart className="h-5 w-5" />
            </Link>

            <DarkModeToggle />

            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/vendor-dashboard')}>
                        <Store className="mr-2 h-4 w-4" />
                        Vendor Dashboard
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button variant="default" size="sm" onClick={() => navigate('/auth')}>
                    Sign In
                  </Button>
                )}
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Link to="/cart" className="mr-2 text-gray-600 dark:text-gray-300">
              <ShoppingCart className="h-5 w-5" />
            </Link>
            
            <DarkModeToggle />
            
            {!loading && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="mr-2">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/vendor-dashboard')}>
                    Vendor Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {!loading && !user && (
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => navigate('/auth')}
                className="mr-2"
              >
                Sign In
              </Button>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:text-localuv-primary focus:outline-none dark:text-gray-400 dark:hover:text-white"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t dark:bg-gray-900 dark:border-gray-700">
          <div className="container mx-auto px-4 py-2 space-y-1">
            <Link 
              to="/directory" 
              className="block py-2 text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Directory
            </Link>
            <Link 
              to="/marketplace" 
              className="block py-2 text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link 
              to="/events" 
              className="block py-2 text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              to="/blog" 
              className="block py-2 text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/track-order" 
              className="block py-2 text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Track Order
            </Link>
            <Link 
              to="/help-center" 
              className="block py-2 text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Help Center
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {!loading && user && (
              <>
                <Link 
                  to="/dashboard" 
                  className="block py-2 text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link 
                  to="/vendor-dashboard" 
                  className="block py-2 text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Vendor Dashboard
                </Link>
                <button 
                  className="block py-2 text-gray-600 hover:text-localuv-primary dark:text-gray-300 dark:hover:text-white w-full text-left"
                  onClick={() => {
                    handleSignOut();
                    setMobileMenuOpen(false);
                  }}
                >
                  Log Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
