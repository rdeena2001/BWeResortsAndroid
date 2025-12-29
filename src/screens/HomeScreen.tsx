import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ResortCard, AppCard } from '../components';
import { Colors, FontSizes, Spacing, BorderRadius } from '../constants';
import { RootStackParamList } from '../types/navigation';
import { featuredResorts, popularResorts } from '../utils/dummyData';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');

  const handleResortPress = (resortId: string) => {
    navigation.navigate('ResortDetail', { resortId });
  };

  const handleSearchPress = () => {
    // For now, just log the search query
    console.log('Search for:', searchQuery);
  };

  const renderFeaturedResort = ({ item }: { item: any }) => (
    <ResortCard
      resort={item}
      variant="featured"
      onPress={() => handleResortPress(item.id)}
      onWishlistPress={() => {}}
    />
  );

  const quickActions = [
    { id: '1', title: 'Beach Resorts', icon: 'water', color: Colors.secondary },
    { id: '2', title: 'Mountain', icon: 'mountain', color: Colors.primary },
    { id: '3', title: 'City Hotels', icon: 'business', color: Colors.accent },
    { id: '4', title: 'Luxury', icon: 'diamond', color: Colors.error },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Good Morning!</Text>
          <Text style={styles.userName}>John Doe</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.gray400} />
          <TextInput
            style={styles.searchInput}
            placeholder="Where do you want to go?"
            placeholderTextColor={Colors.gray400}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchPress}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore</Text>
        <View style={styles.quickActions}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.id} style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                <Ionicons name={action.icon as keyof typeof Ionicons.glyphMap} size={24} color={Colors.white} />
              </View>
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Resorts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Resorts</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={featuredResorts}
          renderItem={renderFeaturedResort}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
        />
      </View>

      {/* Popular Stays */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Stays</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {popularResorts.map((resort) => (
          <ResortCard
            key={resort.id}
            resort={resort}
            variant="list"
            onPress={() => handleResortPress(resort.id)}
            onWishlistPress={() => {}}
          />
        ))}
      </View>

      {/* Special Offers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Offers</Text>
        <AppCard style={styles.offerCard}>
          <View style={styles.offerContent}>
            <Text style={styles.offerTitle}>Summer Sale!</Text>
            <Text style={styles.offerSubtitle}>
              Get up to 40% off on beach resorts
            </Text>
            <TouchableOpacity
              style={styles.offerButton}
              onPress={() => navigation.navigate('CalendarBooking', {
                roomName: 'Beach Resort Special',
                roomPrice: 120,
                isSpecialOffer: true
              })}
            >
              <Text style={styles.offerButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </AppCard>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing.lg,
  },
  greeting: {
    flex: 1,
  },
  greetingText: {
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
  },
  userName: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  notificationButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.gray100,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    marginLeft: Spacing.sm,
  },
  filterButton: {
    padding: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  seeAllText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.lg,
  },
  quickAction: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  quickActionText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  featuredList: {
    paddingLeft: Spacing.lg,
  },
  offerCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.primary,
  },
  offerContent: {
    padding: Spacing.lg,
  },
  offerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  offerSubtitle: {
    fontSize: FontSizes.base,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: Spacing.lg,
  },
  offerButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    alignSelf: 'flex-start',
  },
  offerButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.primary,
  },
});

export default HomeScreen;
