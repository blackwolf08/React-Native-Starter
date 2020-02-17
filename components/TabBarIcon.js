import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { ThemeContext } from "../contexts/theme-context";

export default function TabBarIcon(props) {
  const themeContext = React.useContext(ThemeContext);
  const colorSelected =
    themeContext.theme == "light"
      ? Colors.tabIconSelectedLight
      : Colors.tabIconSelectedDark;
  const colorNotSelected =
    themeContext.theme == "light"
      ? Colors.tabIconNotSelectedLight
      : Colors.tabIconNotSelectedDark;
  return (
    <Ionicons
      name={props.name}
      size={30}
      style={{ marginBottom: -3 }}
      color={props.focused ? colorSelected : colorNotSelected}
    />
  );
}
