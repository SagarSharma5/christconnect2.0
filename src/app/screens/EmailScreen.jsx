import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";

const EmailScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Header height="90" />

    <View style={styles.content}>
      <Text style={styles.title}>Email Screen</Text>
    </View>

    <BottomNavBar navigation={navigation} style={styles.bottomNav} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  content: {
    flex: 1, // Ensures BottomNavBar stays at the bottom
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default EmailScreen;
