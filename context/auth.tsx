import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useNavigation, useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContextData {
  user: FirebaseAuthTypes.User | null;
  signOut(): void;
  signIn(): void;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);
// const AuthContext = createContext<any>({} as any);

export function useAuth() {
  return useContext(AuthContext);
}

function useProtectedRoute(user: FirebaseAuthTypes.User | null) {
  const segments = useSegments();
  const router = useRouter();
  const nav = useNavigation();

  useEffect(() => {
    console.log(user);
    const inAuthGroup = segments[0] === "(auth)";

    // if (user === undefined) return;

    if (!user && !inAuthGroup) {
      console.log("1");
      // Redirect to the sign-in page.
      router.replace("/signIn");
    } else if (user && inAuthGroup) {
      console.log("2");
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments]);
}

export function Provider({ children }: Props) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(
    {} as FirebaseAuthTypes.User
  );

  useProtectedRoute(user);

  function signOut() {
    console.log("logging out");
    setUser(null);
  }

  function signIn() {
    console.log("logging in");
    setUser({} as FirebaseAuthTypes.User);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signOut,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
