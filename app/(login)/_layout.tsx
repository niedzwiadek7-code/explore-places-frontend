import React, { useEffect } from 'react'
import { Stack } from 'expo-router'
import useCustomRouter from '@/hooks/useRouter/useRouter'

const LoginLayout = () => {
  const { router, authenticated, isMounted } = useCustomRouter()

  useEffect(() => {
    if (isMounted && authenticated) {
      router.replace({
        pathname: '(home)/home',
      })
    }
  }, [authenticated, isMounted, router])

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
