import React from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'
import useCustomRouter from '@/hooks/useRouter/useRouter'

const LoginPage = () => {
  const { router } = useCustomRouter()

  return (
    <View
      style={{
        flex: 1,
        padding: 30,
        justifyContent: 'center',
      }}
    >
      <Button
        icon="email"
        mode="contained"
        onPress={() => router.push('/emailLogin')}
      >
        Zaloguj się przez email
      </Button>
    </View>
  )
}

export default LoginPage