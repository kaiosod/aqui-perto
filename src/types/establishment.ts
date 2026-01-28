export type CategoryType = 'restaurant' | 'pharmacy' | 'supermarket' | 'custom';

export interface Category {
  id: CategoryType;
  label: string;
  icon: string;
  osmTag: string;
}

export interface Establishment {
  id: string;
  name: string;
  category: CategoryType;
  distance: number; // in meters
  lat: number;
  lon: number;
  address?: string;
}

export interface Location {
  lat: number;
  lon: number;
}
