import { useLocalSearchParams, useRootNavigationState, useRouter } from 'expo-router'
import { ExpoRouter } from 'expo-router/types/expo-router'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth/Auth'

interface ReactHookResult<
  Params = Record<string, string>,
> {
  params: Params
  router: ExpoRouter.Router,
  token: string | null,
  sessionId: string | null,
  authenticated: boolean,
  isMounted: boolean
}

const useCustomRouter = <Params>(): ReactHookResult<Params> => {
  const params: Params = useLocalSearchParams() as Params
  const router = useRouter()
  const { token, sessionId, authenticated } = useAuth()
  const [isMounted, setIsMounted] = useState(false)

  const rootNavigationState = useRootNavigationState()

  useEffect(() => {
    if (!rootNavigationState?.key) {
      setIsMounted(false)
    } else {
      setIsMounted(true)
    }
  }, [rootNavigationState?.key])

  return {
    isMounted,
    params,
    router,
    token,
    sessionId,
    authenticated,
  }
}

export default useCustomRouter
