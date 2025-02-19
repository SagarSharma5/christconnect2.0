import React from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import Header from "./Header";
import BottomNavBar from "./BottomNavBar";

const ScreenWrapper = ({ children, navigation, headerHeight = 90 }) => {
  return (
    <View style={styles.container}>
      {/* Header stays fixed */}
      <Header height={headerHeight} />

      {/* Content area adjusts when keyboard opens */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        {children}
      </KeyboardAvoidingView>

      {/* BottomNavBar stays fixed */}
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default ScreenWrapper;
