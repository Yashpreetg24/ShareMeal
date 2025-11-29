import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Linking,
  Dimensions
} from 'react-native';
import {
  Text,
  Button,
  IconButton,
  Chip,
  Avatar,
  useTheme,
  Divider,
  Surface
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const DonationDetails = ({ visible, onDismiss, donation, onAccept }) => {
  const theme = useTheme();

  if (!donation) return null;

  const {
    foodType,
    description,
    quantity,
    area,
    fullAddress,
    pickupTime,
    donorName,
    donorPhone,
    pickupInstructions,
    meals,
    foodImage,
    isVeg,
    isPackaged
  } = donation;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onDismiss}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Donation Details</Text>
          <IconButton icon="close" onPress={onDismiss} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.imageContainer}>
            {foodImage ? (
              <Image
                source={typeof foodImage === 'string' ? { uri: foodImage } : foodImage}
                style={styles.image}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.placeholderImage}>
                <MaterialIcons name="fastfood" size={60} color="#9e9e9e" />
              </View>
            )}
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.title}>{foodType}</Text>

            <Text style={styles.description}>
              {description || 'No description provided.'}
            </Text>

            <View style={styles.chipContainer}>
              <Chip
                mode="outlined"
                style={[styles.chip, { borderColor: isVeg ? '#4CAF50' : '#F44336' }]}
                textStyle={{ color: isVeg ? '#4CAF50' : '#F44336' }}
              >
                {isVeg ? 'Veg' : 'Non-Veg'}
              </Chip>
              <Chip
                mode="outlined"
                style={[styles.chip, { borderColor: '#2980B9' }]}
                textStyle={{ color: '#2980B9' }}
              >
                {isPackaged ? 'Packaged' : 'Fresh Food'}
              </Chip>
              <Chip mode="outlined" style={styles.chip}>
                {quantity} servings
              </Chip>
            </View>

            <Divider style={styles.divider} />

            <Text style={styles.sectionTitle}>PICKUP DETAILS</Text>

            <View style={styles.infoRow}>
              <MaterialIcons name="location-on" size={20} color="#666" />
              <Text style={styles.infoText}>{fullAddress || area}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="access-time" size={20} color="#666" />
              <Text style={styles.infoText}>{pickupTime}</Text>
            </View>

            {donorName && (
              <View style={styles.infoRow}>
                <Avatar.Text
                  size={24}
                  label={donorName.split(' ').map(n => n[0]).join('')}
                  style={styles.avatar}
                />
                <Text style={styles.infoText}>{donorName}</Text>
              </View>
            )}

            {donorPhone && (
              <View style={styles.infoRow}>
                <MaterialIcons name="phone" size={20} color="#666" />
                <Text style={styles.infoText}>{donorPhone}</Text>
              </View>
            )}

            {pickupInstructions && (
              <View style={styles.instructionSection}>
                <Text style={styles.sectionTitle}>PICKUP INSTRUCTIONS</Text>
                <Text style={styles.instructionText}>{pickupInstructions}</Text>
              </View>
            )}

            <View style={styles.mealsEstimate}>
              <Text style={styles.mealsText}>
                Estimated meals: <Text style={styles.mealsValue}>{meals}</Text>
              </Text>

              <Button
                mode="outlined"
                icon="directions"
                onPress={() => {
                  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress || area)}`;
                  Linking.openURL(mapsUrl);
                }}
              >
                Directions
              </Button>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={() => {
              onAccept(donation);
              onDismiss();
            }}
            style={styles.acceptButton}
            contentStyle={{ height: 48 }}
          >
            Accept Donation
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    height: 200,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    lineHeight: 24,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  chip: {
    backgroundColor: 'transparent',
  },
  divider: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 12,
    marginTop: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  avatar: {
    backgroundColor: '#1ABC9C',
  },
  instructionSection: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  instructionText: {
    fontSize: 15,
    color: '#333',
  },
  mealsEstimate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  mealsText: {
    fontSize: 16,
    color: '#666',
  },
  mealsValue: {
    fontWeight: 'bold',
    color: 'black',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  acceptButton: {
    borderRadius: 8,
  },
});

export default DonationDetails;
