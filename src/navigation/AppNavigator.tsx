import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants';
import { RootStackParamList, MainTabParamList } from '../types/navigation';

// Import screens (we'll create these next)
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import HomeScreen from '../screens/HomeScreen';
import ResortListScreen from '../screens/ResortListScreen';
import ResortDetailScreen from '../screens/ResortDetailScreen';
import RoomDetailScreen from '../screens/RoomDetailScreen';
import CalendarBookingScreen from '../screens/CalendarBookingScreen';
import WishlistScreen from '../screens/WishlistScreen';
import ProfileScreen from '../screens/ProfileScreen';
import BookingHistoryScreen from '../screens/BookingHistoryScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Wishlist') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Bookings') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray400,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name="Search"
        component={ResortListScreen}
        options={{ title: 'Search' }}
      />
      <Tab.Screen name="Wishlist" component={WishlistScreen} />
      <Tab.Screen
        name="Bookings"
        component={BookingHistoryScreen}
        options={{ title: 'Bookings' }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      <Stack.Screen
        name="ResortDetail"
        component={ResortDetailScreen}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name="RoomDetail"
        component={RoomDetailScreen}
        options={{
          headerShown: true,
          headerTitle: 'Room Details',
          headerBackTitleVisible: false,
          headerTintColor: Colors.textPrimary,
          headerStyle: {
            backgroundColor: Colors.white,
          },
        }}
      />
      <Stack.Screen
        name="CalendarBooking"
        component={CalendarBookingScreen}
        options={{
          headerShown: true,
          headerTitle: 'Select Dates',
          headerBackTitleVisible: false,
          headerTintColor: Colors.textPrimary,
          headerStyle: {
            backgroundColor: Colors.white,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
