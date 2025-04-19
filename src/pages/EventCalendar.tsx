
import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockBusinesses } from '@/lib/businessData';

// Generate mock events
const generateMockEvents = () => {
  const events = [];
  const today = new Date();
  
  for (let i = 0; i < 10; i++) {
    const eventDate = new Date(today);
    eventDate.setDate(eventDate.getDate() + Math.floor(Math.random() * 30));
    
    const business = mockBusinesses[Math.floor(Math.random() * mockBusinesses.length)];
    
    events.push({
      id: `event-${i}`,
      title: [`${business.name} Open House`, 'Community Workshop', 'Product Launch', 'Meet & Greet'][Math.floor(Math.random() * 4)],
      description: `Join us for a special event at ${business.name}`,
      date: eventDate,
      business: business,
      location: business.address || 'To be announced'
    });
  }
  
  return events.sort((a, b) => a.date.getTime() - b.date.getTime());
};

const mockEvents = generateMockEvents();

const EventCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  // Get events for the selected date
  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    
    return mockEvents.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Get dates for the current month view
  const getDatesForMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();
    
    const dates = [];
    
    // Add dates from previous month
    if (startingDayOfWeek > 0) {
      const prevMonthLastDay = new Date(year, month, 0).getDate();
      for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        dates.push({
          date: new Date(year, month - 1, prevMonthLastDay - i),
          isCurrentMonth: false
        });
      }
    }
    
    // Add dates from current month
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Add dates from next month if needed to fill the grid
    const totalDatesShown = Math.ceil((startingDayOfWeek + daysInMonth) / 7) * 7;
    if (dates.length < totalDatesShown) {
      const daysToAdd = totalDatesShown - dates.length;
      for (let i = 1; i <= daysToAdd; i++) {
        dates.push({
          date: new Date(year, month + 1, i),
          isCurrentMonth: false
        });
      }
    }
    
    return dates;
  };
  
  const dates = getDatesForMonth(currentMonth);
  const selectedEvents = getEventsForDate(selectedDate);
  
  const nextMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };
  
  const prevMonth = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };
  
  const hasEvent = (date: Date) => {
    return mockEvents.some(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };
  
  return (
    <div className="min-h-screen bg-localuv-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-serif">Events Calendar</h1>
          <div>
            <Button variant="outline" className="mr-2">Today</Button>
            <Button>Add Event</Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-5 w-5" />
                  <h2 className="text-xl font-semibold">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h2>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                  <div key={i} className="text-center font-medium py-1">
                    {day}
                  </div>
                ))}
                
                {dates.map(({ date, isCurrentMonth }, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedDate(date)}
                    className={`
                      h-20 p-1 border rounded-md cursor-pointer relative
                      ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
                      ${isToday(date) ? 'border-localuv-primary border-2' : 'border-gray-100'}
                      ${selectedDate && 
                        date.getDate() === selectedDate.getDate() && 
                        date.getMonth() === selectedDate.getMonth() && 
                        date.getFullYear() === selectedDate.getFullYear() 
                          ? 'bg-localuv-primary/10 border-localuv-primary' 
                          : ''}
                    `}
                  >
                    <div className="text-right">{date.getDate()}</div>
                    {hasEvent(date) && (
                      <div className="absolute bottom-1 left-1 right-1">
                        <div className="bg-localuv-primary text-white text-xs rounded px-1 py-0.5 truncate">
                          Event
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <Card className="h-full">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {selectedDate 
                    ? `Events on ${selectedDate.toLocaleDateString()}`
                    : 'Upcoming Events'
                  }
                </h2>
                
                {selectedEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedEvents.map(event => (
                      <div key={event.id} className="border-b pb-4">
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          <span>{event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          <span className="mx-1">•</span>
                          <span>{event.business.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : selectedDate ? (
                  <p className="text-gray-500">No events scheduled for this date.</p>
                ) : (
                  <div className="space-y-4">
                    {mockEvents.slice(0, 3).map(event => (
                      <div key={event.id} className="border-b pb-4">
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-gray-600">{event.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          <span>{event.date.toLocaleDateString()}</span>
                          <span className="mx-1">•</span>
                          <span>{event.business.name}</span>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">View All Events</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendar;
