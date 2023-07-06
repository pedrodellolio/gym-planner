import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  useNavigation,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";

interface AuthContextData {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  signIn(email: string, password: string): void;
  signUp(email: string, password: string, name?: string): void;
  signOut(): void;
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
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;
    const inAuthGroup = segments[0] === "(auth)";

    if (!user && !inAuthGroup) {
      // Redirect to the sign-in page.
      router.replace("/signIn");
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [user, segments, navigationState?.key]);
}

export function Provider({ children }: Props) {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useProtectedRoute(user);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (isLoading) setIsLoading(false);
  }

  console.log(user);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function signIn(email: string, password: string) {
    console.log("logging in");
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((credentials) => {
        console.log(`User logged in!`);
      })
      .catch((err) => console.log(err));
  }

  function signUp(email: string, password: string, name?: string) {
    console.log("creating account");
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        console.log(`${credentials.user.email.split("@")[0]} created!`);
      })
      .catch((err) => console.log(err));
  }

  function signOut() {
    auth()
      .signOut()
      .then(() => console.log("logged out!"));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
}
