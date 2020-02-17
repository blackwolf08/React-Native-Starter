import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, Layout } from "@ui-kitten/components";

export default function SearchScreen() {
  return (
    <Layout style={styles.container}>
      <Text>Search Screen</Text>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
