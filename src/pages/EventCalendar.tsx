
import { useState } from 'react';
import { 
  Calendar, 
  CalendarCheck, 
  MapPin, 
  Tag, 
  Users,
  Clock,
  Heart,
  PlusCircle,
  Filter,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: 'Farmers Market Weekend',
    date: '2025-04-26',
    time: '8:00 AM - 1:00 PM',
    location: 'City Center Plaza',
    categories: ['Market', 'Food'],
    description: 'Local farmers and artisans selling fresh produce, baked goods, and handcrafted items.',
    imageUrl: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    attendees: 124,
    isFeatured: true
  },
  {
    id: 2,
    title: 'Community Art Workshop',
    date: '2025-04-25',
    time: '4:00 PM - 6:00 PM',
    location: 'Local Arts Center',
    categories: ['Arts', 'Workshop'],
    description: 'Learn different painting techniques from local artists. All materials provided.',
    imageUrl: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    attendees: 45,
    isFeatured: false
  },
  {
    id: 3,
    title: 'Small Business Networking',
    date: '2025-04-24',
    time: '6:30 PM - 8:30 PM',
    location: 'Downtown Coworking Space',
    categories: ['Business', 'Networking'],
    description: 'Connect with other local entrepreneurs and small business owners.',
    imageUrl: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    attendees: 78,
    isFeatured: false
  },
  {
    id: 4,
    title: 'Local Food Festival',
    date: '2025-05-03',
    time: '11:00 AM - 8:00 PM',
    location: 'Riverfront Park',
    categories: ['Food', 'Festival'],
    description: 'Celebrate the diverse cuisine of our local restaurants, food trucks, and caterers.',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    attendees: 320,
    isFeatured: true
  },
  {
    id: 5,
    title: 'Community Cleanup Day',
    date: '2025-05-10',
    time: '9:00 AM - 12:00 PM',
    location: 'Various Locations',
    categories: ['Community', 'Volunteer'],
    description: 'Join fellow community members in cleaning up our neighborhoods and parks.',
    imageUrl: 'https://images.unsplash.com/photo-1619468129361-605ebea04b44?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    attendees: 95,
    isFeatured: false
  },
  {
    id: 6,
    title: 'Local Music Showcase',
    date: '2025-05-15',
    time: '7:00 PM - 11:00 PM',
    location: 'The Backyard Venue',
    categories: ['Music', 'Entertainment'],
    description: 'Featuring performances from talented local musicians and bands.',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    attendees: 185,
    isFeatured: true
  }
];

// Categories for filtering
const eventCategories = [
  'All Categories',
  'Food',
  'Arts',
  'Music',
  'Business',
  'Community',
  'Workshop',
  'Festival',
  'Market',
  'Volunteer',
  'Entertainment',
  'Networking'
];

