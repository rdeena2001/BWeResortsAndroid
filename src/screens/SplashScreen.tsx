import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Colors, FontSizes, Spacing } from '../constants';
import { RootStackParamList } from '../types/navigation';

type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

const { width, height } = Dimensions.get('window');

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Navigate to onboarding after 3 seconds
      navigation.replace('Onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.primaryDark]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>BW</Text>
          </View>
          <Text style={styles.brandName}>BW Resorts</Text>
          <Text style={styles.tagline}>Your Perfect Getaway Awaits</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Discover • Book • Experience
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing['4xl'],
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  logoText: {
    fontSize: FontSizes['4xl'],
    fontWeight: '700',
    color: Colors.primary,
  },
  brandName: {
    fontSize: FontSizes['3xl'],
    fontWeight: '700',
    color: Colors.white,
    marginBottom: Spacing.sm,
  },
  tagline: {
    fontSize: FontSizes.lg,
    color: Colors.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: Spacing['3xl'],
    alignItems: 'center',
  },
  footerText: {
    fontSize: FontSizes.base,
    color: Colors.white,
    opacity: 0.8,
    fontWeight: '500',
  },
});

export default SplashScreen;
