import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontSizes, Spacing } from '../constants';

interface AppHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBackButton = false,
  onBackPress,
  rightIcon,
  onRightIconPress,
  backgroundColor = Colors.white,
  textColor = Colors.textPrimary,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingTop: insets.top,
        },
      ]}
    >
      <StatusBar
        barStyle={backgroundColor === Colors.white ? 'dark-content' : 'light-content'}
        backgroundColor={backgroundColor}
      />

      <View style={styles.header}>
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onBackPress}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color={textColor}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.centerSection}>
          {title && (
            <Text style={[styles.title, { color: textColor }]}>
              {title}
            </Text>
          )}
        </View>

        <View style={styles.rightSection}>
          {rightIcon && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onRightIconPress}
            >
              <Ionicons
                name={rightIcon}
                size={24}
                color={textColor}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: Spacing.md,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
  },
  iconButton: {
    padding: Spacing.xs,
    borderRadius: 20,
  },
});
