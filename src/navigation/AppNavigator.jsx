import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import UserProfile from "../screens/UserProfile";
import EmailScreen from "../screens/EmailScreen";
import Calendar from "../screens/Calendar";
import CalculatorScreen from "../screens/CalculatorScreen";
import Settings from "../screens/Settings";
import AnnouncementScreen from "../screens/AnnouncementScreen";
import AcademicScreen from "../screens/AcademicScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="Email" component={EmailScreen} />
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="Class Calculator" component={CalculatorScreen} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Announcements" component={AnnouncementScreen} />
      <Stack.Screen name="Academics" component={AcademicScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
