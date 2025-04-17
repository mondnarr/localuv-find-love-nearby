
import React from 'react';
import { Business } from '@/lib/businessData';
import { Star, MapPin } from 'lucide-react';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={business.imageUrl} 
        alt={business.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-serif text-xl font-semibold text-gray-800">{business.name}</h3>
        <p className="text-gray-600 mb-2">{business.category}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="text-yellow-500" size={16} />
            <span>{business.rating}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="text-localuv-primary" size={16} />
            <span>{business.distance} mi</span>
          </div>
        </div>
        <div className="mt-2 flex space-x-2">
          {business.tags.map(tag => (
            <span 
              key={tag} 
              className="px-2 py-1 bg-localuv-accent/20 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
