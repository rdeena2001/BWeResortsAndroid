import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AppButton, AppInput } from '../components';
import { Colors, FontSizes, Spacing } from '../constants';

const OTPVerificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [otp, setOtp] = useState('');

  const handleVerifyOTP = () => {
    (navigation as any).replace('MainTabs');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>
        We've sent a code to {(route.params as any)?.phoneNumber}
      </Text>

      <AppInput
        label="Enter OTP"
        placeholder="Enter 6-digit code"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />

      <AppButton
        title="Verify"
        onPress={handleVerifyOTP}
        fullWidth
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
});

export default OTPVerificationScreen;
