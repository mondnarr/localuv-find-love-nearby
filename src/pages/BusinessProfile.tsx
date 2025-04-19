
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockBusinesses } from '@/lib/businessData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Phone, Clock, Star, Calendar, MessageCircle } from 'lucide-react';

const BusinessProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [business, setBusiness] = useState<typeof mockBusinesses[0] | null>(null);
  
  useEffect(() => {
    // In a real app, this would be a data fetch
    const foundBusiness = mockBusinesses.find(b => b.id === id);
    setBusiness(foundBusiness || null);
  }, [id]);

  if (!business) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h2 className="text-2xl font-serif">Business not found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-localuv-background">
      <div className="h-64 md:h-96 bg-gray-300 relative">
        <img
          src={business.imageUrl}
          alt={business.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="font-serif text-4xl mb-2">{business.name}</h1>
                  <p className="text-gray-600 mb-2">{business.category}</p>
                </div>
                <div className="flex items-center px-3 py-1 bg-localuv-primary/10 rounded-lg">
                  <Star className="text-yellow-500 h-5 w-5" />
                  <span className="ml-1 font-bold">{business.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {business.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-localuv-accent/10 text-xs rounded-full text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="prose max-w-none">
              <h2>About</h2>
              <p>{business.description}</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim.</p>
            </div>

            <div>
              <h2 className="text-xl font-serif mb-4">Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Service 1: Lorem ipsum dolor sit amet', 
                  'Service 2: Consectetur adipiscing elit', 
                  'Service 3: Sed do eiusmod tempor', 
                  'Service 4: Ut labore et dolore magna'
                ].map((service, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                    <p>{service}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-serif mb-4">Business Information</h2>
              
              {business.address && (
                <div className="flex items-start space-x-3 mb-4">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{business.address}</p>
                    <p className="text-gray-500 text-sm">{business.distance} miles away</p>
                  </div>
                </div>
              )}
              
              {business.phone && (
                <div className="flex items-start space-x-3 mb-4">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">{business.phone}</p>
                  </div>
                </div>
              )}
              
              {business.hours && business.hours.length > 0 && (
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <p className="font-medium">Hours</p>
                    {business.hours.map((hour, idx) => (
                      <p key={idx} className="text-gray-600">{hour}</p>
                    ))}
                  </div>
                </div>
              )}
            </Card>
            
            <div className="space-y-3">
              <Button className="w-full flex items-center justify-center">
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center">
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Business
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfile;
