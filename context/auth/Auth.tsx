import React, {
  createContext, ReactNode, useContext, useEffect, useMemo, useState,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthSingleton } from '@/services/auth/AuthSingleton'
import LoadingView from '@/components/UI/LoadingView'
import { ApiBackendSingleton } from '@/services/ApiService/Singleton'

class AuthClass {
  token: string | null

  sessionId: string | null

  constructor(
    token: (string | null) = null,
    sessionId: (string | null) = null,
  ) {
    this.token = token
    this.sessionId = sessionId
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

  useEffect(() => {
    const getConfig = async () => {
      const result = await AuthSingleton.getInstance().config()
      setToken(result.csrfToken)
      ApiBackendSingleton.setToken(result.csrfToken)

      const sessionIdTmp = await AsyncStorage.getItem('sessionId')
      if (sessionIdTmp) {
        setSessionId(sessionIdTmp)
        ApiBackendSingleton.setSessionId(sessionIdTmp)
      }
      setIsLoading(false)
    }

    getConfig()
  }, [])

  const value = useMemo(
    () => new AuthClass(token, sessionId),
    [token, sessionId],
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
