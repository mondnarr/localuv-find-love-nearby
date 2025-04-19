
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface Promotion {
  id: string;
  businessName: string;
  title: string;
  description: string;
  imageUrl: string;
  expiresAt: Date;
}

interface PromotionSliderProps {
  promotions: Promotion[];
}

const PromotionSlider: React.FC<PromotionSliderProps> = ({ promotions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number }>({ days: 0, hours: 0, minutes: 0 });

  // Calculate time remaining for the current promotion
  useEffect(() => {
    if (!promotions.length) return;

    const calculateTimeRemaining = () => {
      const now = new Date();
      const expiresAt = new Date(promotions[currentIndex].expiresAt);
      const totalSeconds = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / 1000));
      
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      
      setTimeLeft({ days, hours, minutes });
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [currentIndex, promotions]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? promotions.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === promotions.length - 1 ? 0 : prev + 1));
  };

  if (!promotions.length) {
    return <div className="text-center py-10">No promotions available</div>;
  }

  const promotion = promotions[currentIndex];

  return (
    <div className="relative max-w-4xl mx-auto">
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md"
        onClick={handlePrev}
      >
        <ChevronLeft />
      </Button>
      
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="aspect-square md:aspect-auto overflow-hidden">
            <img 
              src={promotion.imageUrl} 
              alt={promotion.businessName} 
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="flex flex-col justify-center p-6">
            <div className="bg-localuv-accent/20 text-localuv-primary font-bold text-2xl md:text-4xl py-2 px-4 rounded-lg inline-block mb-3">
              {promotion.title}
            </div>
            <h3 className="text-xl font-semibold mb-2">{promotion.businessName}</h3>
            <p className="text-gray-600 mb-4">{promotion.description}</p>
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Clock className="h-4 w-4 mr-1" />
              <span>Expires in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
            </div>
            <Button className="w-full md:w-auto">Claim Offer</Button>
          </CardContent>
        </div>
      </Card>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md"
        onClick={handleNext}
      >
        <ChevronRight />
      </Button>
      
      <div className="flex justify-center mt-4 space-x-2">
        {promotions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-localuv-primary w-4' : 'bg-gray-300'
            }`}
            aria-label={`Go to promotion ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromotionSlider;
