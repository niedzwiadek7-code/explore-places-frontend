import React from 'react'
import { ImageBackground, View } from 'react-native'
import { Button } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import useCustomRouter from '@/hooks/useRouter/useRouter'
import themeBackground from '@/assets/images/theme/primary.jpg'

const LoginPage = () => {
  const { router } = useCustomRouter()
  const { t } = useTranslation('translation', { keyPrefix: 'login_select' })

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
          {t('email_login')}
        </Button>
      </View>
    </ImageBackground>

  )
}

export default LoginPage
