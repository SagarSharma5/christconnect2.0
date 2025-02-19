import React from "react";
import { View, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BottomNavBar = ({ navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  if (isKeyboardVisible) return null; // Hide BottomNavBar when keyboard is open

  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("UserProfile")}
      >
        <Ionicons name="person" size={35} color="#003366" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Calendar")}
      >
        <Ionicons name="calendar" size={35} color="#003366" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.homeButton]}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="home" size={52} color="#003366" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Class Calculator")}
      >
        <Ionicons name="calculator" size={35} color="#003366" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Settings")}
      >
        <Ionicons name="settings" size={35} color="#003366" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#003366",
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 80,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 100,
    height: 55,
    width: 55,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    bottom: 20,
    borderColor: "#003366",
    borderWidth: 5,
  },
  homeButton: {
    height: 80,
    width: 80,
    bottom: 30,
    borderColor: "#003366",
    borderWidth: 5,
  },
});

export default BottomNavBar;
