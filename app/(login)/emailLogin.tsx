import { ImageBackground, View } from 'react-native'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
  Button, HelperText, Text, TextInput, useTheme,
} from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useToast } from 'react-native-paper-toast'
import { AuthSingleton } from '@/services/auth/AuthSingleton'
import useCustomRouter from '@/hooks/useRouter/useRouter'
import LoadingButton from '@/components/UI/LoadingButton'
import themeBackground from '@/assets/images/theme/primary.jpg'
import { ApiBackendSingleton } from '@/services/ApiService/Singleton'
import { useAuth } from '@/context/auth/Auth'

type FormData = {
  email: string
  password?: string
}

type Params = {
  email: string | undefined
}

const LoginPage = () => {
  const [isPasswordLogin, setIsPasswordLogin] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<FormData>({
    mode: 'onChange',
  })

  const { t } = useTranslation('translation', { keyPrefix: 'email_login' })

  const {
    router,
    params: { email },
  } = useCustomRouter<Params>()

  const { login } = useAuth()

  useEffect(() => {
    if (email) {
      setError('email', {
        type: 'manual',
        message: t('duplicate_email'),
      })
    }
  }, [email])

  const theme = useTheme()
  const toast = useToast()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (isPasswordLogin) {
        const response = await AuthSingleton.getInstance().loginWithPassword(data.email, data.password || '')
        if (response.status === 'SUCCESS') {
          if (response.sessionId) {
            await login(response.sessionId)
          }
        } else if (response.status === 'INCORRECT_CREDENTIALS') {
          setError('password', {
            type: 'manual',
            message: t('invalid_password'),
          })
        } else {
          toast.show({
            message: t('backend_error'),
            type: 'error',
          })
        }
      } else {
        const response = await AuthSingleton.getInstance().sendCode(data.email)
        if (response.status === 'SUCCESS') {
          router.navigate({
            pathname: '/confirm',
            params: {
              email: data.email,
            },
          })

          if (response.sessionId) {
            login(response.sessionId)
          }
        } else {
          toast.show({
            message: t('backend_error'),
            type: 'error',
          })
        }
      }
    } catch (err) {
      console.log(err)
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
        <Text
          variant="titleLarge"
          style={{
            textAlign: 'center',
            marginBottom: 15,
          }}
        >
          {t('login')}
        </Text>
        <View
          style={{
            marginBottom: 10,
            gap: 5,
          }}
        >
          <View>
            <Controller
              name="email"
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
                  defaultValue={email}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={Boolean(errors.email?.message)}
                />
              )}
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

          {isPasswordLogin && (
            <View>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: t('required_password'),
                  },
                }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    label={t('password')}
                    mode="flat"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={Boolean(errors.password?.message)}
                  />
                )}
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
          )}
        </View>

        <View
          style={{
            gap: 10,
          }}
        >
          <LoadingButton>
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
            >
              {t('login')}
            </Button>
          </LoadingButton>

          <Button
            mode="contained-tonal"
            onPress={() => {
              setIsPasswordLogin((prev) => !prev)
              setValue('password', '')
            }}
          >
            {isPasswordLogin ? t('use_verification_code') : t('use_password')}
          </Button>
        </View>

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
            marginTop: 15,
          }}
        >
          {t('change_method')}
        </Button>
      </View>
    </ImageBackground>
  )
}

export default LoginPage
