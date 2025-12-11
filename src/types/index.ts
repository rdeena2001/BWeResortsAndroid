export interface Resort {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  images: string[];
  amenities: string[];
  description: string;
  featured: boolean;
  discount?: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Room {
  id: string;
  resortId: string;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  images: string[];
  amenities: string[];
  description: string;
  maxGuests: number;
  bedType: string;
  size: number;
  available: boolean;
}

export interface Booking {
  id: string;
  resortId: string;
  roomId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  bookingDate: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  wishlist: string[];
}

export interface Review {
  id: string;
  resortId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface SearchFilters {
  location?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  amenities?: string[];
  sortBy?: 'price' | 'rating' | 'distance' | 'popularity';
}

export interface OnboardingSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}
