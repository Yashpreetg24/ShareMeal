import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Button,
  useTheme,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import DonationCard from './DonationCard';
import DonationDetails from './DonationDetails';
import FilterSection from './FilterSection';
import DashboardTabs from './DashboardTabs';
import MyTaskCard from './MyTaskCard';

// Mock data
const mockDonations = [
  {
    id: 1,
    foodType: 'Chapati & Sabzi',
    description: 'Freshly made chapatis with mixed vegetable curry. Packed and ready for pickup.',
    quantity: '5-7',
    area: 'Mumbai Central',
    fullAddress: '123, ABC Building, Lamington Road, Mumbai Central, Mumbai - 400008',
    pickupTime: 'Today, 7:00 PM - 8:00 PM',
    donorName: 'Rahul S.',
    donorPhone: '+91 98XXXXX123',
    pickupInstructions: 'Ring the bell twice. Ask for Mrs. Sharma.',
    meals: 10,
    isVeg: true,
    isPackaged: true,
    foodImage: 'https://source.unsplash.com/random/300x200/?food,indian',
    createdAt: new Date('2023-11-28T10:30:00'),
    distance: 1.2, // in km
  },
  {
    id: 2,
    foodType: 'Biryani',
    description: 'Homemade chicken biryani with raita. Can serve 8-10 people.',
    quantity: '8-10',
    area: 'Bandra West',
    fullAddress: '45, Pali Hill, Bandra West, Mumbai - 400050',
    pickupTime: 'Today, 8:00 PM - 9:00 PM',
    donorName: 'Priya M.',
    donorPhone: '+91 99XXXXX456',
    pickupInstructions: 'Call 10 mins before arrival. Security will hand over the package.',
    meals: 16,
    isVeg: false,
    isPackaged: false,
    foodImage: 'https://source.unsplash.com/random/300x200/?biryani',
    createdAt: new Date('2023-11-28T11:45:00'),
    distance: 2.5,
  },
  {
    id: 3,
    foodType: 'Sandwiches & Fruits',
    description: 'Assorted sandwiches and fresh fruit boxes from a cafe. All vegetarian.',
    quantity: '15',
    area: 'Andheri East',
    fullAddress: 'Cafe Fresh, Near Chakala Metro Station, Andheri East, Mumbai - 400069',
    pickupTime: 'Tomorrow, 9:00 AM - 11:00 AM',
    donorName: 'Cafe Fresh',
    donorPhone: '+91 22XXXXXX12',
    pickupInstructions: 'Ask for the manager and mention "Share Meal"',
    meals: 15,
    isVeg: true,
    isPackaged: true,
    foodImage: 'https://source.unsplash.com/random/300x200/?sandwich,fruit',
    createdAt: new Date('2023-11-28T14:20:00'),
    distance: 3.1,
  },
];

const VolunteerDashboard = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('nearest');
  const [foodType, setFoodType] = useState('all');
  const [packaging, setPackaging] = useState('all');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [availableDonations, setAvailableDonations] = useState(mockDonations);
  const [acceptedDonations, setAcceptedDonations] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Menu states
  const [sortMenuVisible, setSortMenuVisible] = useState(false);

  // Filter and sort available donations
  const filteredDonations = availableDonations
    .filter(donation => {
      const matchesSearch = donation.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        donation.foodType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFoodType = foodType === 'all' ||
        (foodType === 'veg' && donation.isVeg) ||
        (foodType === 'non-veg' && !donation.isVeg);
      const matchesPackaging = packaging === 'all' ||
        (packaging === 'packaged' && donation.isPackaged) ||
        (packaging === 'fresh' && !donation.isPackaged);

      return matchesSearch && matchesFoodType && matchesPackaging;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'nearest':
          return a.distance - b.distance;
        case 'earliest':
          return new Date(a.pickupTime) - new Date(b.pickupTime);
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });

  const handleAcceptDonation = (donation) => {
    setAvailableDonations(prev => prev.filter(d => d.id !== donation.id));
    setAcceptedDonations(prev => [...prev, { ...donation, status: 'accepted' }]);
  };

  const handleCompleteDonation = (donationId) => {
    setAcceptedDonations(prev => prev.filter(d => d.id !== donationId));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ShareMeal</Text>
        <Text style={styles.headerSubtitle}>Volunteer Dashboard</Text>
      </View>

      <DashboardTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tasksCount={acceptedDonations.length}
      />

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {activeTab === 0 ? (
          <>
            <FilterSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
              foodType={foodType}
              setFoodType={setFoodType}
              packaging={packaging}
              setPackaging={setPackaging}
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              sortMenuVisible={sortMenuVisible}
              setSortMenuVisible={setSortMenuVisible}
            />

            {filteredDonations.length > 0 ? (
              filteredDonations.map((donation) => (
                <DonationCard
                  key={donation.id}
                  donation={donation}
                  onAccept={() => handleAcceptDonation(donation)}
                  onPress={() => setSelectedDonation(donation)}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No donations found</Text>
                <Text style={styles.emptyStateSubtext}>Try adjusting your filters</Text>
              </View>
            )}
          </>
        ) : (
          <>
            {acceptedDonations.length > 0 ? (
              acceptedDonations.map((donation) => (
                <MyTaskCard
                  key={donation.id}
                  donation={donation}
                  onComplete={handleCompleteDonation}
                />
              ))
            ) : (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No active tasks</Text>
                <Text style={styles.emptyStateSubtext}>Accept donations to see them here</Text>
                <Button
                  mode="contained"
                  onPress={() => setActiveTab(0)}
                  style={{ marginTop: 16 }}
                >
                  Find Donations
                </Button>
              </View>
            )}
          </>
        )}
      </ScrollView>

      <DonationDetails
        visible={!!selectedDonation}
        onDismiss={() => setSelectedDonation(null)}
        donation={selectedDonation}
        onAccept={handleAcceptDonation}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3f51b5',
    padding: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    marginTop: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    color: '#999',
  },
});

export default VolunteerDashboard;
