import React from 'react'
import { useTranslation } from 'react-i18next'
import { Avatar, Card, Text } from 'react-native-paper'
import { View } from 'react-native'
import { useThemeContext } from '@/context/theme/Theme'
import { CommentModel } from '@/models'
import DateUtils from '@/utils/Date'
import StarRatingDisplay from '@/components/UI/StarRatingDisplay'

type Props = {
  comment: CommentModel
}

const LeftIcon: React.FC<{ size: number }> = ({ size }) => {
  const { theme } = useThemeContext()

  return (
    <Avatar.Icon
      size={size}
      icon="account"
      theme={{
        colors: {
          primary: theme.colors.secondary,
        },
      }}
    />
  )
}

const Comment: React.FC<Props> = ({ comment }) => {
  const { theme } = useThemeContext()
  const { t } = useTranslation('translation', { keyPrefix: 'activity_component.comment' })

  return (
    <Card
      style={{
        marginTop: 10,
        backgroundColor: theme.colors.background,
        marginHorizontal: 10,
      }}
    >
      <Card.Title
        title={(
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Text
              style={{ color: theme.colors.onBackground }}
            >
              {comment.author}
            </Text>

            <Text
              style={{
                color: theme.colors.onSurfaceVariant,
                fontSize: 12,
              }}
            >
              {DateUtils.calculateTimeToNow(comment.date)} {t('ago')}
            </Text>
          </View>
        )}
        subtitle={(
          <StarRatingDisplay rating={comment.rating} />
        )}
        titleStyle={{
          color: theme.colors.onBackground,
        }}
        left={(props) => <LeftIcon size={props.size} />}
        titleVariant="titleMedium"
        subtitleVariant="bodySmall"
      />
      <Card.Content>
        <Text
          style={{ color: theme.colors.onSurface }}
        >
          {comment.content}
        </Text>
      </Card.Content>
    </Card>
  )
}

export default Comment
