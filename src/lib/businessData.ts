
export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  distance: number;
  imageUrl: string;
  tags: string[];
}

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Cozy Corner Café',
    category: 'Café',
    description: 'Artisan coffee and homemade pastries',
    rating: 4.5,
    distance: 0.5,
    imageUrl: '/placeholder-cafe.jpg',
    tags: ['Coffee', 'Breakfast', 'Free WiFi']
  },
  // Add more mock businesses...
];
