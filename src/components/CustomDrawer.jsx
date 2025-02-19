import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const CustomDrawer = ({ navigation }) => {
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.profileSection}>
        <Ionicons name="person-circle-outline" size={80} color="white" />
        <Text style={styles.username}>Sagar Sharma</Text>
      </View>

      {/* Home */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("MainStack", { screen: "Home" })}
      >
        <Ionicons name="home-outline" size={24} color="white" />
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() =>
          navigation.navigate("MainStack", { screen: "UserProfile" })
        }
      >
        <Ionicons name="person-outline" size={24} color="white" />
        <Text style={styles.menuText}>Profile</Text>
      </TouchableOpacity>

      {/* Share App (Redirects to Home) */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("MainStack", { screen: "Home" })}
      >
        <Ionicons name="share-social-outline" size={24} color="white" />
        <Text style={styles.menuText}>Share the App</Text>
      </TouchableOpacity>

      {/* Rate App (Redirects to Home) */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("MainStack", { screen: "Home" })}
      >
        <MaterialIcons name="star-rate" size={24} color="white" />
        <Text style={styles.menuText}>Rate the App</Text>
      </TouchableOpacity>

      {/* Buy Us Coffee (Redirects to Home) */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("MainStack", { screen: "Home" })}
      >
        <MaterialIcons name="coffee" size={24} color="white" />
        <Text style={styles.menuText}>Buy Us Coffee</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#003366",
    paddingTop: 60,
    paddingHorizontal: 20,
    width: "100%", // Fix white column issue
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  username: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  menuText: {
    color: "white",
    fontSize: 16,
    marginLeft: 15,
  },
});

export default CustomDrawer;
