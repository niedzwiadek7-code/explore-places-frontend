import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import { View } from 'react-native'
import {
  Icon, IconButton, Text, FAB,
} from 'react-native-paper'
import { CommentModel } from '@/models'
import { useThemeContext } from '@/context/theme/Theme'
import { ActivitiesSingleton } from '@/services/activities/ActivitiesSingleton'
import TextArea from '@/components/UI/TextArea'
import StarRatingInput from '@/components/UI/StarRatingInput'

type Props = {
  onComment: (comment: CommentModel) => void
  activityId: number
}

type FormData = {
  comment: string
  activityId: number
  rating: number
}

const InputComment: React.FC<Props> = ({ onComment, activityId }) => {
  const { theme } = useThemeContext()
  const { t } = useTranslation('translation', { keyPrefix: 'activity_component.comment' })
  const [isFormVisible, setIsFormVisible] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      activityId,
      rating: 0,
    },
  })

  const rating = watch('rating')

  const addComment = async (data: FormData) => {
    await ActivitiesSingleton.getInstance().createComment(
      data.activityId,
      data.comment,
      data.rating,
    )
    setValue('comment', '')
    setValue('rating', 0)
    onComment(new CommentModel('You', data.comment, new Date(), data.rating))
    setIsFormVisible(false)
  }

  return (
    <View>
      {!isFormVisible && (
        <FAB
          icon="comment"
          style={{
            position: 'absolute',
            right: 16,
            bottom: 16,
            backgroundColor: theme.colors.primary,
          }}
          onPress={() => setIsFormVisible(true)}
          animated
        />
      )}

      {isFormVisible && (
        <View
          style={{
            padding: 10,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#e0e0e0',
            marginBottom: 10,
            backgroundColor: theme.colors.background,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: 10,
              // marginBottom: 16,
            }}
          >
            <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
              {t('add_comment')}
            </Text>
            <IconButton
              icon="arrow-down"
              size={20}
              onPress={() => setIsFormVisible(false)}
            />
          </View>

          <View>
            <Controller
              name="comment"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: t('required_field'),
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextArea
                  label={t('type_comment')}
                  mode="flat"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={Boolean(errors.comment?.message)}
                  style={{
                    backgroundColor: theme.colors.surface,
                    borderColor: theme.colors.secondary,
                    borderWidth: 1,
                    borderRadius: 8,
                    minHeight: 100,
                  }}
                  textColor={theme.colors.onSurface}
                  multiline
                  numberOfLines={4}
                />
              )}
            />
            {errors.comment?.message && (
              <Text style={{ color: 'red', fontSize: 12, marginTop: 4 }}>
                {errors.comment?.message}
              </Text>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <StarRatingInput
              control={control}
              name="rating"
              required
              size={25}
            />
            {isSubmitting ? (
              <Icon size={25} source="loading" color={theme.colors.primary} />
            ) : (
              <IconButton
                size={25}
                icon="send"
                iconColor={theme.colors.primary}
                disabled={!isValid || rating === 0}
                onPress={handleSubmit(addComment)}
              />
            )}
          </View>
        </View>
      )}
    </View>
  )
}

export default InputComment
