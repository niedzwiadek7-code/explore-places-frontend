import { Stack } from 'expo-router'

export default function LoginLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Zaloguj się'
        }}
      />
      <Stack.Screen
        name="emailLogin"
        options={{
          title: 'Logowanie przez email',
          presentation: 'modal'
        }}
      />
      <Stack.Screen
        name="emailRegister"
        options={{
          title: 'Rejestracja przez email',
          presentation: 'modal'
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
}
