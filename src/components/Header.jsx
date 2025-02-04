import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <Ionicons style={styles.icons} name="menu" size={30} color="white" />{" "}
        {/* Hamburger menu icon */}
        <Text style={styles.title}>ChristConnect</Text>
      </View>
      <Ionicons
        style={styles.icons}
        name="chatbubbles-outline"
        size={30}
        color="white"
      />{" "}
      {/* Chat icon */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#003366", // Dark blue color
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 25,
    paddingHorizontal: 20,
    height: "25%", // Increased padding for more height
    borderBottomLeftRadius: 40, // Increased border radius
    borderBottomRightRadius: 40, // Increased border radius
    width: "100%", // Full width
    position: "absolute", // Positioning to ensure it stays at the top
  },
  leftContainer: {
    flexDirection: "row",
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 28, // Increased font size
    fontWeight: "bold", // Bold font
    marginLeft: 10, // Margin to separate from the hamburger icon
  },
  icons: {
    marginTop: 5, // Margin to separate from the
  },
});

export default Header;
