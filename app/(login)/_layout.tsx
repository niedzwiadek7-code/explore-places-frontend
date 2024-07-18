import React from 'react'
import { Stack } from 'expo-router'

const LoginLayout = () => (
  <Stack>
    <Stack.Screen
      name="index"
      options={{
        title: 'Zaloguj się',
      }}
    />
    <Stack.Screen
      name="emailLogin"
      options={{
        title: 'Logowanie przez email',
        presentation: 'modal',
      }}
    />
    <Stack.Screen
      name="emailRegister"
      options={{
        title: 'Rejestracja przez email',
        presentation: 'modal',
      }}
    />
    <Stack.Screen
      name="confirm"
      options={{
        title: 'Oczekiwanie na potwierdzenie',
        presentation: 'modal',
      }}
    />
  </Stack>
)

export default LoginLayout
