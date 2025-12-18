# APK Build Instructions for BW Resorts App

## Method 1: EAS Build (Cloud Build) - Recommended

### Prerequisites:
1. Create an Expo account at https://expo.dev
2. Login to EAS CLI: `eas login`

### Steps:
```bash
# Build APK for testing
eas build --platform android --profile preview

# This will:
# - Build your app in the cloud
# - Generate an APK file
# - Provide download link
# - Takes 10-20 minutes
```

## Method 2: Local Development Build

### Prerequisites:
1. Install Android Studio
2. Set up Android SDK
3. Create Android Virtual Device (AVD)

### Steps:
```bash
# Install development build tools
npx expo install expo-dev-client

# Configure for development build
eas build:configure

# Build locally (requires Android Studio setup)
eas build --platform android --local
```

## Method 3: Expo Go App (Easiest for Testing)

### No APK needed - Use existing Expo Go app:
1. Install "Expo Go" from Google Play Store
2. Run: `npx expo start`
3. Scan QR code with Expo Go app
4. Your app loads instantly

## Method 4: Web Version (Already Working)
- Your app already works on web
- Share web link: http://localhost:19006
- Works on mobile browsers too

## APK Download Process (Method 1):
1. Run `eas build --platform android --profile preview`
2. Wait for build to complete (10-20 mins)
3. Download APK from provided link
4. Install APK on your Android device
5. Enable "Install from Unknown Sources" if needed

## Current Status:
✅ EAS configured for your project
✅ Git repository initialized
✅ Project linked to Expo account
✅ Ready for cloud build

## Next Steps:
1. Choose your preferred method above
2. For Method 1: Run the EAS build command
3. Wait for build completion
4. Download and install APK
