
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ThemeProvider } from "./components/ThemeProvider";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Directory from "./pages/Directory";
import BusinessProfile from "./pages/BusinessProfile";
import EventCalendar from "./pages/EventCalendar";
import NotFound from "./pages/NotFound";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Marketplace from "./pages/Marketplace";
import UserDashboard from "./pages/UserDashboard";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import VendorDashboard from "./pages/VendorDashboard";
import ProductDetail from "./pages/ProductDetail";
import ShoppingCart from "./pages/ShoppingCart";
import CompareProducts from "./pages/CompareProducts";
import HelpCenter from "./pages/HelpCenter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <ThemeProvider defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Navigation />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/directory" element={<Directory />} />
                <Route path="/business/:id" element={<BusinessProfile />} />
                <Route path="/events" element={<EventCalendar />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/vendor-dashboard" element={<VendorDashboard />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/compare-products" element={<CompareProducts />} />
                <Route path="/help-center" element={<HelpCenter />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
