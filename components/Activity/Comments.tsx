import { View } from 'react-native'
import React, { memo, useRef } from 'react'
import {
  IconButton, Text, Icon,
} from 'react-native-paper'
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetVirtualizedList,
} from '@gorhom/bottom-sheet'
import { useTranslation } from 'react-i18next'
import { CommentModel } from '@/models'
import { useThemeContext } from '@/context/theme/Theme'
import Comment from '@/components/Activity/Comment'
import InputComment from '@/components/Activity/InputComment'

type Props = {
  comments: CommentModel[]
  activityId: number
}

const Comments: React.FC<Props> = ({ comments, activityId }) => {
  const commentSheetRef = useRef<BottomSheetModal>(null)
  const { theme } = useThemeContext()
  const { t } = useTranslation('translation', { keyPrefix: 'activity_component.comment' })
  const [allComments, setAllComments] = React.useState<CommentModel[]>(comments)

  const onComment = async (comment: CommentModel) => {
    setAllComments((prev) => [...prev, comment])
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
        backgroundStyle={{ backgroundColor: theme.colors.surface }}
      >
        <BottomSheetView
          style={{
            paddingHorizontal: 15,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: theme.colors.background,
          }}
        >
          <Text
            variant="titleLarge"
            style={{
              textAlign: 'center',
              color: theme.colors.onBackground,
            }}
          >
            {t('comments')}
          </Text>

          {
            allComments.length ? (
              <BottomSheetVirtualizedList<CommentModel>
                data={allComments}
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
                <Text style={{ color: theme.colors.onBackground }}>
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

          <InputComment
            onComment={onComment}
            activityId={activityId}
          />

        </BottomSheetView>
      </BottomSheetModal>
    </View>
  )
}

export default memo(Comments)
