
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, Calendar, User, Menu, X, ShoppingBag, 
  MapPin, Heart, Book, LogOut, ShoppingCart, Store 
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
    <nav className="bg-white shadow-sm sticky top-0 z-10">
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
                      <Link to="/directory" className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100">
                        <MapPin className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Directory</div>
                          <div className="text-xs text-gray-500">Find local businesses</div>
                        </div>
                      </Link>
                      <Link to="/marketplace" className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100">
                        <ShoppingBag className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Marketplace</div>
                          <div className="text-xs text-gray-500">Shop local products</div>
                        </div>
                      </Link>
                      <Link to="/events" className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100">
                        <Calendar className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Events</div>
                          <div className="text-xs text-gray-500">Local happenings</div>
                        </div>
                      </Link>
                      <Link to="/blog" className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-100">
                        <Book className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Blog</div>
                          <div className="text-xs text-gray-500">News & insights</div>
                        </div>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/directory" className="text-gray-600 hover:text-localuv-primary">
              Directory
            </Link>
            <Link to="/marketplace" className="text-gray-600 hover:text-localuv-primary">
              Marketplace
            </Link>
            <Link to="/events" className="text-gray-600 hover:text-localuv-primary flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Events
            </Link>
            <Link to="/blog" className="text-gray-600 hover:text-localuv-primary">
              Blog
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-localuv-primary">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-localuv-primary">
              Contact
            </Link>
            
            <Link to="/cart" className="text-gray-600 hover:text-localuv-primary">
              <ShoppingCart className="h-5 w-5" />
            </Link>

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
            <Link to="/cart" className="mr-2 text-gray-600">
              <ShoppingCart className="h-5 w-5" />
            </Link>
            
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
              className="p-2 rounded-md text-gray-500 hover:text-localuv-primary focus:outline-none"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-2 space-y-1">
            <Link 
              to="/directory" 
              className="block py-2 text-gray-600 hover:text-localuv-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Directory
            </Link>
            <Link 
              to="/marketplace" 
              className="block py-2 text-gray-600 hover:text-localuv-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Marketplace
            </Link>
            <Link 
              to="/events" 
              className="block py-2 text-gray-600 hover:text-localuv-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              to="/blog" 
              className="block py-2 text-gray-600 hover:text-localuv-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              to="/about" 
              className="block py-2 text-gray-600 hover:text-localuv-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="block py-2 text-gray-600 hover:text-localuv-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {!loading && user && (
              <>
                <Link 
                  to="/dashboard" 
                  className="block py-2 text-gray-600 hover:text-localuv-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link 
                  to="/vendor-dashboard" 
                  className="block py-2 text-gray-600 hover:text-localuv-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Vendor Dashboard
                </Link>
                <button 
                  className="block py-2 text-gray-600 hover:text-localuv-primary w-full text-left"
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
