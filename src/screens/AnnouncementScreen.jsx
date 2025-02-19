import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";

const AnnouncementScreen = ({ navigation }) => (
  <View style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.text}>Announcement Screen</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  content: {
    flex: 1, // Pushes BottomNavBar to the bottom
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#003366",
    fontWeight: "bold",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default AnnouncementScreen;
