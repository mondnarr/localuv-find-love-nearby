
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
  {
    id: '2',
    name: 'Green Leaf Bistro',
    category: 'Restaurant',
    description: 'Farm-to-table organic cuisine',
    rating: 4.8,
    distance: 0.7,
    imageUrl: '/placeholder-restaurant.jpg',
    tags: ['Organic', 'Vegan Options', 'Gluten-Free']
  },
  {
    id: '3',
    name: 'Urban Fitness Studio',
    category: 'Gym',
    description: '24/7 fitness center with personal training',
    rating: 4.6,
    distance: 1.2,
    imageUrl: '/placeholder-gym.jpg',
    tags: ['Gym', 'Personal Training', '24/7']
  },
  {
    id: '4',
    name: 'The Beauty Bar',
    category: 'Salon',
    description: 'Full-service beauty salon and spa',
    rating: 4.7,
    distance: 0.9,
    imageUrl: '/placeholder-salon.jpg',
    tags: ['Hair', 'Nails', 'Spa']
  },
  {
    id: '5',
    name: 'Tech Hub Repairs',
    category: 'Services',
    description: 'Expert device repair and IT services',
    rating: 4.4,
    distance: 1.5,
    imageUrl: '/placeholder-tech.jpg',
    tags: ['Repairs', 'IT Services', 'Electronics']
  },
  {
    id: '6',
    name: 'Vintage Finds',
    category: 'Retail',
    description: 'Curated vintage clothing and accessories',
    rating: 4.3,
    distance: 0.8,
    imageUrl: '/placeholder-retail.jpg',
    tags: ['Vintage', 'Fashion', 'Accessories']
  }
];
