import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "./Header";
import BottomNavBar from "./BottomNavBar";

const AcademicScreen = () => (
  <View style={styles.container}>
    <Header height="10%" />
    <Text>Academic Screen</Text>
    <BottomNavBar />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AcademicScreen;
