import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "./Header"; // Importing Header component
import BottomNavBar from "./BottomNavBar"; // Importing BottomNavBar component

const HomeScreen = ({ navigation }) => {
  const boxes = [
    { title: "Academics", icon: "book", screen: "Academics" },
    { title: "Announcements", icon: "megaphone", screen: "Announcements" },
    { title: "Email", icon: "mail", screen: "Email" },
    {
      title: "Class Calculator",
      icon: "calculator",
      screen: "Class Calculator",
    },
  ];

  return (
    <View style={styles.container}>
      <Header /> {/* Rendering Header */}
      {/* User Info Box */}
      <View style={styles.userInfoBox}>
        <Ionicons
          style={styles.userIcon}
          name="person-circle-outline"
          size={80}
          color="darkblue"
        />
        <Text style={styles.userName}>Sagar Sharma</Text>{" "}
        {/* Wrapped in Text */}
        <Text style={styles.userId}>2447245</Text> {/* Wrapped in Text */}
      </View>
      {/* Boxes */}
      <View style={styles.boxContainer}>
        {boxes.map((box, index) => (
          <TouchableOpacity
            key={index}
            style={styles.box}
            onPress={() => navigation.navigate(box.screen)}
          >
            <Ionicons name={box.icon} size={30} color="darkblue" />
            <Text style={styles.boxText}>{box.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <BottomNavBar navigation={navigation} /> {/* Rendering BottomNavBar */}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8", // Very light gray/off-white color
    alignItems: "center",
    justifyContent: "flex-start", // Changed to flex-start to accommodate Header
  },
  userInfoBox: {
    justifyContent: "center",
    height: "20%",
    width: "75%", // Reduced width
    padding: 20,
    backgroundColor: "white", // Set to white
    borderRadius: 10,
    elevation: 2, // Dark blue border color
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 }, // Increased shadow offset for more raised effect
    shadowOpacity: 0.5, // Increased opacity for more pronounced effect
    shadowRadius: 10, // Increased radius for more pronounced effect
    alignItems: "center",
    marginTop: 110, // Added margin to create space below the header
    marginBottom: 80,
  },
  userName: {
    fontSize: 22,
    color: "darkblue",
  },
  userId: {
    fontSize: 16,
    color: "grey",
  },
  boxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center", // Centering boxes vertically
    flex: 1, // Allowing the box container to take available space
  },
  box: {
    width: 160,
    height: 120,
    backgroundColor: "white", // White color for boxes
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
    elevation: 5, // Increased raised effect
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  boxText: {
    fontSize: 16,
    color: "darkblue",
    marginTop: 5,
  },
  userIcon: {
    width: 80,
  },
});

export default HomeScreen;
