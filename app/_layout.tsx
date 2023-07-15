import { Stack } from "expo-router";
import { useCallback, useEffect } from "react";
import { AuthProvider } from "../context/auth";
import { NativeBaseProvider, StatusBar } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Theme, ThemeProvider as NavProvider } from "@react-navigation/native";
import { ThemeProvider, useTheme } from "../context/theme";
import * as SplashScreen from "expo-splash-screen";
// import { useFonts } from "expo-font";
import {
  useFonts,
  Figtree_300Light,
  Figtree_400Regular,
  Figtree_500Medium,
  Figtree_600SemiBold,
  Figtree_700Bold,
} from "@expo-google-fonts/figtree";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // "Metropolis-Bold": require("../assets/fonts/Metropolis-Bold.ttf"),
    // "Metropolis-SemiBold": require("../assets/fonts/Metropolis-SemiBold.ttf"),
    // "Metropolis-Medium": require("../assets/fonts/Metropolis-Medium.ttf"),
    // "Metropolis-Regular": require("../assets/fonts/Metropolis-Regular.ttf"),
    // "Metropolis-Light": require("../assets/fonts/Metropolis-Light.ttf"),
    Figtree_300Light,
    Figtree_400Regular,
    Figtree_500Medium,
    Figtree_600SemiBold,
    Figtree_700Bold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // const onLayoutRootView = useCallback(async () => {
  //   if (loaded) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }

  // return (
  //   <ThemeProvider>
  //     <BaseLayout />
  //   </ThemeProvider>
  // );

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {/* {!loaded && <SplashScreen />} */}
      {loaded ? (
        <ThemeProvider>
          <BaseLayout />
        </ThemeProvider>
      ) : null}
    </>
  );
}

function StackLayout() {
  const { theme } = useTheme();

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="profile"
        options={{
          headerTitleStyle: {
            fontFamily: "Manrope_700Bold",
          },
          headerStyle: {
            backgroundColor: theme.background[600],
          },
          title: "Profile",
          headerShadowVisible: false,
          headerShown: true,
          presentation: "modal",
        }}
      ></Stack.Screen>
    </Stack>
  );
}

function BaseLayout() {
  const statusBarStyle = ["default", "dark-content", "light-content"] as const;
  // const colorScheme = useColorScheme();
  const { theme, colorScheme } = useTheme();

  const systemTheme: Theme = {
    dark: true,
    colors: {
      primary: theme.tint[500],
      background: theme.background[500],
      border: theme.border,
      text: theme.text,
      card: "#323232",
      notification: "#323232",
    },
  };

  return (
    <>
      <NavProvider value={systemTheme}>
        <NativeBaseProvider>
          <AuthProvider>
            <SafeAreaProvider>
              <StatusBar
                barStyle={
                  colorScheme === "dark" ? statusBarStyle[2] : statusBarStyle[1]
                }
              />
              <StackLayout />
            </SafeAreaProvider>
          </AuthProvider>
        </NativeBaseProvider>
      </NavProvider>
    </>
  );
}
