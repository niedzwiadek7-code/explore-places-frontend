import { useLocalSearchParams, useRouter } from 'expo-router'
import { ExpoRouter } from 'expo-router/types/expo-router'
import { useAuth } from '@/context/auth/Auth'

interface ReactHookResult<
  Params = Record<string, string>,
> {
  params: Params
  router: ExpoRouter.Router,
  token: string | null,
  sessionId: string | null,
}

const useCustomRouter = <Params>(): ReactHookResult<Params> => {
  const params: Params = useLocalSearchParams() as Params
  const router = useRouter()
  const { token, sessionId } = useAuth()

  return {
    params,
    router,
    token,
    sessionId,
  }
}

export default useCustomRouter
