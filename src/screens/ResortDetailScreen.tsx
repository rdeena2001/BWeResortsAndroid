import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { AppButton, AppCard, AppHeader, Rating } from '../components';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../constants';
import { RootStackParamList } from '../types/navigation';

const { width } = Dimensions.get('window');

type ResortDetailScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface RouteParams {
  resortId?: string;
}

const ResortDetailScreen: React.FC = () => {
  const navigation = useNavigation<ResortDetailScreenNavigationProp>();
  const route = useRoute();
  const params = route.params as RouteParams;

  // Dummy resort data
  const resortData = {
    id: params?.resortId || 'resort1',
    name: 'Paradise Beach Resort & Spa',
    rating: 4.8,
    reviewCount: 1247,
    location: 'Maldives, Indian Ocean',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    ],
    description: 'Experience ultimate luxury at Paradise Beach Resort & Spa, where pristine white sand beaches meet crystal-clear turquoise waters. Our world-class resort offers exceptional service, gourmet dining, and unforgettable experiences.',
    amenities: [
      'Private Beach',
      'Spa & Wellness',
      'Multiple Restaurants',
      'Infinity Pool',
      'Water Sports',
      'Kids Club',
      'Fitness Center',
      'Free WiFi',
    ],
    rooms: [
      {
        id: 'room1',
        name: 'Deluxe Ocean View',
        price: 250,
        image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=300&h=200&fit=crop',
        size: '45 m²',
        maxGuests: 4,
        amenities: ['Ocean View', 'Private Balcony', 'King Bed'],
      },
      {
        id: 'room2',
        name: 'Beach Villa Suite',
        price: 450,
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop',
        size: '75 m²',
        maxGuests: 6,
        amenities: ['Beach Access', 'Private Pool', 'Butler Service'],
      },
      {
        id: 'room3',
        name: 'Overwater Bungalow',
        price: 650,
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=200&fit=crop',
        size: '60 m²',
        maxGuests: 4,
        amenities: ['Over Water', 'Glass Floor', 'Snorkeling Gear'],
      },
    ],
  };

  const handleRoomPress = (room: any) => {
    navigation.navigate('RoomDetail', {
      roomId: room.id,
      resortId: resortData.id,
      roomName: room.name,
      roomPrice: room.price,
    });
  };

  const renderAmenity = (amenity: string, index: number) => (
    <View key={index} style={styles.amenityItem}>
      <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
      <Text style={styles.amenityText}>{amenity}</Text>
    </View>
  );

  const renderRoom = (room: any, index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.roomCard}
      onPress={() => handleRoomPress(room)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: room.image }} style={styles.roomImage} />
      <View style={styles.roomInfo}>
        <View style={styles.roomHeader}>
          <Text style={styles.roomName}>{room.name}</Text>
          <View style={styles.roomPrice}>
            <Text style={styles.priceText}>${room.price}</Text>
            <Text style={styles.priceUnit}>/night</Text>
          </View>
        </View>
        <View style={styles.roomDetails}>
          <View style={styles.roomDetail}>
            <Ionicons name="people-outline" size={14} color={Colors.gray500} />
            <Text style={styles.roomDetailText}>{room.maxGuests} guests</Text>
          </View>
          <View style={styles.roomDetail}>
            <Ionicons name="resize-outline" size={14} color={Colors.gray500} />
            <Text style={styles.roomDetailText}>{room.size}</Text>
          </View>
        </View>
        <View style={styles.roomAmenities}>
          {room.amenities.slice(0, 3).map((amenity: string, idx: number) => (
            <View key={idx} style={styles.amenityTag}>
              <Text style={styles.amenityTagText}>{amenity}</Text>
            </View>
          ))}
        </View>
        <View style={styles.roomActions}>
          <Text style={styles.viewDetailsText}>View Details</Text>
          <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppHeader
          title=""
          showBackButton={true}
          onBackPress={() => navigation.goBack()}
          backgroundColor="transparent"
          textColor={Colors.white}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Resort Images */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageContainer}
        >
          {resortData.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.resortImage} />
          ))}
        </ScrollView>

        {/* Resort Info */}
        <View style={styles.resortInfo}>
          <Text style={styles.resortName}>{resortData.name}</Text>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={16} color={Colors.gray500} />
            <Text style={styles.location}>{resortData.location}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Rating rating={resortData.rating} size={16} />
            <Text style={styles.ratingText}>
              {resortData.rating} ({resortData.reviewCount} reviews)
            </Text>
          </View>
        </View>

        {/* Description */}
        <AppCard style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>About This Resort</Text>
          <Text style={styles.description}>{resortData.description}</Text>
        </AppCard>

        {/* Amenities */}
        <AppCard style={styles.amenitiesCard}>
          <Text style={styles.sectionTitle}>Resort Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {resortData.amenities.map((amenity, index) => renderAmenity(amenity, index))}
          </View>
        </AppCard>

        {/* Available Rooms */}
        <AppCard style={styles.roomsCard}>
          <Text style={styles.sectionTitle}>Available Rooms</Text>
          {resortData.rooms.map((room, index) => renderRoom(room, index))}
        </AppCard>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
  },
  resortImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  resortInfo: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
  },
  resortName: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  location: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginLeft: Spacing.sm,
  },
  descriptionCard: {
    margin: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  amenitiesCard: {
    margin: Spacing.md,
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  amenityItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  amenityText: {
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    marginLeft: Spacing.xs,
  },
  roomsCard: {
    margin: Spacing.md,
    marginBottom: Spacing.xl,
    padding: 0,
  },
  roomCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    marginBottom: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  roomImage: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  roomInfo: {
    flex: 1,
    padding: Spacing.md,
  },
  roomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  roomName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: Spacing.sm,
  },
  roomPrice: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
  },
  priceUnit: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  roomDetails: {
    flexDirection: 'row',
    marginBottom: Spacing.sm,
  },
  roomDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  roomDetailText: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    marginLeft: 4,
  },
  roomAmenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.sm,
  },
  amenityTag: {
    backgroundColor: Colors.gray100,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    marginRight: Spacing.xs,
    marginBottom: 4,
  },
  amenityTagText: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  roomActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewDetailsText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '500',
    marginRight: 4,
  },
});

export default ResortDetailScreen;