const EventCalendar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [viewType, setViewType] = useState('upcoming');
  
  // Filter events based on search term and category
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Categories' || 
                           event.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  // Helper function for date formatting
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-localuv-background dark:bg-gray-900 pb-16">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
            alt="Events background" 
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-localuv-primary/30 to-localuv-background dark:from-gray-900/70 dark:to-gray-900"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 text-center">
          <h1 className="font-serif text-5xl font-bold mb-4 dark:text-white">
            Local Events Calendar
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover and connect with exciting events happening in your community
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <div className="flex-1">
              <Input 
                placeholder="Search events..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/90 dark:bg-gray-800/90 dark:text-white dark:border-gray-700"
              />
            </div>
            <div className="w-full md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-input bg-background dark:bg-gray-800 dark:text-white dark:border-gray-700"
              >
                {eventCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <Button className="bg-localuv-primary hover:bg-localuv-primary/90">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mb-8 pt-8">
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex justify-between items-center mb-6">
              <TabsList className="dark:bg-gray-800">
                <TabsTrigger value="upcoming" onClick={() => setViewType('upcoming')} className="dark:text-gray-300 dark:data-[state=active]:text-white dark:data-[state=active]:bg-gray-700">
                  Upcoming Events
                </TabsTrigger>
                <TabsTrigger value="featured" onClick={() => setViewType('featured')} className="dark:text-gray-300 dark:data-[state=active]:text-white dark:data-[state=active]:bg-gray-700">
                  Featured
                </TabsTrigger>
                <TabsTrigger value="calendar" onClick={() => setViewType('calendar')} className="dark:text-gray-300 dark:data-[state=active]:text-white dark:data-[state=active]:bg-gray-700">
                  Calendar View
                </TabsTrigger>
              </TabsList>
              <Button variant="outline" className="dark:border-gray-700 dark:text-gray-300">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>

            <TabsContent value="upcoming" className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="relative h-48">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full">
                          <Heart className="h-4 w-4 text-gray-500 hover:text-red-500" />
                        </button>
                      </div>
                      {event.isFeatured && (
                        <div className="absolute top-0 left-0 bg-localuv-primary text-white text-xs px-2 py-1">
                          Featured
                        </div>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                            <CalendarCheck className="h-4 w-4 mr-1" />
                            {formatDate(event.date)}
                            <div className="mx-2">•</div>
                            <Clock className="h-4 w-4 mr-1" />
                            {event.time}
                          </div>
                          <CardTitle className="dark:text-white text-lg">{event.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-start mb-3">
                        <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{event.location}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {event.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {event.categories.map((cat, idx) => (
                          <Badge key={idx} variant="outline" className="dark:border-gray-700 dark:text-gray-300">
                            {cat}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4 dark:border-gray-700">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Users className="h-4 w-4 mr-1" />
                        {event.attendees} attending
                      </div>
                      <Button size="sm">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-10">
                <Button variant="outline" className="px-8 dark:border-gray-700 dark:text-gray-300">
                  Load More Events
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="featured" className="mt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.filter(event => event.isFeatured).map(event => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="relative h-48">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-0 left-0 bg-localuv-primary text-white text-xs px-2 py-1">
                        Featured
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <CalendarCheck className="h-4 w-4 mr-1" />
                        {formatDate(event.date)}
                      </div>
                      <CardTitle className="dark:text-white">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-start mb-3">
                        <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5 mr-1 flex-shrink-0" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{event.location}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {event.description}
                      </p>
                    </CardContent>
                    <CardFooter className="border-t pt-4 dark:border-gray-700">
                      <Button className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="calendar" className="mt-2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <div className="grid grid-cols-7 gap-2 mb-2 text-center font-medium dark:text-gray-300">
                  <div>Sun</div>
                  <div>Mon</div>
                  <div>Tue</div>
                  <div>Wed</div>
                  <div>Thu</div>
                  <div>Fri</div>
                  <div>Sat</div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {Array.from({ length: 35 }).map((_, i) => {
                    const day = i - 3; // Starting from a few days before current month
                    const hasEvent = mockEvents.some(event => {
                      const eventDate = new Date(event.date);
                      return eventDate.getDate() === day && eventDate.getMonth() === 3; // April
                    });
                    return (
                      <div 
                        key={i} 
                        className={`aspect-square rounded-md flex flex-col items-center justify-start p-2 
                          ${day > 0 && day <= 30 ? 'border dark:border-gray-700' : 'text-gray-400 dark:text-gray-600'} 
                          ${hasEvent ? 'bg-localuv-primary/10 dark:bg-localuv-primary/20' : ''}`}
                      >
                        <span className={`text-sm mb-1 ${day > 0 && day <= 30 ? 'dark:text-white' : ''}`}>
                          {day > 0 && day <= 30 ? day : ''}
                        </span>
                        {hasEvent && (
                          <div className="w-1.5 h-1.5 rounded-full bg-localuv-primary dark:bg-localuv-secondary"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4 dark:text-white">Upcoming Events This Month</h3>
                <div className="space-y-4">
                  {filteredEvents.slice(0, 3).map(event => (
                    <div key={event.id} className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                      <div className="w-16 h-16 bg-localuv-primary/10 dark:bg-localuv-primary/20 rounded-lg flex flex-col items-center justify-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className="text-2xl font-bold text-localuv-primary dark:text-localuv-secondary">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium dark:text-white">{event.title}</h4>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                          <div className="mx-2">•</div>
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.location}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {event.categories.map((cat, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs dark:border-gray-700 dark:text-gray-300">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="self-center dark:border-gray-700 dark:text-gray-300">
                        Details
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Create Event Section */}
      <div className="bg-localuv-primary/10 dark:bg-gray-800/50 py-16 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="font-serif text-3xl mb-4 dark:text-white">Host Your Own Event</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Are you a local business or community organizer? Create and promote your events to connect with the community.
              </p>
              <Button className="bg-localuv-primary hover:bg-localuv-primary/90">
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Event
              </Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Event hosting" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
