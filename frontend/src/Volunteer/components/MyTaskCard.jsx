import React from 'react';
import { View, Image, StyleSheet, Linking } from 'react-native';
import { Surface, Text, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

const MyTaskCard = ({ donation, onComplete }) => {
    return (
        <Surface style={styles.taskCard} elevation={2}>
            <View style={styles.taskImageContainer}>
                {donation.foodImage ? (
                    <Image source={typeof donation.foodImage === 'string' ? { uri: donation.foodImage } : donation.foodImage} style={styles.taskImage} />
                ) : (
                    <View style={[styles.taskImage, styles.placeholderImage]}>
                        <MaterialIcons name="fastfood" size={40} color="#9e9e9e" />
                    </View>
                )}
            </View>

            <View style={styles.taskContent}>
                <Text style={styles.taskTitle}>{donation.foodType}</Text>

                <View style={styles.taskInfoRow}>
                    <MaterialIcons name="location-on" size={16} color="#666" />
                    <Text style={styles.taskInfoText}>{donation.area}</Text>
                </View>

                <View style={styles.taskInfoRow}>
                    <MaterialIcons name="access-time" size={16} color="#666" />
                    <Text style={styles.taskInfoText}>{donation.pickupTime}</Text>
                </View>

                <View style={styles.taskInfoRow}>
                    <MaterialIcons name="phone" size={16} color="#666" />
                    <Text style={styles.taskInfoText}>{donation.donorPhone}</Text>
                </View>

                <View style={styles.taskActions}>
                    <Button
                        mode="outlined"
                        compact
                        icon="directions"
                        onPress={() => {
                            const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(donation.fullAddress || donation.area)}`;
                            Linking.openURL(mapsUrl);
                        }}
                        style={styles.taskButton}
                    >
                        Directions
                    </Button>
                    <Button
                        mode="contained"
                        compact
                        onPress={() => onComplete(donation.id)}
                        style={styles.taskButton}
                    >
                        Complete
                    </Button>
                </View>
            </View>
        </Surface>
    );
};

const styles = StyleSheet.create({
    taskCard: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    taskImageContainer: {
        height: 150,
        width: '100%',
    },
    taskImage: {
        width: '100%',
        height: '100%',
    },
    placeholderImage: {
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    taskContent: {
        padding: 16,
    },
    taskTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    taskInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    taskInfoText: {
        marginLeft: 8,
        color: '#666',
    },
    taskActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        gap: 8,
    },
    taskButton: {
        flex: 1,
    },
});

export default MyTaskCard;
