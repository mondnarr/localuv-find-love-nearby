
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <header className="relative bg-gradient-to-r from-localuv-primary to-localuv-secondary text-white py-24 overflow-hidden">
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1519999482648-25049ddd37b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2676&q=80"
          alt="City streets"
          className="w-full h-full object-cover opacity-40 scale-105 animate-[pulse_4s_ease-in-out_infinite]"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl animate-[fade-in_1s_ease-out]">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight">
            Discover & Support Your
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent block">
              Local Community
            </span>
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-white/90">
            Connect with amazing local businesses, find unique products, and earn rewards while supporting your community.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-white text-localuv-primary hover:bg-white/90 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Explore Directory
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Join as Business
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
