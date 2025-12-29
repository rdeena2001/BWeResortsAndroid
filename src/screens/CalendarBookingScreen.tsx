import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton, AppCard, AppHeader } from '../components';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../constants';

const { width } = Dimensions.get('window');

interface RouteParams {
  roomId?: string;
  resortId?: string;
  roomName?: string;
  roomPrice?: number;
}

const CalendarBookingScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as RouteParams;

  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  // Generate calendar dates for current and next month
  const generateCalendarDates = () => {
    const today = new Date();
    const dates = [];

    for (let i = 0; i < 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  const calendarDates = generateCalendarDates();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatDateShort = (date: Date) => {
    return date.getDate().toString();
  };

  const isDateSelected = (date: Date) => {
    const dateStr = date.toDateString();
    return selectedDates.includes(dateStr);
  };

  const isDateInRange = (date: Date) => {
    if (!checkInDate || !checkOutDate) return false;
    return date >= checkInDate && date <= checkOutDate;
  };

  const handleDatePress = (date: Date) => {
    const dateStr = date.toDateString();

    if (!checkInDate || (checkInDate && checkOutDate)) {
      // Set check-in date
      setCheckInDate(date);
      setCheckOutDate(null);
      setSelectedDates([dateStr]);
    } else if (checkInDate && !checkOutDate) {
      // Set check-out date
      if (date > checkInDate) {
        setCheckOutDate(date);
        // Generate range of dates
        const range = [];
        const current = new Date(checkInDate);
        while (current <= date) {
          range.push(current.toDateString());
          current.setDate(current.getDate() + 1);
        }
        setSelectedDates(range);
      } else {
        // If selected date is before check-in, reset
        setCheckInDate(date);
        setCheckOutDate(null);
        setSelectedDates([dateStr]);
      }
    }
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotalPrice = () => {
    const nights = calculateNights();
    const roomPrice = params?.roomPrice || 150;
    return nights * roomPrice;
  };

  const handleBooking = () => {
    if (!checkInDate || !checkOutDate) {
      Alert.alert('Error', 'Please select check-in and check-out dates');
      return;
    }

    const bookingDetails = {
      roomId: params?.roomId,
      roomName: params?.roomName || 'Deluxe Room',
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests,
      nights: calculateNights(),
      totalPrice: calculateTotalPrice(),
    };

    Alert.alert(
      'Booking Confirmed!',
      `Your booking for ${bookingDetails.nights} nights has been confirmed.\nTotal: $${bookingDetails.totalPrice}`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const renderCalendarDate = (date: Date, index: number) => {
    const isSelected = isDateSelected(date);
    const isInRange = isDateInRange(date);
    const isToday = date.toDateString() === new Date().toDateString();
    const isPast = date < new Date();

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.dateItem,
          isSelected && styles.selectedDate,
          isInRange && !isSelected && styles.rangeDate,
          isPast && styles.pastDate,
        ]}
        onPress={() => !isPast && handleDatePress(date)}
        disabled={isPast}
      >
        <Text style={[
          styles.dayText,
          isSelected && styles.selectedDateText,
          isInRange && !isSelected && styles.rangeDateText,
          isPast && styles.pastDateText,
        ]}>
          {date.toLocaleDateString('en-US', { weekday: 'short' })}
        </Text>
        <Text style={[
          styles.dateText,
          isSelected && styles.selectedDateText,
          isInRange && !isSelected && styles.rangeDateText,
          isPast && styles.pastDateText,
        ]}>
          {formatDateShort(date)}
        </Text>
        {isToday && <View style={styles.todayIndicator} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Select Dates"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Room Info */}
        <AppCard style={styles.roomCard}>
          <View style={styles.roomInfo}>
            <Text style={styles.roomName}>{params?.roomName || 'Deluxe Room'}</Text>
            <Text style={styles.roomPrice}>${params?.roomPrice || 150}/night</Text>
          </View>
        </AppCard>

        {/* Date Selection Info */}
        <View style={styles.dateInfoContainer}>
          <View style={styles.dateInfo}>
            <Text style={styles.dateLabel}>Check-in</Text>
            <Text style={styles.dateValue}>
              {checkInDate ? formatDate(checkInDate) : 'Select date'}
            </Text>
          </View>
          <View style={styles.dateInfo}>
            <Text style={styles.dateLabel}>Check-out</Text>
            <Text style={styles.dateValue}>
              {checkOutDate ? formatDate(checkOutDate) : 'Select date'}
            </Text>
          </View>
        </View>

        {/* Calendar */}
        <AppCard style={styles.calendarCard}>
          <Text style={styles.sectionTitle}>Select Your Dates</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.calendarScroll}
          >
            {calendarDates.map((date, index) => renderCalendarDate(date, index))}
          </ScrollView>
        </AppCard>

        {/* Guests Selection */}
        <AppCard style={styles.guestsCard}>
          <View style={styles.guestsContainer}>
            <Text style={styles.sectionTitle}>Guests</Text>
            <View style={styles.guestsControls}>
              <TouchableOpacity
                style={styles.guestButton}
                onPress={() => setGuests(Math.max(1, guests - 1))}
              >
                <Ionicons name="remove" size={20} color={Colors.primary} />
              </TouchableOpacity>
              <Text style={styles.guestsCount}>{guests}</Text>
              <TouchableOpacity
                style={styles.guestButton}
                onPress={() => setGuests(Math.min(8, guests + 1))}
              >
                <Ionicons name="add" size={20} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        </AppCard>

        {/* Booking Summary */}
        {checkInDate && checkOutDate && (
          <AppCard style={styles.summaryCard}>
            <Text style={styles.sectionTitle}>Booking Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Nights</Text>
              <Text style={styles.summaryValue}>{calculateNights()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Room Rate</Text>
              <Text style={styles.summaryValue}>${params?.roomPrice || 150}/night</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Guests</Text>
              <Text style={styles.summaryValue}>{guests}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${calculateTotalPrice()}</Text>
            </View>
          </AppCard>
        )}
      </ScrollView>

      {/* Book Now Button */}
      <View style={styles.bottomContainer}>
        <AppButton
          title={`Book Now - $${calculateTotalPrice()}`}
          onPress={handleBooking}
          disabled={!checkInDate || !checkOutDate}
          style={styles.bookButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
  },
  roomCard: {
    marginBottom: Spacing.md,
  },
  roomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roomName: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  roomPrice: {
    fontSize: FontSizes.md,
    fontWeight: '500',
    color: Colors.primary,
  },
  dateInfoContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  dateInfo: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  dateLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  dateValue: {
    fontSize: FontSizes.md,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  calendarCard: {
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  calendarScroll: {
    flexDirection: 'row',
  },
  dateItem: {
    width: 60,
    height: 70,
    marginRight: Spacing.sm,
    backgroundColor: Colors.gray100,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  selectedDate: {
    backgroundColor: Colors.primary,
  },
  rangeDate: {
    backgroundColor: Colors.primaryLight,
  },
  pastDate: {
    backgroundColor: Colors.gray50,
    opacity: 0.5,
  },
  dayText: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  dateText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  selectedDateText: {
    color: Colors.white,
  },
  rangeDateText: {
    color: Colors.primary,
  },
  pastDateText: {
    color: Colors.gray400,
  },
  todayIndicator: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.accent,
  },
  guestsCard: {
    marginBottom: Spacing.md,
  },
  guestsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  guestsControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  guestButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestsCount: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    minWidth: 30,
    textAlign: 'center',
  },
  summaryCard: {
    marginBottom: Spacing.xl,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontSize: FontSizes.md,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
    paddingTop: Spacing.sm,
    marginTop: Spacing.sm,
  },
  totalLabel: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  totalValue: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.primary,
  },
  bottomContainer: {
    padding: Spacing.md,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  bookButton: {
    marginBottom: 0,
  },
});

export default CalendarBookingScreen;
