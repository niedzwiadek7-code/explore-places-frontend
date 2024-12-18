import { View } from 'react-native'
import React, { memo, useRef } from 'react'
import {
  Card, IconButton, Avatar, Text, useTheme, Icon,
} from 'react-native-paper'
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetVirtualizedList,
} from '@gorhom/bottom-sheet'
import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { CommentModel } from '@/models'
import TextArea from '@/components/UI/TextArea'
import { ActivitiesSingleton } from '@/services/activities/ActivitiesSingleton'
import DateUtils from '@/utils/Date'

type Props = {
  comments: CommentModel[]
  activityId: number
}

type FormData = {
  comment: string
  activityId: number
}

const Comment: React.FC<{comment: CommentModel}> = ({ comment }) => {
  const theme = useTheme()
  const { t } = useTranslation('translation', { keyPrefix: 'activity_component.comment' })

  return (
    <Card
      style={{
        marginTop: 10,
        backgroundColor: 'white',
        marginHorizontal: 10,
        // borderBottomColor: theme.colors.secondary,
        // borderStyle: 'solid',
        // borderBottomWidth: 1,
      }}
      // elevation={0}
    >
      <Card.Title
        title={comment.author}
        subtitle={`${DateUtils.calculateTimeToNow(comment.date)} ${t('ago')}`}
        left={(props) => (
          <Avatar.Icon
            {...props}
            icon="account"
            // color='white'
            theme={{
              colors: {
                primary: theme.colors.secondary,
              },
            }}
          />
        )}
        titleVariant="titleMedium"
        subtitleVariant="bodySmall"
        // right={(props) => <IconButton {...props} icon="dots-vertical" />}
      />
      <Card.Content>
        <Text> {comment.content} </Text>
      </Card.Content>
    </Card>
  )
}

const Comments: React.FC<Props> = ({ comments, activityId }) => {
  const commentSheetRef = useRef<BottomSheetModal>(null)
  const theme = useTheme()
  const { t } = useTranslation('translation', { keyPrefix: 'activity_component.comment' })

  const {
    control, handleSubmit, formState: { errors, isSubmitting }, setValue,
  } = useForm<FormData>({
    mode: 'onSubmit',
    defaultValues: {
      activityId,
    },
  })

  const addComment = async (data: FormData) => {
    await ActivitiesSingleton.getInstance().createComment(data.activityId, data.comment)
    setValue('comment', '')
    // TODO: here should be username
    comments.push(new CommentModel('You', data.comment, new Date()))
  }

  return (
    <View>
      <IconButton
        icon="comment"
        iconColor="white"
        containerColor="rgba(0,0,0,.5)"
        size={35}
        onPress={() => {
          commentSheetRef.current?.present()
        }}
      />

      <BottomSheetModal
        ref={commentSheetRef}
        snapPoints={['70%']}
        enableDynamicSizing={false}
        enableOverDrag={false}
        enablePanDownToClose
      >
        <BottomSheetView
          style={{
            paddingHorizontal: 15,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Text
            variant="titleLarge"
            style={{
              textAlign: 'center',
            }}
          >
            {t('comments')}
          </Text>

          {
              comments.length ? (
                <BottomSheetVirtualizedList<CommentModel>
                  data={comments}
                  renderItem={({ item }) => <Comment comment={item} />}
                  keyExtractor={(item) => `${item.date.toISOString()} ${item.author}`}
                  getItemCount={(data) => data.length}
                  getItem={(data, index) => data[index]}
                  contentContainerStyle={{ paddingBottom: 20 }}
                />
              ) : (
                <View
                  style={{
                    marginTop: 15,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <Text>
                    {t('no_comments')}
                  </Text>

                  <Icon
                    source="comment-off-outline"
                    size={70}
                    color={theme.colors.secondary}
                  />
                </View>
              )
            }

          <View
            style={{
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flex: 1 }}>
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

                  />
                )}
              />

              {
                errors.comment?.message && (
                  <Text
                    style={{
                      color: theme.colors.error,
                      fontSize: 12,
                    }}
                  >
                    {errors.comment?.message}
                  </Text>
                )
              }
            </View>

            {
              isSubmitting ? (
                <Icon
                  size={25}
                  source="loading"
                  color={theme.colors.primary}
                />
              ) : (
                <IconButton
                  size={25}
                  icon="send"
                  iconColor={theme.colors.primary}
                  onPress={handleSubmit(addComment)}
                />
              )
            }
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  )
}

export default memo(Comments)
