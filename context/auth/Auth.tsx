import React, {
  createContext, ReactNode, useContext, useEffect, useMemo, useState,
} from 'react'
import * as SecureStore from 'expo-secure-store'
import {AuthSingleton} from "@/services/auth/Auth";

type LoginParams =
  | { type: 'email'; email: string; code: string; }

type LogoutType = 'email'

class AuthClass {
  token: string | null

  login: (params: LoginParams) => Promise<void>

  logout: (type: LogoutType) => Promise<void>

  constructor(
    token: (string | null) = null,
    login: (params: LoginParams) => Promise<void> = async () => {},
    logout: (type: LogoutType) => Promise<void> = async () => {},
  ) {
    this.token = token
    this.login = login
    this.logout = logout
  }
}

const AuthContext = createContext<AuthClass>(new AuthClass())

type ProviderProps = {
  children: ReactNode,
}

export const AuthProvider: React.FC<ProviderProps> = (props) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      setIsLoading(true);
      const token = await SecureStore.getItemAsync('token');

      if (token) {
        setToken(token);
      }
      setIsLoading(false);
    }

    loadToken();
  }, []);

  const login = async (params: LoginParams) => {
    switch (params.type) {
      case 'email':
        const response = await AuthSingleton.getInstance().verifyEmail(params.email, params.code);
        setToken(response.access);
        break;
    }
  }

  const logout = async (type: LogoutType) => {
    switch (type) {
      case 'email':
        setToken(null);
        break;
    }
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext)
