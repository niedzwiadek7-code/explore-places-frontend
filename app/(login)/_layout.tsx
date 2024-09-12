import React, { useEffect, useState } from 'react'
import { Stack } from 'expo-router'
import useCustomRouter from '@/hooks/useRouter/useRouter'
import { AuthSingleton } from '@/services/auth/AuthSingleton'
import LoadingView from '@/components/UI/LoadingView'

const LoginLayout = () => {
  const { router, sessionId } = useCustomRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleLoginUser = async () => {
      setLoading(true)
      if (sessionId) {
        const sessionResult = await AuthSingleton.getInstance().getSessionDetails()
        if (sessionResult.status === 'SUCCESS') {
          router.replace({
            pathname: '(home)/home',
          })
        }
      }
      setLoading(false)
    }

    handleLoginUser()
  }, [sessionId, router])

  if (loading) {
    return <LoadingView />
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="emailLogin"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="emailRegister"
        options={{
          headerShown: false,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="confirm"
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  )
}

export default LoginLayout
