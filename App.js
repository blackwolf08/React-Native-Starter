import React, { Suspense, useEffect, useState, useRef } from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View
} from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  ApplicationProvider,
  Layout,
  IconRegistry
} from "@ui-kitten/components";
import { mapping, light, dark } from "@eva-design/eva";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Provider } from "react-redux";
import store from "./store";

import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";

import fallBackComponent from "./components/FallbackComponent";
import ErrorBoundary from "./components/ErrorBoundary";

import { ThemeContext } from "./contexts/theme-context";
const themes = { light, dark };
import Colors from "./constants/Colors";

console.disableYellowBox = true;

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [initialNavigationState, setInitialNavigationState] = useState();
  const containerRef = useRef();
  const { getInitialState } = useLinking(containerRef);
  const [theme, setTheme] = React.useState("dark");
  const currentTheme = themes[theme];

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

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
      <ApplicationProvider mapping={mapping} theme={currentTheme}>
        <StatusBar
          translucent
          backgroundColor={
            currentTheme == "light"
              ? Colors.backgroundLight
              : Colors.backgroundDark
          }
          barStyle={currentTheme == "light" ? "dark-content" : "light-content"}
        />
        <IconRegistry icons={EvaIconsPack} />
        <Provider store={store}>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <Suspense fallback={fallBackComponent}>
              <ErrorBoundary>
                <Layout style={styles.container}>
                  <SafeAreaView
                    style={{
                      flex: 0,
                      backgroundColor:
                        currentTheme == "light"
                          ? Colors.backgroundLight
                          : Colors.backgroundDark
                    }}
                  ></SafeAreaView>
                  <SafeAreaView style={styles.container}>
                    <NavigationContainer
                      ref={containerRef}
                      initialState={initialNavigationState}
                    >
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Root"
                          component={BottomTabNavigator}
                        />
                      </Stack.Navigator>
                    </NavigationContainer>
                  </SafeAreaView>
                </Layout>
              </ErrorBoundary>
            </Suspense>
          </ThemeContext.Provider>
        </Provider>
      </ApplicationProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight / 2
  }
});
