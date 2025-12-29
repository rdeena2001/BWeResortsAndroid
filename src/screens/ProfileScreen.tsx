import React from 'react';
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
import { AppCard } from '../components';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../constants';

interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
  showBadge?: boolean;
  badgeCount?: number;
}

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleMenuPress = (menuType: string) => {
    switch (menuType) {
      case 'profile':
        Alert.alert('Profile Management', 'Edit your personal information, preferences, and account settings.');
        break;
      case 'bookings':
        Alert.alert('Booking History', 'View your past and upcoming bookings with invoices.');
        break;
      case 'wishlist':
        Alert.alert('Wishlist', 'Your saved resorts and favorite destinations.');
        break;
      case 'offers':
        Alert.alert('Offers & Coupons', 'Exclusive deals and discount coupons for you.');
        break;
      case 'support':
        Alert.alert('Help & Support', 'Get assistance with your bookings and account.');
        break;
      case 'settings':
        Alert.alert('Settings', 'App preferences, notifications, and privacy settings.');
        break;
      case 'logout':
        Alert.alert(
          'Logout',
          'Are you sure you want to logout?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', style: 'destructive', onPress: () => console.log('Logged out') },
          ]
        );
        break;
      default:
        break;
    }
  };

  const MenuItem: React.FC<MenuItemProps> = ({ icon, title, subtitle, onPress, showBadge, badgeCount }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.menuIconContainer}>
        <Ionicons name={icon} size={24} color={Colors.white} />
        {showBadge && badgeCount && badgeCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeCount > 99 ? '99+' : badgeCount}</Text>
          </View>
        )}
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.gray400} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color={Colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userEmail}>john.doe@example.com</Text>
            <Text style={styles.memberSince}>Member since 2023</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Bookings</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>
      </View>

      {/* Main Menu */}
      <AppCard style={styles.menuCard}>
        <Text style={styles.sectionTitle}>Account</Text>

        <MenuItem
          icon="person-outline"
          title="Profile Management"
          subtitle="Edit personal info, preferences & settings"
          onPress={() => handleMenuPress('profile')}
        />

        <MenuItem
          icon="receipt-outline"
          title="Booking History & Invoices"
          subtitle="View past bookings and download invoices"
          onPress={() => handleMenuPress('bookings')}
          showBadge={true}
          badgeCount={2}
        />

        <MenuItem
          icon="heart-outline"
          title="Wishlist / Favourites"
          subtitle="Your saved resorts and destinations"
          onPress={() => handleMenuPress('wishlist')}
          showBadge={true}
          badgeCount={8}
        />

        <MenuItem
          icon="pricetag-outline"
          title="Offers & Coupons"
          subtitle="Exclusive deals and discount codes"
          onPress={() => handleMenuPress('offers')}
          showBadge={true}
          badgeCount={5}
        />
      </AppCard>

      {/* Support & Settings */}
      <AppCard style={styles.menuCard}>
        <Text style={styles.sectionTitle}>Support & Settings</Text>

        <MenuItem
          icon="help-circle-outline"
          title="Help & Support"
          subtitle="Get assistance and contact support"
          onPress={() => handleMenuPress('support')}
        />

        <MenuItem
          icon="settings-outline"
          title="Settings"
          subtitle="App preferences and privacy settings"
          onPress={() => handleMenuPress('settings')}
        />

        <MenuItem
          icon="information-circle-outline"
          title="About"
          subtitle="App version, terms & privacy policy"
          onPress={() => Alert.alert('About', 'BW Resorts v1.0.0\nYour trusted travel companion')}
        />
      </AppCard>

      {/* Logout */}
      <AppCard style={styles.menuCard}>
        <MenuItem
          icon="log-out-outline"
          title="Logout"
          subtitle="Sign out of your account"
          onPress={() => handleMenuPress('logout')}
        />
      </AppCard>

      {/* App Info */}
      <View style={styles.appInfo}>
        <Text style={styles.appVersion}>BW Resorts v1.0.0</Text>
        <Text style={styles.appDescription}>Your trusted travel companion</Text>
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
    backgroundColor: Colors.white,
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    marginBottom: Spacing.md,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.gray200,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  memberSince: {
    fontSize: FontSizes.sm,
    color: Colors.gray500,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.gray50,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  statItem: {
    flex: 1,
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
  menuCard: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    padding: 0,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  badgeText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.white,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  appVersion: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  appDescription: {
    fontSize: FontSizes.sm,
    color: Colors.gray500,
    textAlign: 'center',
  },
});

export default ProfileScreen;
