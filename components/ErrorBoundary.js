import React, { Component } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: {} };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <ScrollView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>{JSON.stringify(this.state.error)}</Text>
        </ScrollView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({});
