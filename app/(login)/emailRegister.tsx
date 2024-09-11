import { ImageBackground, View } from 'react-native'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
  Button, HelperText, Text, TextInput, useTheme,
} from 'react-native-paper'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useCustomRouter from '@/hooks/useRouter/useRouter'
import { AuthSingleton } from '@/services/auth/AuthSingleton'
import LoadingButton from '@/components/UI/LoadingButton'
import themeBackground from '@/assets/images/theme/primary.jpg'
import { ApiBackendSingleton } from '@/services/ApiService/Singleton'

type FormData = {
  email: string,
  password: string,
}

const RegisterPage = () => {
  const { router } = useCustomRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  })

  const theme = useTheme()
  const { t } = useTranslation('translation', { keyPrefix: 'email_register' })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await AuthSingleton.getInstance().createProfile(
        data.email,
        data.password,
      )
      if (response.status === 'SUCCESS') {
        router.replace({
          pathname: '(home)/home',
          params: {
            email: data.email || '',
          },
        })

        if (response.sessionId) {
          ApiBackendSingleton.setSessionId(response.sessionId)
        }
        return
      }
      if (response.status === 'EMAIL_TAKEN') {
        router.replace({
          pathname: '(login)/emailLogin',
          params: {
            email: data.email || '',
          },
        })
      }
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
        opacity: 0.7,
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 30,
          justifyContent: 'center',
        }}
      >
        <Text
          variant="titleLarge"
          style={{
            textAlign: 'center',
            marginBottom: 15,
          }}
        >
          {t('register')}
        </Text>

        <View
          style={{
            marginBottom: 10,
            gap: 5,
          }}
        >
          <View>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: t('required_field'),
                },
                validate: (value) => {
                  if (!value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
                    return t('invalid_email')
                  }
                  return true
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  label="Email"
                  mode="flat"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={Boolean(errors.email?.message)}
                />
              )}
              name="email"
            />
            {
              errors.email?.message && (
                <HelperText
                  type="error"
                  visible={Boolean(errors.email?.message)}
                >
                  {errors.email?.message}
                </HelperText>
              )
            }
          </View>

          <View>
            <Controller
              control={control}
              rules={{
                required: {
                  value: true,
                  message: t('required_field'),
                },
                minLength: {
                  value: 8,
                  message: t('password_length'),
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  label={t('password')}
                  mode="flat"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry
                  error={Boolean(errors.password?.message)}
                />
              )}
              name="password"
            />
            {
              errors.password?.message && (
                <HelperText
                  type="error"
                  visible={Boolean(errors.password?.message)}
                >
                  {errors.password?.message}
                </HelperText>
              )
            }
          </View>
        </View>

        <LoadingButton>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
          >
            {t('register')}
          </Button>
        </LoadingButton>

        <Text
          style={{
            marginTop: 20,
            textAlign: 'center',
            color: theme.colors.secondary,
          }}
        >
          {t('already_account')}
        </Text>

        <Button
          mode="elevated"
          onPress={() => router.push('/emailLogin')}
          style={{
            marginTop: 5,
          }}
        >
          {t('login')}
        </Button>

        <Button
          mode="outlined"
          onPress={() => router.navigate('/')}
          style={{
            marginTop: 15,
          }}
        >
          {t('change_method')}
        </Button>
      </View>
    </ImageBackground>
  )
}

export default RegisterPage
