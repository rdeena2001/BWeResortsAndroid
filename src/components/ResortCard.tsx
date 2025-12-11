import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { AppCard } from './AppCard';
import { Rating } from './Rating';
import { Colors, FontSizes, Spacing, BorderRadius } from '../constants';
import { Resort } from '../types';

const { width } = Dimensions.get('window');

interface ResortCardProps {
  resort: Resort;
  onPress: () => void;
  onWishlistPress?: () => void;
  isWishlisted?: boolean;
  variant?: 'featured' | 'list';
}

export const ResortCard: React.FC<ResortCardProps> = ({
  resort,
  onPress,
  onWishlistPress,
  isWishlisted = false,
  variant = 'list',
}) => {
  if (variant === 'featured') {
    return (
      <TouchableOpacity
        style={styles.featuredCard}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Image
          source={{ uri: resort.images[0] }}
          style={styles.featuredImage}
          resizeMode="cover"
        />

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={styles.featuredGradient}
        >
          <View style={styles.featuredContent}>
            {resort.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>
                  {resort.discount}% OFF
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.wishlistButton}
              onPress={onWishlistPress}
            >
              <Ionicons
                name={isWishlisted ? 'heart' : 'heart-outline'}
                size={24}
                color={isWishlisted ? Colors.error : Colors.white}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.featuredInfo}>
            <Text style={styles.featuredName} numberOfLines={1}>
              {resort.name}
            </Text>
            <Text style={styles.featuredLocation} numberOfLines={1}>
              {resort.location}
            </Text>

            <View style={styles.featuredBottom}>
              <Rating
                rating={resort.rating}
                size={14}
                reviewCount={resort.reviewCount}
              />

              <View style={styles.priceContainer}>
                {resort.originalPrice && (
                  <Text style={styles.originalPrice}>
                    ${resort.originalPrice}
                  </Text>
                )}
                <Text style={styles.featuredPrice}>
                  ${resort.price}/night
                </Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <AppCard style={styles.listCard} onPress={onPress}>
      <View style={styles.listContent}>
        <Image
          source={{ uri: resort.images[0] }}
          style={styles.listImage}
          resizeMode="cover"
        />

        <View style={styles.listInfo}>
          <View style={styles.listHeader}>
            <Text style={styles.listName} numberOfLines={1}>
              {resort.name}
            </Text>
            <TouchableOpacity
              style={styles.listWishlistButton}
              onPress={onWishlistPress}
            >
              <Ionicons
                name={isWishlisted ? 'heart' : 'heart-outline'}
                size={20}
                color={isWishlisted ? Colors.error : Colors.gray400}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.listLocation} numberOfLines={1}>
            {resort.location}
          </Text>

          <Rating
            rating={resort.rating}
            size={12}
            reviewCount={resort.reviewCount}
          />

          <View style={styles.listBottom}>
            <View style={styles.priceContainer}>
              {resort.originalPrice && (
                <Text style={styles.listOriginalPrice}>
                  ${resort.originalPrice}
                </Text>
              )}
              <Text style={styles.listPrice}>
                ${resort.price}/night
              </Text>
            </View>

            {resort.discount && (
              <View style={styles.listDiscountBadge}>
                <Text style={styles.listDiscountText}>
                  {resort.discount}% OFF
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </AppCard>
  );
};

const styles = StyleSheet.create({
  // Featured variant styles
  featuredCard: {
    width: width * 0.8,
    height: 280,
    marginRight: Spacing.md,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  featuredContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  discountBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  discountText: {
    color: Colors.white,
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
  wishlistButton: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  featuredInfo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  featuredName: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  featuredLocation: {
    fontSize: FontSizes.sm,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: Spacing.md,
  },
  featuredBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  featuredPrice: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.white,
  },

  // List variant styles
  listCard: {
    marginBottom: Spacing.md,
    padding: 0,
  },
  listContent: {
    flexDirection: 'row',
  },
  listImage: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.lg,
  },
  listInfo: {
    flex: 1,
    marginLeft: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.xs,
  },
  listName: {
    flex: 1,
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  listWishlistButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  listLocation: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  listBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    fontSize: FontSizes.sm,
    color: Colors.white,
    textDecorationLine: 'line-through',
    marginRight: Spacing.xs,
    opacity: 0.7,
  },
  listOriginalPrice: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textDecorationLine: 'line-through',
    marginRight: Spacing.xs,
  },
  listPrice: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.primary,
  },
  listDiscountBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  listDiscountText: {
    color: Colors.white,
    fontSize: FontSizes.xs,
    fontWeight: '600',
  },
});
