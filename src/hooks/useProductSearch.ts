
import { useState, useEffect, useMemo } from 'react';
import { Product, ProductFilters } from '@/types/product';

interface UseProductSearchProps {
  products: Product[];
  initialFilters?: ProductFilters;
}

interface UseProductSearchResult {
  filteredProducts: Product[];
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  updateFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void;
  resetFilters: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isFiltering: boolean;
}

export function useProductSearch({ 
  products, 
  initialFilters = {} 
}: UseProductSearchProps): UseProductSearchResult {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const [searchQuery, setSearchQuery] = useState<string>(initialFilters.query || '');

  // Update the search query in filters when it changes
  useEffect(() => {
    if (searchQuery !== filters.query) {
      setFilters(prev => ({ ...prev, query: searchQuery }));
    }
  }, [searchQuery, filters.query]);

  // Function to update a single filter
  const updateFilter = <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Reset filters to initial state
  const resetFilters = () => {
    setFilters(initialFilters);
    setSearchQuery(initialFilters.query || '');
  };

  // Compute if any filters are active
  const isFiltering = useMemo(() => {
    return (
      !!searchQuery ||
      (filters.categories && filters.categories.length > 0) ||
      (filters.priceRange && 
        (filters.priceRange[0] > 0 || filters.priceRange[1] < Infinity)) ||
      !!filters.rating ||
      !!filters.businessId ||
      !!filters.status ||
      !!filters.sortBy
    );
  }, [filters, searchQuery]);

  // Filter products based on all active filters
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        (product.description && product.description.toLowerCase().includes(query))
      );
    }

    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories!.includes(product.category)
      );
    }

    // Filter by price range
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      result = result.filter(product => 
        product.price >= min && product.price <= max
      );
    }

    // Filter by rating
    if (filters.rating) {
      result = result.filter(product => 
        (product.rating || 0) >= (filters.rating || 0)
      );
    }

    // Filter by business ID
    if (filters.businessId) {
      result = result.filter(product => 
        product.businessId === filters.businessId
      );
    }

    // Filter by status
    if (filters.status) {
      result = result.filter(product => 
        product.status === filters.status
      );
    }

    // Sort products
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'name-asc':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'name-desc':
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'rating-desc':
          result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
      }
    }

    return result;
  }, [products, filters]);

  return {
    filteredProducts,
    filters,
    setFilters,
    updateFilter,
    resetFilters,
    searchQuery,
    setSearchQuery,
    isFiltering
  };
}
