import { ImageBackground, View } from 'react-native'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import {
  Button, Text, TextInput, useTheme,
} from 'react-native-paper'
import React from 'react'
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
              To pole jest wymagane
            </Text>
          )}
        </View>

        <LoadingButton>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
          >
            Zarejestruj się
          </Button>
        </LoadingButton>

        <Text
          style={{
            marginTop: 20,
            textAlign: 'center',
            color: theme.colors.secondary,
          }}
        >
          Masz konto?
        </Text>

        <Button
          mode="elevated"
          onPress={() => router.push('/emailLogin')}
          style={{
            marginTop: 5,
          }}
        >
          Zaloguj się
        </Button>

        <Button
          mode="outlined"
          onPress={() => router.navigate('/')}
          style={{
            marginTop: 25,
          }}
        >
          Zmień metodę logowania
        </Button>
      </View>
    </ImageBackground>
  )
}

export default RegisterPage
