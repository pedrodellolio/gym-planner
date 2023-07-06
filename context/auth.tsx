import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import {
  useNavigation,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

interface AuthContextData {
  user: FirebaseAuthTypes.User | null;
  isLoading: boolean;
  signIn(email: string, password: string): void;
  // signInWithGoogle(): Promise<FirebaseAuthTypes.UserCredential>;
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
    console.log("oi");
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
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useProtectedRoute(user);

  // GoogleSignin.configure({
  //   webClientId:
  //     "697304861348-h076avahdlq7hqp8q3qb1ppl24ll7705.apps.googleusercontent.com",
  // });

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (isLoading) setIsLoading(false);
    //
    // const inAuthGroup = segments[0] === "(auth)";
    // console.log(segments);
    // if (!user && !inAuthGroup) {
    //   console.log("not logged");
    //   router.replace("/signIn"); // Redirect to the sign-in page.
    // } else if (user && inAuthGroup) {
    //   console.log("logged in");
    //   router.replace("/"); // Redirect away from the sign-in page.
    // }
  }

  // console.log(user);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  function signIn(email: string, password: string) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((credentials) => {
        console.log(`User logged in!`);
      })
      .catch((err) => console.log(err));
  }

  // async function signInWithGoogle() {
  //   await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  //   // Get the users ID token
  //   const { idToken } = await GoogleSignin.signIn();

  //   // Create a Google credential with the token
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(googleCredential);
  //   // GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
  //   //   .then(() => {
  //   //     GoogleSignin.signIn();
  //   //   })
  //   //   .then(({idToken} :) => {
  //   //     const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //   //     return auth().signInWithCredential(googleCredential);
  //   //   });
  // }

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
        // signInWithGoogle,
        signUp,
        signOut,
      }}
    >
      {isLoading ? null : children}
    </AuthContext.Provider>
  );
}
