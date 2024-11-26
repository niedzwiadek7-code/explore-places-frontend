import { View } from 'react-native'
import React, { useRef } from 'react'
import {
  Card, IconButton, Avatar, Text, useTheme, Icon,
} from 'react-native-paper'
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetVirtualizedList,
} from '@gorhom/bottom-sheet'
import { useTranslation } from 'react-i18next'
import { CommentModel } from '@/models'

type Props = {
  comments: CommentModel[]
  activityId: number
}

const Comment: React.FC<{comment: CommentModel}> = ({ comment }) => {
  const theme = useTheme()

  return (
  // <View>
  //   <Text> {comment.author} </Text>
  //   <Text> {comment.content} </Text>
  //   <Text> {comment.date.toISOString()} </Text>
  // </View>

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
        subtitle={comment.date.toISOString()}
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

const Comments: React.FC<Props> = ({ comments }) => {
  const commentSheetRef = useRef<BottomSheetModal>(null)
  const theme = useTheme()
  const { t } = useTranslation('translation', { keyPrefix: 'activity_component.comment' })

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
        // index={1}
        snapPoints={['70%']}
        enableDynamicSizing={false}
        enableOverDrag={false}
        enablePanDownToClose
      >
        <BottomSheetView>
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
                  contentContainerStyle={{ paddingBottom: 50 }}
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
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  )
}

export default Comments
