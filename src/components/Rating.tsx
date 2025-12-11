import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSizes, Spacing } from '../constants';

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showText?: boolean;
  reviewCount?: number;
}

export const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  size = 16,
  showText = true,
  reviewCount,
}) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons
          key={`full-${i}`}
          name="star"
          size={size}
          color={Colors.accent}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons
          key="half"
          name="star-half"
          size={size}
          color={Colors.accent}
        />
      );
    }

    const remainingStars = maxRating - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={size}
          color={Colors.gray300}
        />
      );
    }

    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {renderStars()}
      </View>
      {showText && (
        <View style={styles.textContainer}>
          <Text style={styles.ratingText}>
            {rating.toFixed(1)}
          </Text>
          {reviewCount && (
            <Text style={styles.reviewText}>
              ({reviewCount})
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Spacing.xs,
  },
  ratingText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  reviewText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
});
