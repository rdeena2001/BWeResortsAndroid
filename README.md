# BW Resorts - React Native Expo App

A modern, clean, and high-quality mobile UI for resort booking similar to OYO, Airbnb, MMT, and Agoda.

## 🚀 Features

- **Modern UI Design**: Clean, minimal design with smooth animations
- **Complete Navigation**: Stack + Bottom Tab navigation with React Navigation
- **Reusable Components**: AppButton, AppCard, AppInput, AppHeader, Rating, ResortCard, RoomCard
- **TypeScript Support**: Full TypeScript implementation for type safety
- **Responsive Design**: Works on both Android & iOS
- **Beautiful Animations**: Smooth transitions using React Native Reanimated
- **Dummy Data**: Pre-loaded with sample resort and room data

## 📱 Screens Included

### Authentication Flow
- **SplashScreen**: Beautiful branded splash screen
- **OnboardingScreen**: 3-slide onboarding with smooth transitions
- **LoginScreen**: Phone/Email login with OTP verification
- **OTPVerificationScreen**: OTP input and verification

### Main App Flow
- **HomeScreen**: Search bar, featured resorts, popular stays, quick actions
- **ResortListScreen**: Search and filter resorts (placeholder)
- **ResortDetailScreen**: Resort details with booking options (placeholder)
- **RoomDetailScreen**: Room gallery, pricing, amenities (placeholder)
- **CalendarBookingScreen**: Date selection for booking (placeholder)
- **WishlistScreen**: Saved resorts and rooms (placeholder)
- **ProfileScreen**: User profile and settings (placeholder)
- **BookingHistoryScreen**: Past and current bookings (placeholder)

## 🛠 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Step 1: Install Dependencies
```bash
# Navigate to the project directory
cd BWResorts

# Install dependencies
npm install

# Or using yarn
yarn install
```

### Step 2: Install Expo CLI (if not already installed)
```bash
npm install -g @expo/cli
```

### Step 3: Start the Development Server
```bash
# Start Expo development server
npm start

# Or using yarn
yarn start

# Or using Expo CLI directly
expo start
```

### Step 4: Run on Device/Simulator

#### For Android:
```bash
npm run android
# Or
expo start --android
```

#### For iOS (macOS only):
```bash
npm run ios
# Or
expo start --ios
```

#### Using Expo Go App:
1. Install Expo Go from App Store (iOS) or Google Play Store (Android)
2. Scan the QR code from the Expo development server
3. The app will load on your device

## 🏗 Project Structure

```
BWResorts/
├── App.tsx                 # Main app entry point
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── babel.config.js        # Babel configuration
└── src/
    ├── components/        # Reusable UI components
    │   ├── AppButton.tsx
    │   ├── AppCard.tsx
    │   ├── AppInput.tsx
    │   ├── AppHeader.tsx
    │   ├── Rating.tsx
    │   ├── ResortCard.tsx
    │   ├── RoomCard.tsx
    │   └── index.ts
    ├── constants/         # App constants
    │   ├── Colors.ts
    │   ├── Fonts.ts
    │   ├── Spacing.ts
    │   └── index.ts
    ├── navigation/        # Navigation configuration
    │   └── AppNavigator.tsx
    ├── screens/          # App screens
    │   ├── SplashScreen.tsx
    │   ├── OnboardingScreen.tsx
    │   ├── LoginScreen.tsx
    │   ├── OTPVerificationScreen.tsx
    │   ├── HomeScreen.tsx
    │   ├── ResortListScreen.tsx
    │   ├── ResortDetailScreen.tsx
    │   ├── RoomDetailScreen.tsx
    │   ├── CalendarBookingScreen.tsx
    │   ├── WishlistScreen.tsx
    │   ├── ProfileScreen.tsx
    │   └── BookingHistoryScreen.tsx
    ├── types/            # TypeScript type definitions
    │   ├── index.ts
    │   └── navigation.ts
    └── utils/            # Utility functions and data
        └── dummyData.ts
```

## 🎨 Design System

### Colors
- **Primary**: Orange (#FF6B35)
- **Secondary**: Teal (#4ECDC4)
- **Accent**: Yellow (#FFE66D)
- **Background**: White (#FFFFFF)
- **Text**: Various gray shades for hierarchy

### Typography
- **System fonts** for cross-platform consistency
- **Font sizes**: xs (12px) to 5xl (48px)
- **Font weights**: Regular, Medium, SemiBold, Bold

### Spacing
- **Consistent spacing scale**: xs (4px) to 5xl (96px)
- **Border radius**: sm (4px) to full (9999px)
- **Shadows**: Multiple elevation levels

## 🔧 Customization

### Adding New Screens
1. Create screen component in `src/screens/`
2. Add route to navigation types in `src/types/navigation.ts`
3. Import and add to navigator in `src/navigation/AppNavigator.tsx`

### Modifying Colors/Styling
- Update colors in `src/constants/Colors.ts`
- Modify spacing in `src/constants/Spacing.ts`
- Adjust fonts in `src/constants/Fonts.ts`

### Adding New Components
1. Create component in `src/components/`
2. Export from `src/components/index.ts`
3. Import and use in screens

## 📦 Key Dependencies

- **expo**: ~49.0.15
- **react**: 18.2.0
- **react-native**: 0.72.6
- **@react-navigation/native**: ^6.1.7
- **@react-navigation/stack**: ^6.3.17
- **@react-navigation/bottom-tabs**: ^6.5.8
- **react-native-reanimated**: ~3.3.0
- **expo-linear-gradient**: ~12.3.0
- **@expo/vector-icons**: ^13.0.0

## 🚀 Next Steps

1. **Install dependencies** and run the app
2. **Implement API integration** for real data
3. **Add more detailed screens** (ResortDetail, RoomDetail, etc.)
4. **Implement booking functionality**
5. **Add user authentication**
6. **Integrate payment gateway**
7. **Add push notifications**
8. **Implement offline support**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Happy Coding! 🎉**

For any issues or questions, please create an issue in the repository.
