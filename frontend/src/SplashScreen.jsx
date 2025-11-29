import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const { height } = Dimensions.get("window");

export default function SplashScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <ImageBackground source={require("./../assets/splashImage.png")} style={styles.bg} resizeMode="cover" >
                <LinearGradient colors={["rgba(0,0,0,0.04)", "rgba(0,0,0,0.16)", "rgba(0,0,0,0.4)",]} style={styles.gradient} />
                <View style={styles.bottomContainer}>
                    <Text style={styles.appName}>ShareMeal</Text>
                    <Text style={styles.tagline}>Together, We Feed Hope.</Text>
                    <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("Volunteer")}>
                        <Ionicons name="chevron-forward" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>);
}
const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
        },
        bg: {
            flex: 1,
            justifyContent: "flex-end",
        },
        gradient: {
            ...StyleSheet.absoluteFillObject,
        },
        bottomContainer: {
            alignItems: "center",
            paddingBottom:
                height * 0.13,
        },
        appName: {
            fontSize: 36,
            fontWeight: "800",
            color: "white",
            marginBottom: 8,
            letterSpacing: 1,
        },
        tagline: {
            fontSize: 18,
            fontWeight: "500",
            color: "#f1f1f1ff",
            textAlign: "center",
            marginBottom: height * 0.29,
            opacity: 0.9,
        },
        nextButton: {
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: "rgba(49, 46, 46, 0.15)",
            borderWidth: 1, borderColor: "rgba(255, 255, 255, 0.17)",
            alignItems: "center", justifyContent: "center",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 6,
            marginTop: 20,
        },
    }
);