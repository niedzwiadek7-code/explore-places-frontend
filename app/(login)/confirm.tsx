import { View, Platform } from 'react-native'
import {
  Button, Text, TextInput, useTheme,
} from 'react-native-paper'
import {
  CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useToast } from 'react-native-paper-toast'
import { useAuth } from '@/context/auth/Auth'
import useCustomRouter from '@/hooks/useRouter/useRouter'
import LoadingButton from '@/components/UI/LoadingButton'

const CELL_COUNT = 6

type FormData = {
  code: string
}

type Params = {
  email: string
}

const LocalCodeField = (
  localValue: string,
  onChange: () => void,
  onBlur: () => void,
) => {
  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })

  const getAutoCompleteType = (): 'sms-otp' | 'one-time-code' => {
    if (Platform.OS === 'android') {
      return 'sms-otp'
    }
    return 'one-time-code'
  }

  const [{ onPressOut }, getCellOnLayoutHandler] = useClearByFocusCell({
    value: localValue,
    setValue,
  })

  const theme = useTheme()

  return (
    <CodeField
      ref={ref}
      onPressOut={onPressOut}
      value={localValue}
      onChangeText={onChange}
      onBlur={onBlur}
      cellCount={CELL_COUNT}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      autoComplete={getAutoCompleteType()}
      renderCell={({ index, symbol, isFocused }) => (
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
            isFocused && { borderColor: theme.colors.primary },
          ]}
          onLayout={getCellOnLayoutHandler(index)}
        >
          {symbol || (isFocused ? <Cursor /> : null)}
        </TextInput>
      )}
    />
  )
}

const ConfirmPage = () => {
  const {
    router,
    params: { email },
  } = useCustomRouter<Params>()
  const toaster = useToast()

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
      router.replace({
        pathname: '(home)/home',
        params: {
          email: email || '',
        },
      })
    } catch (err) {
      // console.log(err)
    }
  }

  const {
    control,
    handleSubmit,
  } = useForm<FormData>()

  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        padding: 30,
        justifyContent: 'center',
        gap: 20,
      }}
    >
      <Text
        variant="titleLarge"
        style={{
          textAlign: 'center',
        }}
      >
        {' '}
        Kod weryfikacyjny
        {' '}
      </Text>

      <Text
        style={{
          textAlign: 'center',
        }}
      >
        {' '}
        Wprowadź kod weryfikacyjny, który otrzymałeś na email:
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
          required: true,
        }}
        name="code"
        render={(
          { field: { value: localValue, onChange, onBlur } },
        ) => LocalCodeField(localValue, onChange, onBlur)}
      />

      <LoadingButton>
        <Button
          mode="contained"
          onPress={handleSubmit(onSubmit)}
        >
          Zaloguj się
        </Button>
      </LoadingButton>
    </View>
  )
}

export default ConfirmPage
