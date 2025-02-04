import React from "react";
import { View, Text, StyleSheet } from "react-native";

const EmailScreen = () => (
  <View style={styles.container}>
    <Text>Email Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EmailScreen;
