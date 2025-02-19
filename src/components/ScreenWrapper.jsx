import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Header from "./Header";
import BottomNavBar from "./BottomNavBar";

const ScreenWrapper = ({ children, navigation }) => {
  return (
    <View style={styles.container}>
      <Header height="90" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContent}>{children}</View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  content: {
    flex: 1,
  },
  innerContent: {
    flex: 1,
  },
});

export default ScreenWrapper;
