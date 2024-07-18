import React, {
  createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState,
} from 'react'
import * as SecureStore from 'expo-secure-store'
import { AuthSingleton } from '@/services/auth/AuthSingleton'

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

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      // setIsLoading(true);
      const tokenTemp = await SecureStore.getItemAsync('token')

      if (tokenTemp) {
        setToken(tokenTemp)
      }
      // setIsLoading(false);
    }

    loadToken()
  }, [])

  const emailLogin = async (email: string, code: string) => {
    const response = await AuthSingleton.getInstance().verifyEmail(email, code)
    setToken(response.access)
  }

  const login = useCallback(async (params: LoginParams) => {
    switch (params.type) {
      case 'email':
        await emailLogin(params.email, params.code)
        break
      default:
        break
    }
  }, [])

  const logout = async (type: LogoutType) => {
    switch (type) {
      case 'email':
        setToken(null)
        break
      default:
        break
    }
  }

  const value = useMemo(
    () => new AuthClass(token, login, logout),
    [token, login],
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
