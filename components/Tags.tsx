import React from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'
import { Chip } from 'react-native-paper'

type Props = {
  tags: string[]
}

const Tags: React.FC<Props> = ({ tags }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'tags' })

  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 15,
        gap: 5,
      }}
    >
      {
        tags.map((tag) => (
          <Chip
            key={tag}
          >
            {t(tag)}
          </Chip>
        ))
      }
    </View>
  )
}

export default Tags
