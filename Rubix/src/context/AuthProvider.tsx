import { ReactNode, createContext, useState } from "react";

interface AuthContextType {
  auth: {
    accessToken: string;
    refreshToken: string;
  };
  setAuth: React.Dispatch<
    React.SetStateAction<{
      accessToken: string;
      refreshToken: string;
    }>
  >;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<{ accessToken: string; refreshToken: string }>({
    accessToken: "",
    refreshToken: ""
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
