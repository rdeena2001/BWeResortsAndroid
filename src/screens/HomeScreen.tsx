import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
  Modal,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ResortCard, AppCard, AppButton } from '../components';
import { Colors, FontSizes, Spacing, BorderRadius, Shadows } from '../constants';
import { RootStackParamList } from '../types/navigation';
import { featuredResorts, popularResorts } from '../utils/dummyData';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [isChatModalVisible, setIsChatModalVisible] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [hasUnreadMessages, setHasUnreadMessages] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  const handleResortPress = (resortId: string) => {
    navigation.navigate('ResortDetail', { resortId });
  };

  const handleSearchPress = () => {
    // For now, just log the search query
    console.log('Search for:', searchQuery);
  };

  const handleChatPress = () => {
    setIsChatModalVisible(true);
    setHasUnreadMessages(false);
  };

  const handleCloseChatModal = () => {
    setIsChatModalVisible(false);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      Alert.alert(
        'Message Sent',
        `Your message "${chatMessage}" has been sent to our support team. We'll get back to you shortly!`,
        [{ text: 'OK', onPress: () => setChatMessage('') }]
      );
      setIsChatModalVisible(false);
    }
  };

  const handleQuickAction = (action: string) => {
    setIsChatModalVisible(false);
    switch (action) {
      case 'booking':
        Alert.alert('Booking Help', 'Our booking specialist will assist you with your reservation.');
        break;
      case 'cancel':
        Alert.alert('Cancellation Help', 'Please provide your booking reference for cancellation assistance.');
        break;
      case 'support':
        Alert.alert('General Support', 'How can we help you today? Our team is here 24/7.');
        break;
      default:
        break;
    }
  };

  const renderFeaturedResort = ({ item }: { item: any }) => (
    <ResortCard
      resort={item}
      variant="featured"
      onPress={() => handleResortPress(item.id)}
      onWishlistPress={() => {}}
    />
  );

  const quickActions = [
    { id: '1', title: 'Beach Resorts', icon: 'water', color: Colors.secondary },
    { id: '2', title: 'Mountain', icon: 'mountain', color: Colors.primary },
    { id: '3', title: 'City Hotels', icon: 'business', color: Colors.accent },
    { id: '4', title: 'Luxury', icon: 'diamond', color: Colors.error },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Good Morning!</Text>
          <Text style={styles.userName}>John Doe</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.gray400} />
          <TextInput
            style={styles.searchInput}
            placeholder="Where do you want to go?"
            placeholderTextColor={Colors.gray400}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearchPress}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore</Text>
        <View style={styles.quickActions}>
          {quickActions.map((action) => (
            <TouchableOpacity key={action.id} style={styles.quickAction}>
              <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                <Ionicons name={action.icon as keyof typeof Ionicons.glyphMap} size={24} color={Colors.white} />
              </View>
              <Text style={styles.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Resorts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Resorts</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={featuredResorts}
          renderItem={renderFeaturedResort}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
        />
      </View>

      {/* Popular Stays */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Stays</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        {popularResorts.map((resort) => (
          <ResortCard
            key={resort.id}
            resort={resort}
            variant="list"
            onPress={() => handleResortPress(resort.id)}
            onWishlistPress={() => {}}
          />
        ))}
      </View>

      {/* Special Offers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Special Offers</Text>
        <AppCard style={styles.offerCard}>
          <View style={styles.offerContent}>
            <Text style={styles.offerTitle}>Summer Sale!</Text>
            <Text style={styles.offerSubtitle}>
              Get up to 40% off on beach resorts
            </Text>
            <TouchableOpacity
              style={styles.offerButton}
              onPress={() => navigation.navigate('CalendarBooking', {
                roomName: 'Beach Resort Special',
                roomPrice: 120,
                isSpecialOffer: true
              })}
            >
              <Text style={styles.offerButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </AppCard>
      </View>
    </ScrollView>

    {/* Live Chat Support Button */}
    <TouchableOpacity
      style={styles.chatButton}
      onPress={handleChatPress}
      activeOpacity={0.8}
    >
      <View style={styles.chatIconContainer}>
        <Ionicons name="chatbubble" size={24} color={Colors.white} />
        {hasUnreadMessages && <View style={styles.unreadBadge} />}
        {isOnline && <View style={styles.onlineIndicator} />}
      </View>
    </TouchableOpacity>

    {/* Chat Support Modal */}
    <Modal
      visible={isChatModalVisible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleCloseChatModal}
    >
      <View style={styles.chatModal}>
        {/* Chat Header */}
        <View style={styles.chatHeader}>
          <View style={styles.chatHeaderInfo}>
            <View style={styles.chatHeaderLeft}>
              <View style={styles.supportAgentAvatar}>
                <Ionicons name="person" size={20} color={Colors.white} />
              </View>
              <View>
                <Text style={styles.chatHeaderTitle}>Live Support</Text>
                <View style={styles.onlineStatus}>
                  <View style={styles.onlineStatusDot} />
                  <Text style={styles.onlineStatusText}>Online • Avg response 2 min</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseChatModal}
            >
              <Ionicons name="close" size={24} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Chat Content */}
        <ScrollView style={styles.chatContent} showsVerticalScrollIndicator={false}>
          {/* Welcome Message */}
          <View style={styles.welcomeMessage}>
            <Text style={styles.welcomeTitle}>👋 Hi there!</Text>
            <Text style={styles.welcomeText}>
              Welcome to BW Resorts! How can we help you today?
            </Text>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            <Text style={styles.quickActionsTitle}>Quick Help</Text>
            <View style={styles.quickActionsGrid}>
              <TouchableOpacity
                style={styles.quickActionButton}
                onPress={() => handleQuickAction('booking')}
              >
                <Ionicons name="calendar-outline" size={20} color={Colors.primary} />
                <Text style={styles.quickActionText}>Booking Help</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickActionButton}
                onPress={() => handleQuickAction('cancel')}
              >
                <Ionicons name="close-circle-outline" size={20} color={Colors.primary} />
                <Text style={styles.quickActionText}>Cancel Booking</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.quickActionButton}
                onPress={() => handleQuickAction('support')}
              >
                <Ionicons name="help-circle-outline" size={20} color={Colors.primary} />
                <Text style={styles.quickActionText}>General Support</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* FAQ Section */}
          <View style={styles.faqContainer}>
            <Text style={styles.faqTitle}>Frequently Asked</Text>
            <TouchableOpacity style={styles.faqItem}>
              <Text style={styles.faqQuestion}>How do I modify my booking?</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.gray400} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.faqItem}>
              <Text style={styles.faqQuestion}>What's your cancellation policy?</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.gray400} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.faqItem}>
              <Text style={styles.faqQuestion}>How can I contact the resort?</Text>
              <Ionicons name="chevron-forward" size={16} color={Colors.gray400} />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Message Input */}
        <View style={styles.messageInputContainer}>
          <View style={styles.messageInputWrapper}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type your message..."
              placeholderTextColor={Colors.gray400}
              value={chatMessage}
              onChangeText={setChatMessage}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                chatMessage.trim() && styles.sendButtonActive,
              ]}
              onPress={handleSendMessage}
              disabled={!chatMessage.trim()}
            >
              <Ionicons
                name="send"
                size={18}
                color={chatMessage.trim() ? Colors.white : Colors.gray400}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.messageHint}>
            Our support team typically responds within 2 minutes
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing.lg,
  },
  greeting: {
    flex: 1,
  },
  greetingText: {
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
  },
  userName: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  notificationButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.gray100,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
    marginLeft: Spacing.sm,
  },
  filterButton: {
    padding: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  seeAllText: {
    fontSize: FontSizes.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.lg,
  },
  quickAction: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  quickActionText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  featuredList: {
    paddingLeft: Spacing.lg,
  },
  offerCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.primary,
  },
  offerContent: {
    padding: Spacing.lg,
  },
  offerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  offerSubtitle: {
    fontSize: FontSizes.base,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: Spacing.lg,
  },
  offerButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    alignSelf: 'flex-start',
  },
  offerButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.primary,
  },
  // Chat Support Styles
  chatButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.lg,
    elevation: 8,
  },
  chatIconContainer: {
    position: 'relative',
  },
  unreadBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.error,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  chatModal: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  chatHeader: {
    backgroundColor: Colors.white,
    paddingTop: 50,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray200,
    ...Shadows.sm,
  },
  chatHeaderInfo: {
    paddingHorizontal: Spacing.lg,
  },
  chatHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  supportAgentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  chatHeaderTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  onlineStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
    marginRight: 4,
  },
  onlineStatusText: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: Spacing.lg,
    padding: 8,
  },
  chatContent: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  welcomeMessage: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginVertical: Spacing.lg,
    ...Shadows.sm,
  },
  welcomeTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  welcomeText: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  quickActionsContainer: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  quickActionsTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.md,
    marginHorizontal: 4,
    backgroundColor: Colors.gray50,
    borderRadius: BorderRadius.md,
  },
  quickActionText: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  faqContainer: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  faqTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  faqQuestion: {
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    flex: 1,
  },
  messageInputContainer: {
    backgroundColor: Colors.white,
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.gray200,
  },
  messageInputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.gray50,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  messageInput: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
    maxHeight: 100,
    paddingVertical: Spacing.xs,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray300,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.sm,
  },
  sendButtonActive: {
    backgroundColor: Colors.primary,
  },
  messageHint: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});

export default HomeScreen;
