import { View, Platform, ImageBackground } from 'react-native'
import {
  Button, HelperText, Text, TextInput, useTheme,
} from 'react-native-paper'
import {
  CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import React, { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
// import { useToast } from 'react-native-paper-toast'
import { useTranslation } from 'react-i18next'
import { useToast } from 'react-native-paper-toast'
import { useAuth } from '@/context/auth/Auth'
import useCustomRouter from '@/hooks/useRouter/useRouter'
import LoadingButton from '@/components/UI/LoadingButton'
import themeBackground from '@/assets/images/theme/primary.jpg'
import { AuthSingleton } from '@/services/auth/AuthSingleton'
import { ApiBackendSingleton } from '@/services/ApiService/Singleton'

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
      keyboardType="ascii-capable"
      textContentType="oneTimeCode"
      autoComplete={getAutoCompleteType()}
      renderCell={({ index, symbol, isFocused }) => (
        // TODO: improve cells style (bottom border)
        <TextInput
          key={index}
          mode="flat"
          style={[
            {
              width: 40,
              height: 40,
              backgroundColor: '#FFFFFF',
              borderColor: 'white',
              // borderWidth: 1,
            },
            isFocused && {
              borderColor: theme.colors.primary,
              borderWidth: 2,
            },
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
  const { t } = useTranslation('translation', { keyPrefix: 'login_confirm' })
  const toast = useToast()

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await AuthSingleton.getInstance().verifyEmail(data.code)
      if (response.status === 'SUCCESS') {
        router.replace({
          pathname: '(home)/home',
        })

        if (response.sessionId) {
          ApiBackendSingleton.setSessionId(response.sessionId)
        }
        return
      }
      if (response.status === 'INCORRECT_CODE') {
        setError('code', {
          type: 'manual',
          message: t('incorrect_code'),
        })
      }
      if (response.status === 'ERROR') {
        toast.show({
          message: t('backend_error'),
          type: 'error',
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
          {t('verification_code')}
        </Text>

        <Text
          style={{
            textAlign: 'center',
          }}
        >
          {t('enter_verification_code')}
        </Text>

        <Text
          style={{
            textAlign: 'center',
          }}
        >
          {email}
        </Text>

        <View>
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

          {
            errors.code?.message && (
              <HelperText type="error">
                {errors.code.message}
              </HelperText>
            )
          }
        </View>

        <LoadingButton>
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
          >
            {t('submit')}
          </Button>
        </LoadingButton>
      </View>
    </ImageBackground>
  )
}

export default ConfirmPage
