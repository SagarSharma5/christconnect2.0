import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // ✅ Import this

const Header = ({ height = "15%" }) => {
  const navigation = useNavigation(); // ✅ Get navigation instance

  return (
    <View style={[styles.header, { height }]}>
      <View style={styles.leftContainer}>
        <Ionicons style={styles.icons} name="menu" size={30} color="white" />
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text style={styles.title}>ChristConnect</Text>
        </TouchableOpacity>
      </View>
      <Ionicons
        style={styles.icons}
        name="settings"
        size={30}
        color="white"
        onPress={() => navigation.navigate("Settings")} // ✅ Add navigation
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#003366",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: "100%",
    position: "absolute",
    top: 0,
  },
  leftContainer: {
    flexDirection: "row",
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 10,
  },
  icons: {
    marginTop: 5,
  },
});

export default Header;
