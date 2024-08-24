import React from 'react'
import { Stack } from 'expo-router'

const LoginLayout = () => (
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

export default LoginLayout
