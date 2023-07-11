import { Stack } from "expo-router";
import { useEffect } from "react";
import { AuthProvider } from "../context/auth";
import { NativeBaseProvider, StatusBar } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import Colors from "../constants/Colors";
import { Theme, ThemeProvider as NavProvider } from "@react-navigation/native";
import { ThemeProvider, useTheme } from "../context/theme";
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
    // SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

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
      background: theme.background[300],
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
