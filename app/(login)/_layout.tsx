import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import useCustomRouter from '@/hooks/useRouter/useRouter'
import { AuthSingleton } from '@/services/auth/AuthSingleton'

const LoginLayout = () => {
  const { router, sessionId } = useCustomRouter()

  useEffect(() => {
    const handleLoginUser = async () => {
      if (sessionId) {
        const sessionResult = await AuthSingleton.getInstance().getSessionDetails()
        if (sessionResult.status === 'SUCCESS') {
          router.replace({
            pathname: '(home)/home',
          })
        }
      }
    }

    handleLoginUser()
  }, [sessionId, router])

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
