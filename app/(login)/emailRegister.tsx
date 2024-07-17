import { View } from "react-native";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button, Text, TextInput, useTheme} from "react-native-paper";
import React from "react";
import {useRouter} from "expo-router";
import {Auth, AuthSingleton} from "@/services/auth/Auth";

type FormData = {
  email: string
}

export default function LoginPage () {
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const theme = useTheme()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await AuthSingleton.getInstance().createProfile(data.email)
      await AuthSingleton.getInstance().sendEmail(data.email)
      router.navigate({
        pathname: '/confirm',
        params: {
          email: data.email
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 30,
        justifyContent: 'center'
      }}
    >
      <View
        style={{
          marginBottom: 10
        }}
      >
        <Controller
          control={control}
          rules={{
            required: true
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
              marginTop: 5
            }}
          >
            To pole jest wymagane
          </Text>
        )}
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
      >
        Zarejestruj się
      </Button>

      <Text
        style={{
          marginTop: 20,
          textAlign: 'center',
          color: theme.colors.secondary
        }}
      >
        Masz konto?
      </Text>

      <Button
        mode="elevated"
        onPress={() => router.push('/emailLogin')}
        style={{
          marginTop: 5
        }}
      >
        Zaloguj się
      </Button>

      <Button
        mode="outlined"
        onPress={() => router.navigate('/')}
        style={{
          marginTop: 25
        }}
      >
        Zmień metodę logowania
      </Button>
    </View>
  )
}
