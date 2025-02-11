import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BottomNavBar = ({ navigation }) => {
  return (
    <View style={styles.navBar}>
      {navItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.button, item.isHome && styles.homeButton]}
          onPress={() => navigation.navigate(item.screen)}
        >
          <Ionicons
            name={item.icon}
            size={item.isHome ? 52 : 35}
            color="#003366"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const navItems = [
  { icon: "person", screen: "UserProfile" },
  { icon: "calendar", screen: "Calendar" },
  { icon: "home", screen: "Home", isHome: true }, // Home button is larger
  { icon: "calculator", screen: "Class Calculator" },
  { icon: "settings", screen: "Settings" },
];

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around", // Distributes buttons evenly
    alignItems: "center",
    backgroundColor: "#003366",
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: 60,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 100,
    height: 55,
    width: 55,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Android shadow
    bottom: 20,
    borderColor: "#003366",
    borderWidth: 5, // Lift buttons above navbar
  },
  homeButton: {
    height: 80, // Bigger home button
    width: 80,
    bottom: 30,
    borderColor: "#003366",
    borderWidth: 5, // Raised more than others
  },
});

export default BottomNavBar;
