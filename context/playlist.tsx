import { createContext, useContext } from "react";

interface PlaylistContextData {}

interface Props {
  children: React.ReactNode;
}

const PlaylistContext = createContext<PlaylistContextData>(
  {} as PlaylistContextData
);
// const AuthContext = createContext<any>({} as any);

export function useAuth() {
  return useContext(PlaylistContext);
}

export function Provider({ children }: Props) {
  return (
    <PlaylistContext.Provider value={{}}>{children}</PlaylistContext.Provider>
  );
}
