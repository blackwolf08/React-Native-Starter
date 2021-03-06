import * as React from "react";
import { StyleSheet } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

export default function HomeScreen() {
  return (
    <Layout style={styles.container}>
      <Text>HomeScreen</Text>
    </Layout>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
