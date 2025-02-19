import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import UserProfile from "../screens/UserProfile";
import EmailScreen from "../screens/EmailScreen";
import Calendar from "../screens/Calendar";
import CalculatorScreen from "../screens/CalculatorScreen";
import Settings from "../screens/Settings";
import AnnouncementScreen from "../screens/AnnouncementScreen";
import AcademicScreen from "../screens/AcademicScreen";
import ScreenWrapper from "../components/ScreenWrapper";
import CustomDrawer from "../components/CustomDrawer";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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

const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    {screens.map(({ name, Component }) => (
      <Stack.Screen
        key={name}
        name={name}
        component={(props) => (
          <ScreenWrapper
            navigation={props.navigation}
            headerHeight={name === "Home" ? 180 : 90} // Keeps Header
          >
            <Component {...props} />
          </ScreenWrapper>
        )}
      />
    ))}
  </Stack.Navigator>
);

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{ drawerStyle: { width: "80%" } }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="MainStack"
        component={StackNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
