import React from 'react'
import { View } from 'react-native'
import { Icon } from 'react-native-paper'
import { useThemeContext } from '@/context/theme/Theme'

type StarRatingDisplayProps = {
  rating: number
  maxStars?: number
}

const StarRatingDisplay: React.FC<StarRatingDisplayProps> = ({ rating, maxStars = 5 }) => {
  const { theme } = useThemeContext()

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
    }}
    >
      {Array.from({ length: maxStars }, (_, index) => (
        <Icon
          key={index}
          source={index < rating ? 'star' : 'star-outline'}
          size={20}
          color={theme.colors.secondary}
        />
      ))}
    </View>
  )
}

export default StarRatingDisplay
