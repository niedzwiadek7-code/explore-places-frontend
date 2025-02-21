import React from 'react'
import { View } from 'react-native'
import { Text, IconButton } from 'react-native-paper'
import { Controller, RegisterOptions } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '@/context/theme/Theme'

type StarRatingInputProps = {
  label?: string
  control?: any
  name: string
  required?: boolean
  size: number
  defaultValue?: number
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({
  label,
  control,
  name,
  required,
  size,
  defaultValue,

}) => {
  const rulesObj: RegisterOptions = {}
  const { t } = useTranslation('translation', { keyPrefix: 'star_rating' })

  if (required) {
    rulesObj.required = t('required')
  }

  const { theme } = useThemeContext()

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Controller
        name={name}
        control={control}
        rules={rulesObj}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <>
            {
              label && (
                <Text>
                  {label}
                </Text>
              )
            }

            {Array.from({ length: 5 }, (_, index) => (
              <IconButton
                key={index}
                icon={index < field.value ? 'star' : 'star-outline'}
                size={size}
                iconColor={theme.colors.secondary}
                onPress={() => field.onChange(index + 1)}
                style={{
                  margin: -6,
                  padding: -6,
                }}
              />
            ))}

            {error && (
              <Text
                style={{
                  color: theme.colors.error,
                  fontSize: 12,
                }}
              >
                {error.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  )
}

export default StarRatingInput
