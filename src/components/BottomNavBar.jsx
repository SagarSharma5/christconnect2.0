import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BottomNavBar = ({ navigation }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("UserProfile")}
      >
        <Ionicons name="person" size={30} color="#003366" />{" "}
        {/* Changed to bold icon */}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Calendar")}
      >
        <Ionicons name="calendar" size={30} color="#003366" />{" "}
        {/* Changed to bold icon */}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="home" size={30} color="#003366" />{" "}
        {/* Changed to bold icon */}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Class Calculator")}
      >
        <Ionicons name="calculator" size={30} color="#003366" />{" "}
        {/* Changed to bold icon */}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons name="settings" size={30} color="#003366" />{" "}
        {/* Changed to bold icon */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#003366", // Dark blue color
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 30, // Circular shape
    padding: 10,
  },
});

export default BottomNavBar;
