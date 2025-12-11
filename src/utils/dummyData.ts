import { Resort, Room, OnboardingSlide, Review } from '../types';

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Discover Amazing Resorts',
    subtitle: 'Find the perfect getaway with thousands of luxury resorts worldwide',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'Book with Confidence',
    subtitle: 'Easy booking process with instant confirmation and 24/7 support',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=600&fit=crop',
  },
  {
    id: '3',
    title: 'Create Memories',
    subtitle: 'Experience unforgettable moments at the world\'s best destinations',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=600&fit=crop',
  },
];

export const featuredResorts: Resort[] = [
  {
    id: '1',
    name: 'Oceanview Paradise Resort',
    location: 'Maldives',
    rating: 4.8,
    reviewCount: 1247,
    price: 299,
    originalPrice: 399,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
    ],
    amenities: ['WiFi', 'Pool', 'Spa', 'Beach Access', 'Restaurant'],
    description: 'Experience luxury at its finest with stunning ocean views and world-class amenities.',
    featured: true,
    discount: 25,
    coordinates: {
      latitude: 3.2028,
      longitude: 73.2207,
    },
  },
  {
    id: '2',
    name: 'Mountain View Lodge',
    location: 'Swiss Alps',
    rating: 4.6,
    reviewCount: 892,
    price: 199,
    images: [
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop',
    ],
    amenities: ['WiFi', 'Fireplace', 'Mountain View', 'Hiking', 'Restaurant'],
    description: 'Cozy mountain retreat with breathtaking alpine views and outdoor adventures.',
    featured: true,
    coordinates: {
      latitude: 46.5197,
      longitude: 7.4815,
    },
  },
  {
    id: '3',
    name: 'Tropical Beach Resort',
    location: 'Bali, Indonesia',
    rating: 4.7,
    reviewCount: 2156,
    price: 149,
    originalPrice: 199,
    images: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop',
    ],
    amenities: ['WiFi', 'Pool', 'Beach Access', 'Spa', 'Bar', 'Restaurant'],
    description: 'Tropical paradise with pristine beaches and authentic Indonesian hospitality.',
    featured: true,
    discount: 25,
    coordinates: {
      latitude: -8.3405,
      longitude: 115.0920,
    },
  },
];

export const popularResorts: Resort[] = [
  {
    id: '4',
    name: 'City Center Hotel',
    location: 'New York, USA',
    rating: 4.4,
    reviewCount: 3421,
    price: 179,
    images: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
    ],
    amenities: ['WiFi', 'Gym', 'Business Center', 'Restaurant'],
    description: 'Modern hotel in the heart of the city with easy access to attractions.',
    featured: false,
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
  },
  {
    id: '5',
    name: 'Desert Oasis Resort',
    location: 'Dubai, UAE',
    rating: 4.9,
    reviewCount: 1876,
    price: 349,
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    ],
    amenities: ['WiFi', 'Pool', 'Spa', 'Desert Safari', 'Fine Dining'],
    description: 'Luxury desert resort with world-class amenities and stunning architecture.',
    featured: false,
    coordinates: {
      latitude: 25.2048,
      longitude: 55.2708,
    },
  },
];

export const rooms: Room[] = [
  {
    id: 'r1',
    resortId: '1',
    name: 'Ocean View Suite',
    type: 'Suite',
    price: 299,
    originalPrice: 399,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    ],
    amenities: ['Ocean View', 'King Bed', 'Mini Bar', 'Balcony', 'WiFi'],
    description: 'Spacious suite with panoramic ocean views and luxury amenities.',
    maxGuests: 2,
    bedType: 'King',
    size: 45,
    available: true,
  },
  {
    id: 'r2',
    resortId: '1',
    name: 'Deluxe Room',
    type: 'Deluxe',
    price: 199,
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop',
    ],
    amenities: ['Garden View', 'Queen Bed', 'WiFi', 'Air Conditioning'],
    description: 'Comfortable deluxe room with modern amenities and garden views.',
    maxGuests: 2,
    bedType: 'Queen',
    size: 30,
    available: true,
  },
];

export const reviews: Review[] = [
  {
    id: 'rev1',
    resortId: '1',
    userId: 'u1',
    userName: 'Sarah Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment: 'Absolutely amazing experience! The staff was incredible and the views were breathtaking.',
    date: '2024-01-15',
    helpful: 12,
  },
  {
    id: 'rev2',
    resortId: '1',
    userId: 'u2',
    userName: 'Mike Chen',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    rating: 4,
    comment: 'Great resort with excellent amenities. The food was outstanding!',
    date: '2024-01-10',
    helpful: 8,
  },
];
