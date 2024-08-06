import React from 'react'
import { ImageBackground, View } from 'react-native'
import { Button } from 'react-native-paper'
import useCustomRouter from '@/hooks/useRouter/useRouter'
import themeBackground from '@/assets/images/theme/primary.jpg'

const LoginPage = () => {
  const { router } = useCustomRouter()

  return (
    <ImageBackground
      source={themeBackground}
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
      imageStyle={{
        opacity: 0.7,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 30,
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
    </ImageBackground>

  )
}

export default LoginPage
