import { ImageBackground, View } from 'react-native'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
  Button, Text, TextInput, useTheme,
} from 'react-native-paper'
import React from 'react'
import { useTranslation } from 'react-i18next'
import useCustomRouter from '@/hooks/useRouter/useRouter'
import { AuthSingleton } from '@/services/auth/AuthSingleton'
import LoadingButton from '@/components/UI/LoadingButton'
import themeBackground from '@/assets/images/theme/primary.jpg'

type FormData = {
  email: string
}

const RegisterPage = () => {
  const { router } = useCustomRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const theme = useTheme()
  const { t } = useTranslation('translation', { keyPrefix: 'email_register' })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await AuthSingleton.getInstance().createProfile(data.email)
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
            marginTop: 25,
          }}
        >
          {t('change_method')}
        </Button>
      </View>
    </ImageBackground>
  )
}

export default RegisterPage
