import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Provider } from "../context/auth";
import { NativeBaseProvider, StatusBar, extendTheme } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import Colors from "../constants/Colors";
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
      {loaded ? <BaseLayout /> : null}
    </>
  );
}

function StackLayout() {
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
            backgroundColor: Colors["primary"].bg,
          },
          contentStyle: { backgroundColor: Colors["primary"].bg },
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

  const theme = extendTheme({
    colors: {},
    fonts: {
      heading: "Manrope_700Bold",
      body: "Manrope_500Medium",
    },
    fontSizes: {
      sm: 14,
      md: 16,
    },
    config: {
      initialColorMode: "light",
    },
  });

  return (
    <>
      <NativeBaseProvider theme={theme}>
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
