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
import ScreenWrapper from "../components/ScreenWrapper"; // Wrap screens with Header & BottomBar

const Stack = createStackNavigator();

const screens = [
  { name: "Home", Component: HomeScreen },
  { name: "UserProfile", Component: UserProfile },
  { name: "Email", Component: EmailScreen },
  { name: "Calendar", Component: Calendar },
  { name: "Class Calculator", Component: CalculatorScreen },
  { name: "Settings", Component: Settings },
  { name: "Announcements", Component: AnnouncementScreen },
  { name: "Academics", Component: AcademicScreen },
];

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      {screens.map(({ name, Component }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={(props) => (
            <ScreenWrapper navigation={props.navigation}>
              <Component {...props} />
            </ScreenWrapper>
          )}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AppNavigator;
