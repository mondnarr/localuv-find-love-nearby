
export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  rating: number;
  distance: number;
  imageUrl: string;
  tags: string[];
  address?: string;
  phone?: string;
  hours?: string[];
}

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Cozy Corner Café',
    category: 'Café',
    description: 'Artisan coffee and homemade pastries in a warm, inviting atmosphere',
    rating: 4.5,
    distance: 0.5,
    imageUrl: '/placeholder-cafe.jpg',
    tags: ['Coffee', 'Breakfast', 'Free WiFi'],
    address: '123 Main St',
    phone: '(555) 123-4567',
    hours: ['Mon-Fri: 7AM-7PM', 'Sat-Sun: 8AM-6PM']
  },
  {
    id: '2',
    name: 'Green Leaf Bistro',
    category: 'Restaurant',
    description: 'Farm-to-table organic cuisine with seasonal ingredients',
    rating: 4.8,
    distance: 0.7,
    imageUrl: '/placeholder-restaurant.jpg',
    tags: ['Organic', 'Vegan Options', 'Gluten-Free'],
    address: '456 Oak Ave',
    phone: '(555) 234-5678',
    hours: ['Tue-Sun: 11AM-10PM', 'Closed Mondays']
  },
  {
    id: '3',
    name: 'Urban Fitness Studio',
    category: 'Gym',
    description: '24/7 fitness center with state-of-the-art equipment and personal training',
    rating: 4.6,
    distance: 1.2,
    imageUrl: '/placeholder-gym.jpg',
    tags: ['Gym', 'Personal Training', '24/7'],
    address: '789 Fitness Way',
    phone: '(555) 345-6789',
    hours: ['Open 24/7']
  },
  {
    id: '4',
    name: 'The Beauty Bar',
    category: 'Salon',
    description: 'Full-service beauty salon offering hair, nails, and spa treatments',
    rating: 4.7,
    distance: 0.9,
    imageUrl: '/placeholder-salon.jpg',
    tags: ['Hair', 'Nails', 'Spa'],
    address: '321 Beauty Blvd',
    phone: '(555) 456-7890',
    hours: ['Mon-Sat: 9AM-8PM', 'Sun: 10AM-6PM']
  },
  {
    id: '5',
    name: 'Tech Hub Repairs',
    category: 'Services',
    description: 'Expert device repair and IT services with quick turnaround',
    rating: 4.4,
    distance: 1.5,
    imageUrl: '/placeholder-tech.jpg',
    tags: ['Repairs', 'IT Services', 'Electronics'],
    address: '555 Tech Street',
    phone: '(555) 567-8901',
    hours: ['Mon-Fri: 9AM-6PM', 'Sat: 10AM-4PM']
  },
  {
    id: '6',
    name: 'Vintage Finds',
    category: 'Retail',
    description: 'Curated vintage clothing and unique accessories',
    rating: 4.3,
    distance: 0.8,
    imageUrl: '/placeholder-retail.jpg',
    tags: ['Vintage', 'Fashion', 'Accessories'],
    address: '888 Retro Road',
    phone: '(555) 678-9012',
    hours: ['Wed-Sun: 11AM-7PM', 'Closed Mon-Tue']
  },
  {
    id: '7',
    name: 'Fresh Market Grocery',
    category: 'Grocery',
    description: 'Local produce and specialty foods market',
    rating: 4.6,
    distance: 0.3,
    imageUrl: '/placeholder-grocery.jpg',
    tags: ['Organic', 'Local', 'Fresh Produce'],
    address: '444 Market Street',
    phone: '(555) 789-0123',
    hours: ['Daily: 8AM-9PM']
  },
  {
    id: '8',
    name: 'Paws & Play Pet Store',
    category: 'Pet Services',
    description: 'Pet supplies and grooming services',
    rating: 4.7,
    distance: 1.1,
    imageUrl: '/placeholder-pet.jpg',
    tags: ['Pet Supplies', 'Grooming', 'Pet Food'],
    address: '777 Pet Paradise Lane',
    phone: '(555) 890-1234',
    hours: ['Mon-Sat: 9AM-7PM', 'Sun: 10AM-5PM']
  },
  {
    id: '9',
    name: 'Modern Art Gallery',
    category: 'Arts & Culture',
    description: 'Contemporary art exhibitions and workshops',
    rating: 4.5,
    distance: 1.8,
    imageUrl: '/placeholder-gallery.jpg',
    tags: ['Art', 'Exhibitions', 'Workshops'],
    address: '999 Gallery Way',
    phone: '(555) 901-2345',
    hours: ['Tue-Sun: 10AM-6PM', 'Closed Mondays']
  },
  {
    id: '10',
    name: 'The Book Nook',
    category: 'Retail',
    description: 'Independent bookstore with rare finds and coffee bar',
    rating: 4.9,
    distance: 0.6,
    imageUrl: '/placeholder-books.jpg',
    tags: ['Books', 'Coffee', 'Events'],
    address: '222 Reader\'s Row',
    phone: '(555) 012-3456',
    hours: ['Mon-Sat: 10AM-8PM', 'Sun: 11AM-6PM']
  }
];
