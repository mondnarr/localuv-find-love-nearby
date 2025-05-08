
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  businessId: string;
  businessName: string;
  category: string;
  inventory?: number;
  status?: string;
  features?: string[];
  rating?: number;
  reviewCount?: number;
  vendor?: {
    name: string;
    rating: number;
  };
}

export interface ProductFilters {
  query?: string;
  categories?: string[];
  priceRange?: [number, number];
  rating?: number;
  businessId?: string;
  status?: string;
  sortBy?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'rating-desc';
}
