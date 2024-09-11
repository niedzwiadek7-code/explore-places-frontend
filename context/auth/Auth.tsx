import React, {
  createContext, ReactNode, useContext, useEffect, useMemo, useState,
} from 'react'
import { AuthSingleton } from '@/services/auth/AuthSingleton'
import LoadingView from '@/components/UI/LoadingView'
import { ApiBackendSingleton } from '@/services/ApiService/Singleton'

class AuthClass {
  token: string | null

  constructor(
    token: (string | null) = null,
  ) {
    this.token = token
  }
}

const AuthContext = createContext<AuthClass>(new AuthClass())

type ProviderProps = {
  children: ReactNode,
}

export const AuthProvider: React.FC<ProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getConfig = async () => {
      const result = await AuthSingleton.getInstance().config()
      setToken(result.csrfToken)
      ApiBackendSingleton.setToken(result.csrfToken)
      setIsLoading(false)
    }

    getConfig()
  }, [])

  const value = useMemo(
    () => new AuthClass(token),
    [token],
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
