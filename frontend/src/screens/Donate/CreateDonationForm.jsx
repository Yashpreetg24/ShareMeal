// CreateDonationForm.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "DONATIONS_LIST";

export default function CreateDonationForm({ navigation }) {
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photos, setPhotos] = useState([]);
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhotos(result.assets.map((asset) => asset.uri));
    }
  };

  const handleCreateDonation = async () => {
    if (!foodType || !quantity || !address || !contact) {
      alert("Please fill Food Type, Quantity, Address and Contact.");
      return;
    }

    const newDonation = {
      id: Date.now().toString(),
      foodType,
      quantity,
      address,
      contact,
      pickupTime,
      notes,
      photos,
      status: "Available",
    };

    try {
      const existing = await AsyncStorage.getItem(STORAGE_KEY);
      const parsed = existing ? JSON.parse(existing) : [];
      const updated = [newDonation, ...parsed];

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      navigation.goBack();
    } catch (error) {
      console.log("Error saving donation:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../../../assets/form3.jpg")}
      style={styles.bg}
    >
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <BlurView intensity={50} tint="light" style={styles.formCard}>
          <Text style={styles.heading}>Create Donation</Text>

          {/* Food Type */}
          <Text style={styles.label}>Food Type</Text>
          <TextInput
            placeholder="E.g., Rice, Sandwiches"
            placeholderTextColor="#eee"
            style={styles.underlineInput}
            value={foodType}
            onChangeText={setFoodType}
          />

          {/* Quantity */}
          <Text style={styles.label}>Quantity</Text>
          <TextInput
            placeholder="E.g., 5 plates / 2 boxes"
            placeholderTextColor="#eee"
            style={styles.underlineInput}
            value={quantity}
            onChangeText={setQuantity}
          />

          {/* Photos */}
          <Text style={styles.label}>Food Photos</Text>
          <TouchableOpacity style={styles.photoButton} onPress={pickImages}>
            <Text style={styles.photoButtonText}>Upload Photos</Text>
          </TouchableOpacity>
          {photos.length > 0 && (
            <Text style={styles.photoCount}>
              {photos.length} photo(s) selected
            </Text>
          )}

          {/* Pickup Details */}
          <Text style={styles.label}>Pickup Address</Text>
          <TextInput
            placeholder="Address"
            placeholderTextColor="#eee"
            style={styles.underlineInput}
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            placeholder="Contact Number"
            placeholderTextColor="#eee"
            style={styles.underlineInput}
            keyboardType="phone-pad"
            value={contact}
            onChangeText={setContact}
          />

          <Text style={styles.label}>
            Available for pickup until (e.g., 5:00 PM)
          </Text>
          <TextInput
            placeholder="E.g., 5:00 PM"
            placeholderTextColor="#eee"
            style={styles.underlineInput}
            value={pickupTime}
            onChangeText={setPickupTime}
          />

          {/* Notes */}
          <Text style={styles.label}>Additional Notes</Text>
          <TextInput
            placeholder="E.g., Allergies, special instructions..."
            placeholderTextColor="#eee"
            style={[styles.underlineInput, { height: 90 }]}
            multiline
            value={notes}
            onChangeText={setNotes}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateDonation}
          >
            <Text style={styles.buttonText}>Create Donation</Text>
          </TouchableOpacity>
        </BlurView>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 80,
  },
  backButton: {
    position: "absolute",
    top: 55,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 8,
    borderRadius: 25,
  },
  formCard: {
    borderRadius: 25,
    marginTop: 100,
    padding: 25,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  heading: {
    fontSize: 33,
    fontWeight: "800",
    color: "#ffffffff",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    color: "#fff",
    fontWeight: "800",
    marginBottom: 6,
    marginTop: 12,
  },
  underlineInput: {
    borderBottomWidth: 1,
    borderBottomColor: "white",
    paddingVertical: 8,
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },
  photoButton: {
    backgroundColor: "#ffffffaa",
    padding: 12,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  photoButtonText: {
    color: "#111",
    fontWeight: "600",
  },
  photoCount: {
    color: "#fff",
    marginBottom: 10,
  },
  button: {
    marginTop: 25,
    backgroundColor: "#fffefeff",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#111111ff",
    fontWeight: "600",
    fontSize: 16,
  },
});

