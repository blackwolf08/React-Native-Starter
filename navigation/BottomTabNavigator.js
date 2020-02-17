import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { ThemeContext } from "../contexts/theme-context";
import Colors from "../constants/Colors";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({
    header: () => null
  });
  const themeContext = React.useContext(ThemeContext);
  const tabBackgroundColor =
    themeContext.theme == "light"
      ? Colors.backgroundLight
      : Colors.backgroundDark;

  return (
    <BottomTab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: tabBackgroundColor,
          borderTopWidth: 0
        }
      }}
      initialRouteName={INITIAL_ROUTE_NAME}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: () => null,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-home" />
          )
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          title: () => null,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-search" />
          )
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: () => null,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-person" />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}
