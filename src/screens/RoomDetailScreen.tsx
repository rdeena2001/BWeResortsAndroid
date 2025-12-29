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
import { AppButton, AppCard, AppHeader } from '../components';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../constants';
import { RootStackParamList } from '../types/navigation';

const { width } = Dimensions.get('window');

type RoomDetailScreenNavigationProp = StackNavigationProp<RootStackParamList>;

interface RouteParams {
  roomId?: string;
  resortId?: string;
  roomName?: string;
  roomPrice?: number;
}

const RoomDetailScreen: React.FC = () => {
  const navigation = useNavigation<RoomDetailScreenNavigationProp>();
  const route = useRoute();
  const params = route.params as RouteParams;

  // Dummy room data
  const roomData = {
    id: params?.roomId || 'room1',
    name: params?.roomName || 'Deluxe Ocean View Suite',
    price: params?.roomPrice || 250,
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    ],
    size: '45 m²',
    maxGuests: 4,
    bedType: 'King Size Bed',
    amenities: [
      'Ocean View',
      'Private Balcony',
      'Air Conditioning',
      'Mini Bar',
      'Free WiFi',
      'Room Service',
      'Safe',
      'Flat Screen TV',
    ],
    description: 'Experience luxury in our spacious Deluxe Ocean View Suite featuring panoramic sea views, modern amenities, and elegant furnishings. Perfect for couples or small families seeking comfort and style.',
    features: [
      { icon: 'bed-outline', text: 'King Size Bed' },
      { icon: 'people-outline', text: '4 Guests' },
      { icon: 'resize-outline', text: '45 m²' },
      { icon: 'water-outline', text: 'Ocean View' },
    ],
  };

  const handleBookNow = () => {
    navigation.navigate('CalendarBooking', {
      roomId: roomData.id,
      roomName: roomData.name,
      roomPrice: roomData.price,
    });
  };

  const renderAmenity = (amenity: string, index: number) => (
    <View key={index} style={styles.amenityItem}>
      <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
      <Text style={styles.amenityText}>{amenity}</Text>
    </View>
  );

  const renderFeature = (feature: { icon: string; text: string }, index: number) => (
    <View key={index} style={styles.featureItem}>
      <View style={styles.featureIcon}>
        <Ionicons name={feature.icon as keyof typeof Ionicons.glyphMap} size={20} color={Colors.primary} />
      </View>
      <Text style={styles.featureText}>{feature.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <AppHeader
        title="Room Details"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Room Images */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.imageContainer}
        >
          {roomData.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.roomImage} />
          ))}
        </ScrollView>

        {/* Room Info */}
        <View style={styles.roomInfo}>
          <Text style={styles.roomName}>{roomData.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${roomData.price}</Text>
            <Text style={styles.priceUnit}>/night</Text>
          </View>
        </View>

        {/* Room Features */}
        <AppCard style={styles.featuresCard}>
          <Text style={styles.sectionTitle}>Room Features</Text>
          <View style={styles.featuresGrid}>
            {roomData.features.map((feature, index) => renderFeature(feature, index))}
          </View>
        </AppCard>

        {/* Description */}
        <AppCard style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{roomData.description}</Text>
        </AppCard>

        {/* Amenities */}
        <AppCard style={styles.amenitiesCard}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenitiesGrid}>
            {roomData.amenities.map((amenity, index) => renderAmenity(amenity, index))}
          </View>
        </AppCard>
      </ScrollView>

      {/* Bottom Book Now Button */}
      <View style={styles.bottomContainer}>
        <View style={styles.priceInfo}>
          <Text style={styles.bottomPrice}>${roomData.price}/night</Text>
          <Text style={styles.bottomPriceSubtext}>Excluding taxes & fees</Text>
        </View>
        <AppButton
          title="Book Now"
          onPress={handleBookNow}
          style={styles.bookButton}
        />
      </View>
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
  imageContainer: {
    height: 250,
  },
  roomImage: {
    width: width,
    height: 250,
    resizeMode: 'cover',
  },
  roomInfo: {
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  roomName: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: Spacing.md,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.primary,
  },
  priceUnit: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  featuresCard: {
    margin: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primaryLight || Colors.gray100,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  featureText: {
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    flex: 1,
  },
  descriptionCard: {
    margin: Spacing.md,
  },
  description: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  amenitiesCard: {
    margin: Spacing.md,
    marginBottom: Spacing.xl,
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
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
    ...Shadows.sm,
  },
  priceInfo: {
    flex: 1,
  },
  bottomPrice: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
  },
  bottomPriceSubtext: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  bookButton: {
    flex: 1,
    marginLeft: Spacing.md,
    marginBottom: 0,
  },
});

export default RoomDetailScreen;
