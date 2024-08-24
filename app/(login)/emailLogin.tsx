import { ImageBackground, View } from 'react-native'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
  Button, Text, TextInput, useTheme,
} from 'react-native-paper'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { AuthSingleton } from '@/services/auth/AuthSingleton'
import useCustomRouter from '@/hooks/useRouter/useRouter'
import LoadingButton from '@/components/UI/LoadingButton'
import themeBackground from '@/assets/images/theme/primary.jpg'

type FormData = {
  email: string
}

const LoginPage = () => {
  const { router } = useCustomRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  const { t } = useTranslation('translation', { keyPrefix: 'email_login' })

  const theme = useTheme()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await AuthSingleton.getInstance().sendEmail(data.email)
      router.navigate({
        pathname: '/confirm',
        params: {
          email: data.email,
        },
      })
    } catch (err) {
      // console.log(err)
    }
  }

  return (
    <ImageBackground
      source={themeBackground}
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
      imageStyle={{
        objectFit: 'cover',
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
        <View
          style={{
            marginBottom: 10,
          }}
        >
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                label="Email"
                mode="outlined"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
            name="email"
          />
          {errors.email && (
          <Text
            style={{
              color: 'red',
              marginTop: 5,
            }}
          >
            {t('required_field')}
          </Text>
          )}
        </View>

        <LoadingButton>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
          >
            {t('login')}
          </Button>
        </LoadingButton>

        <Text
          style={{
            marginTop: 20,
            textAlign: 'center',
            color: theme.colors.secondary,
          }}
        >
          {t('no_account')}
        </Text>

        <Button
          mode="elevated"
          onPress={() => router.push('/emailRegister')}
          style={{
            marginTop: 5,
          }}
        >
          {t('register')}
        </Button>

        <Button
          mode="outlined"
          onPress={() => router.navigate('/')}
          style={{
            marginTop: 25,
          }}
        >
          {t('change_method')}
        </Button>
      </View>
    </ImageBackground>
  )
}

export default LoginPage
