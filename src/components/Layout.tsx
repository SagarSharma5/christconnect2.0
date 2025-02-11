// app/components/Layout.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./Header";
import BottomNavBar from "./BottomNavBar";

type LayoutProps = {
  children: React.ReactNode;
  navigation: any;
};

const Layout: React.FC<LayoutProps> = ({ children, navigation }) => {
  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <Header height="10%" />

      {/* Main Content */}
      <View style={styles.content}>{children}</View>

      {/* Fixed Bottom Navigation Bar */}
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
    paddingBottom: 60, // Leave space for BottomNavBar
  },
});

export default Layout;
