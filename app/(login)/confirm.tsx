import {View, StyleSheet, Platform} from "react-native";
import {Button, Text, TextInput, useTheme} from "react-native-paper";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import React, {useState} from "react";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useToast} from "react-native-paper-toast";
import {useAuth} from "@/context/auth/Auth";
import useCustomRouter from "@/hooks/useRouter/useRouter";

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    borderColor: '#FF0000',
  },
});

const CELL_COUNT = 6;

type FormData = {
  code: string
}

type Params = {
  email: string
}

export default function ConfirmPage () {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const {
    router,
    params: { email }
  } = useCustomRouter<Params>()
  const toaster = useToast()
  const theme = useTheme()
  const { login } = useAuth()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await login({
        type: 'email',
        email: email || '',
        code: data.code,
      })
      toaster.show({
        message: 'Zalogowano pomyślnie',
        type: 'success',
      })
      router.navigate({
        pathname: '(home)',
        params: {
          email: email || ''
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const getAutoCompleteType = (): 'sms-otp' | 'one-time-code' => {
    if (Platform.OS === 'android') {
      return 'sms-otp'
    } else {
      return 'one-time-code'
    }
  }

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        gap: 20
      }}
    >
      <Text
        variant="titleLarge"
        style={{
          textAlign: 'center',
        }}
      > Kod weryfikacyjny </Text>

      <Text
        style={{
          textAlign: 'center',
        }}
      > Wprowadź kod weryfikacyjny, który otrzymałeś na email:
      </Text>

      <Text
        style={{
          textAlign: 'center',
        }}
        >
        {email}
      </Text>

      <Controller
        control={control}
        rules={{
          required: true
        }}
        name="code"
        render={({ field: { value, onChange, onBlur } }) => {
          const [props, getCellOnLayoutHandler] = useClearByFocusCell({
            value,
            setValue,
          });

          return (
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              cellCount={CELL_COUNT}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete={getAutoCompleteType()}
              renderCell={({index, symbol, isFocused}) => (
                // TODO: improve cells style (bottom border)
                <TextInput
                  key={index}
                  style={[
                    {
                      width: 40,
                      height: 40,
                      backgroundColor: '#FFFFFF',
                      borderColor: 'white',
                      borderWidth: 2,
                    },
                    isFocused && {borderColor: theme.colors.primary},
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor/> : null)}
                </TextInput>
              )}
            />
          )}}
        />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
      >
        Zaloguj się
      </Button>
    </View>
  )
}
