import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppCard } from './AppCard';
import { Colors, FontSizes, Spacing, BorderRadius } from '../constants';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onPress: () => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onPress,
}) => {
  return (
    <AppCard style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: room.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>
            {room.name}
          </Text>
          <Text style={styles.type}>
            {room.type}
          </Text>
        </View>

        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="bed" size={16} color={Colors.gray500} />
            <Text style={styles.detailText}>{room.bedType}</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="people" size={16} color={Colors.gray500} />
            <Text style={styles.detailText}>{room.maxGuests} guests</Text>
          </View>

          <View style={styles.detailItem}>
            <Ionicons name="resize" size={16} color={Colors.gray500} />
            <Text style={styles.detailText}>{room.size} m²</Text>
          </View>
        </View>

        <View style={styles.amenities}>
          {room.amenities.slice(0, 3).map((amenity: string, index: number) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={styles.amenityText}>{amenity}</Text>
            </View>
          ))}
          {room.amenities.length > 3 && (
            <Text style={styles.moreAmenities}>
              +{room.amenities.length - 3} more
            </Text>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            {room.originalPrice && (
              <Text style={styles.originalPrice}>
                ${room.originalPrice}
              </Text>
            )}
            <Text style={styles.price}>
              ${room.price}/night
            </Text>
          </View>

          <View style={[
            styles.availabilityBadge,
            room.available ? styles.available : styles.unavailable
          ]}>
            <Text style={[
              styles.availabilityText,
              room.available ? styles.availableText : styles.unavailableText
            ]}>
              {room.available ? 'Available' : 'Booked'}
            </Text>
          </View>
        </View>
      </View>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.md,
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  content: {
    padding: Spacing.md,
  },
  header: {
    marginBottom: Spacing.sm,
  },
  name: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  type: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  details: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  detailText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  amenities: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.md,
  },
  amenityTag: {
    backgroundColor: Colors.gray100,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
    marginRight: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  amenityText: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  moreAmenities: {
    fontSize: FontSizes.xs,
    color: Colors.primary,
    alignSelf: 'center',
    marginLeft: Spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
    marginRight: Spacing.xs,
  },
  price: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.primary,
  },
  availabilityBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  available: {
    backgroundColor: Colors.success,
  },
  unavailable: {
    backgroundColor: Colors.gray300,
  },
  availabilityText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  availableText: {
    color: Colors.white,
  },
  unavailableText: {
    color: Colors.textSecondary,
  },
});
