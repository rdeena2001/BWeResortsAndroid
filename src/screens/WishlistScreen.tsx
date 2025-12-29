import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader, AppCard, Rating } from '../components';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../constants';

interface WishlistItem {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  image: string;
  isLiked: boolean;
  category: 'resort' | 'room';
  description: string;
}

const WishlistScreen: React.FC = () => {
  const navigation = useNavigation();

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 'resort1',
      name: 'Paradise Beach Resort & Spa',
      location: 'Maldives, Indian Ocean',
      rating: 4.8,
      reviewCount: 1247,
      price: 250,
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      isLiked: true,
      category: 'resort',
      description: 'Luxury beachfront resort with world-class amenities',
    },
    {
      id: 'resort2',
      name: 'Mountain View Lodge',
      location: 'Swiss Alps, Switzerland',
      rating: 4.6,
      reviewCount: 892,
      price: 180,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
      isLiked: true,
      category: 'resort',
      description: 'Cozy mountain retreat with stunning alpine views',
    },
    {
      id: 'room1',
      name: 'Overwater Bungalow',
      location: 'Bora Bora, French Polynesia',
      rating: 4.9,
      reviewCount: 456,
      price: 650,
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      isLiked: true,
      category: 'room',
      description: 'Exclusive overwater villa with glass floor panels',
    },
    {
      id: 'resort3',
      name: 'Desert Oasis Resort',
      location: 'Dubai, UAE',
      rating: 4.7,
      reviewCount: 1534,
      price: 320,
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
      isLiked: true,
      category: 'resort',
      description: 'Luxury desert resort with traditional Arabian hospitality',
    },
    {
      id: 'room2',
      name: 'Presidential Suite',
      location: 'New York, USA',
      rating: 4.5,
      reviewCount: 234,
      price: 850,
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop',
      isLiked: true,
      category: 'room',
      description: 'Luxurious penthouse suite with city skyline views',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<'all' | 'resort' | 'room'>('all');

  const handleToggleLike = (itemId: string) => {
    setWishlistItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, isLiked: !item.isLiked } : item
      )
    );
  };

  const handleRemoveFromWishlist = (itemId: string, itemName: string) => {
    Alert.alert(
      'Remove from Wishlist',
      `Are you sure you want to remove "${itemName}" from your wishlist?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setWishlistItems(prev => prev.filter(item => item.id !== itemId));
          },
        },
      ]
    );
  };

  const handleItemPress = (item: WishlistItem) => {
    if (item.category === 'resort') {
      navigation.navigate('ResortDetail', { resortId: item.id });
    } else {
      navigation.navigate('RoomDetail', {
        roomId: item.id,
        roomName: item.name,
        roomPrice: item.price
      });
    }
  };

  const filteredItems = wishlistItems.filter(item => {
    if (selectedCategory === 'all') return item.isLiked;
    return item.category === selectedCategory && item.isLiked;
  });

  const renderCategoryFilter = () => (
    <View style={styles.filterContainer}>
      {[
        { key: 'all', label: 'All', count: wishlistItems.filter(i => i.isLiked).length },
        { key: 'resort', label: 'Resorts', count: wishlistItems.filter(i => i.category === 'resort' && i.isLiked).length },
        { key: 'room', label: 'Rooms', count: wishlistItems.filter(i => i.category === 'room' && i.isLiked).length },
      ].map(filter => (
        <TouchableOpacity
          key={filter.key}
          style={[
            styles.filterButton,
            selectedCategory === filter.key && styles.filterButtonActive,
          ]}
          onPress={() => setSelectedCategory(filter.key as any)}
        >
          <Text
            style={[
              styles.filterText,
              selectedCategory === filter.key && styles.filterTextActive,
            ]}
          >
            {filter.label} ({filter.count})
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderWishlistItem = (item: WishlistItem, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.wishlistCard}
      onPress={() => handleItemPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>
            {item.category === 'resort' ? 'Resort' : 'Room'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => handleToggleLike(item.id)}
        >
          <Ionicons
            name={item.isLiked ? 'heart' : 'heart-outline'}
            size={24}
            color={item.isLiked ? Colors.error : Colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemName} numberOfLines={1}>
            {item.name}
          </Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveFromWishlist(item.id, item.name)}
          >
            <Ionicons name="trash-outline" size={18} color={Colors.gray500} />
          </TouchableOpacity>
        </View>

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color={Colors.gray500} />
          <Text style={styles.location} numberOfLines={1}>
            {item.location}
          </Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.itemFooter}>
          <View style={styles.ratingContainer}>
            <Rating rating={item.rating} size={14} />
            <Text style={styles.ratingText}>
              {item.rating} ({item.reviewCount})
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.priceUnit}>/night</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="heart-outline" size={80} color={Colors.gray300} />
      <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
      <Text style={styles.emptySubtitle}>
        Start exploring and save your favorite resorts and rooms
      </Text>
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => navigation.navigate('Search')}
      >
        <Text style={styles.exploreButtonText}>Explore Resorts</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader title="My Wishlist" />

      {filteredItems.length > 0 ? (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Stats */}
          <AppCard style={styles.statsCard}>
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {wishlistItems.filter(i => i.isLiked).length}
                </Text>
                <Text style={styles.statLabel}>Saved Items</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {wishlistItems.filter(i => i.category === 'resort' && i.isLiked).length}
                </Text>
                <Text style={styles.statLabel}>Resorts</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>
                  {wishlistItems.filter(i => i.category === 'room' && i.isLiked).length}
                </Text>
                <Text style={styles.statLabel}>Rooms</Text>
              </View>
            </View>
          </AppCard>

          {/* Category Filter */}
          {renderCategoryFilter()}

          {/* Wishlist Items */}
          <View style={styles.itemsContainer}>
            {filteredItems.map((item, index) => renderWishlistItem(item, index))}
          </View>
        </ScrollView>
      ) : (
        renderEmptyState()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  statsCard: {
    margin: Spacing.md,
    padding: Spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.gray200,
    marginHorizontal: Spacing.md,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  filterButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.gray100,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.white,
  },
  itemsContainer: {
    paddingHorizontal: Spacing.md,
  },
  wishlistCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  imageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  categoryText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.white,
  },
  heartButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    padding: Spacing.md,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  itemName: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: Spacing.sm,
  },
  removeButton: {
    padding: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  location: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginLeft: 4,
    flex: 1,
  },
  description: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: Spacing.sm,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
  },
  priceUnit: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  exploreButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  exploreButtonText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.white,
  },
});

export default WishlistScreen;
