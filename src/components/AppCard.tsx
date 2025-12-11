import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Shadows } from '../constants';

interface AppCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  shadow?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';
}

export const AppCard: React.FC<AppCardProps> = ({
  children,
  style,
  onPress,
  shadow = 'md',
  padding = 'md',
  borderRadius = 'lg',
}) => {
  const cardStyle = [
    styles.base,
    Shadows[shadow as keyof typeof Shadows],
    {
      padding: Spacing[padding as keyof typeof Spacing],
      borderRadius: BorderRadius[borderRadius as keyof typeof BorderRadius],
    },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.9}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
  },
});
