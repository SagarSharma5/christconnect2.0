import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../components/HomeScreen";
import UserProfile from "../components/UserProfile";
import Calendar from "../components/Calendar";
import CalculatorScreen from "../components/CalculatorScreen";
import Settings from "../components/Settings";
import AnnouncementScreen from "../components/AnnouncementScreen";
import AcademicScreen from "../components/AcademicScreen";
import EmailScreen from "../components/EmailScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="UserProfile" component={UserProfile} options={{ headerShown: false }} />
        <Stack.Screen name="Email" component={EmailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Calendar" component={Calendar} options={{ headerShown: false }} />
        <Stack.Screen name="Class Calculator" component={CalculatorScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
        <Stack.Screen name="Announcements" component={AnnouncementScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Academics" component={AcademicScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    
  );
};

export default App;
