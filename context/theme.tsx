import { createContext, useContext } from "react";
import { useColorScheme } from "react-native";
import Colors from "../constants/Colors";

interface ThemeContextData {
  theme: any;
  colorScheme: string;
}

interface Props {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);
// const AuthContext = createContext<any>({} as any);

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: Props) {
  const colorScheme = useColorScheme();
  // const theme = Colors[colorScheme === "dark" ? "dark" : "light"];
  const theme = Colors["light"];
  return (
    <ThemeContext.Provider value={{ theme, colorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
