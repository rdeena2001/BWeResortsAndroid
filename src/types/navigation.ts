import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  OTPVerification: {
    phoneNumber: string;
  };
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  ResortDetail: {
    resortId: string;
  };
  RoomDetail: {
    roomId: string;
    resortId: string;
  };
  CalendarBooking: {
    roomId?: string;
    resortId?: string;
    roomName?: string;
    roomPrice?: number;
    isSpecialOffer?: boolean;
  };
};

export type MainTabParamList = {
  Home: undefined;
  Search: undefined;
  Wishlist: undefined;
  Bookings: undefined;
  Profile: undefined;
};

export type HomeStackParamList = {
  HomeMain: undefined;
  ResortList: {
    location?: string;
    filters?: any;
  };
};
