import React, {
  createContext, ReactNode, useContext, useEffect, useMemo, useState,
} from 'react'
import Storage from '@/services/storage/Storage'
import { AuthSingleton } from '@/services/auth/AuthSingleton'
import LoadingView from '@/components/UI/LoadingView'
import { ApiBackendSingleton } from '@/services/ApiService/Singleton'

class AuthClass {
  token: string | null

  sessionId: string | null

  authenticated: boolean

  login: (sessionId: string) => Promise<void>

  logout: () => Promise<void>

  constructor(
    token: (string | null) = null,
    sessionId: (string | null) = null,
    authenticated: boolean = false,
    login: (sessionIdLoc: string) => Promise<void> = async () => {},
    logout: () => Promise<void> = async () => {},
  ) {
    this.token = token
    this.sessionId = sessionId
    this.authenticated = authenticated
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
  const [isLoading, setIsLoading] = useState(true)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [authenticated, setAuthenticated] = useState(false)

  const isAuthenticatedFn = async (sessionIdTmp?: string): Promise<boolean> => {
    if (!sessionIdTmp) {
      return false
    }

    const sessionResult = await AuthSingleton.getInstance().getSessionDetails()
    return sessionResult.status === 'SUCCESS'
  }

  const login = async (sessionIdLoc: string) => {
    setIsLoading(true)
    ApiBackendSingleton.setSessionId(sessionIdLoc)
    await Storage.setItem('sessionId', sessionIdLoc)
    setSessionId(sessionIdLoc)

    const isAuthenticated = await isAuthenticatedFn(sessionIdLoc)
    setAuthenticated(isAuthenticated)
    setIsLoading(false)
  }

  const logout = async () => {
    setIsLoading(true)
    ApiBackendSingleton.setSessionId()
    await Storage.removeItem('sessionId')
    setSessionId(null)
    setAuthenticated(false)
    setIsLoading(false)
  }

  useEffect(() => {
    const getConfig = async () => {
      const result = await AuthSingleton.getInstance().config()
      setToken(result.csrfToken)
      ApiBackendSingleton.setToken(result.csrfToken)

      const sessionIdTmp = await Storage.getItem('sessionId')
      if (sessionIdTmp) {
        await login(sessionIdTmp)
      }
      setIsLoading(false)
    }

    getConfig()
  }, [])

  const value = useMemo(
    () => new AuthClass(token, sessionId, authenticated, login, logout),
    [token, sessionId, authenticated],
  )

  if (isLoading) {
    return <LoadingView />
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
