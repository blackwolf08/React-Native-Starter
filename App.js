import React, { Suspense, useEffect, useState, useRef } from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  ApplicationProvider,
  Layout,
  IconRegistry
} from "@ui-kitten/components";
import {
  mapping,
  light as lightTheme,
  dark as darkTheme
} from "@eva-design/eva";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import store from "./store";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";

import fallBackComponent from "./components/FallbackComponent";
import ErrorBoundary from "./components/ErrorBoundary";

console.disableYellowBox = true;

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [initialNavigationState, setInitialNavigationState] = useState();
  const containerRef = useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf")
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <IconRegistry icons={EvaIconsPack} />
        <Provider store={store}>
          <Suspense fallback={fallBackComponent}>
            <ErrorBoundary>
              <Layout style={styles.container}>
                {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                <NavigationContainer
                  ref={containerRef}
                  initialState={initialNavigationState}
                >
                  <Stack.Navigator>
                    <Stack.Screen name="Root" component={BottomTabNavigator} />
                  </Stack.Navigator>
                </NavigationContainer>
              </Layout>
            </ErrorBoundary>
          </Suspense>
        </Provider>
      </ApplicationProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
