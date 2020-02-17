import React from "react";
import { StyleSheet } from "react-native";
import { Layout, Text, Toggle } from "@ui-kitten/components";

import { ThemeContext } from "../contexts/theme-context";

const ProfileScreen = () => {
  const [checked, setChecked] = React.useState(false);
  const themeContext = React.useContext(ThemeContext);

  const onCheckedChange = isChecked => {
    setChecked(isChecked);
    themeContext.toggleTheme();
  };
  return (
    <Layout style={styles.container}>
      <Text>ProfileScreen</Text>
      <Toggle
        text={`Light/Dark Mode`}
        checked={checked}
        onChange={onCheckedChange}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProfileScreen;
