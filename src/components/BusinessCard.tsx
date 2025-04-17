
import React from 'react';
import { Business } from '@/lib/businessData';
import { Star, MapPin, Phone, Clock } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <div className="aspect-video w-full overflow-hidden rounded-t-lg">
        <img 
          src={business.imageUrl} 
          alt={business.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-serif text-xl font-semibold text-gray-800">{business.name}</h3>
            <p className="text-gray-600">{business.category}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-500" size={16} />
            <span className="font-medium">{business.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm line-clamp-2">{business.description}</p>
        
        <div className="space-y-2 text-sm">
          {business.address && (
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin size={16} />
              <span>{business.address} • {business.distance} mi</span>
            </div>
          )}
          {business.phone && (
            <div className="flex items-center space-x-2 text-gray-600">
              <Phone size={16} />
              <span>{business.phone}</span>
            </div>
          )}
          {business.hours && business.hours.length > 0 && (
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock size={16} />
              <span>{business.hours[0]}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {business.tags.map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-localuv-accent/10 text-xs rounded-full text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
