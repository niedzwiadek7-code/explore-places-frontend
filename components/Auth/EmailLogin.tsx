import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {Button, Card, Text, TextInput, useTheme} from "react-native-paper";
import React from "react";
import {View} from "react-native";

type FormData = {
  email: string
}

export default function EmailLogin() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const theme = useTheme()

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data)
  }

  return (
    <View>
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
        Zaloguj się
      </Button>

      <Text
        style={{
          marginTop: 20,
          textAlign: 'center',
          color: theme.colors.secondary
        }}
      >
        Nie masz konta?
      </Text>
      <Button
        mode="outlined"
        style={{
          marginTop: 5
        }}
      >
        Zarejestruj się
      </Button>
    </View>
  )
}
