import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ height = 90 }) => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.avoidingView, { height }]}
    >
      <View style={[styles.header, { height }]}>
        <View style={styles.leftContainer}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons
              style={styles.icons}
              name="menu"
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Text style={styles.title}>ChristConnect</Text>
          </TouchableOpacity>
        </View>
        <Ionicons
          style={styles.icons}
          name="settings"
          size={30}
          color="white"
          onPress={() => navigation.navigate("Settings")}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  avoidingView: {
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 10, // Ensures it's above other components
  },
  header: {
    backgroundColor: "#003366",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: "100%",
    height: 90, // Fixed height
  },
  leftContainer: {
    flexDirection: "row",
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
