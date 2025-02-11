import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../components/Header";
import BottomNavBar from "../components/BottomNavBar";

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
      <Header height="25%" />
      <View style={[styles.userInfoBox]}>
        <Ionicons
          style={styles.userIcon}
          name="person-circle-outline"
          size={80}
          color="darkblue"
        />
        <Text style={styles.userName}>Sagar Sharma</Text>
        <Text style={styles.userId}>2447245</Text>
      </View>
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
      <BottomNavBar navigation={navigation} style={styles.bottomNavBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  userInfoBox: {
    justifyContent: "center",
    height: "20%",
    width: "75%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    alignItems: "center",
    marginTop: 110,
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
    alignItems: "center",
    flex: 1,
  },
  box: {
    width: 160,
    height: 120,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 10,
    elevation: 5,
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
