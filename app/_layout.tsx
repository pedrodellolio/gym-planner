import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBarStyle, useColorScheme } from "react-native";
import { Provider } from "../context/auth";
import { NativeBaseProvider, StatusBar } from "native-base";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Manrope: require("../assets/fonts/Manrope-VariableFont_wght.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {/* {!loaded && <SplashScreen />} */}
      {loaded ? <BaseLayout /> : null}
    </>
  );
}

function StackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="createPlaylistModal"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
}

function BaseLayout() {
  const statusBarStyle = ["default", "dark-content", "light-content"] as const;

  return (
    <>
      <NativeBaseProvider>
        <Provider>
          <SafeAreaProvider>
            <StatusBar barStyle={statusBarStyle[1]} />
            <StackLayout />
          </SafeAreaProvider>
        </Provider>
      </NativeBaseProvider>
    </>
  );
}
