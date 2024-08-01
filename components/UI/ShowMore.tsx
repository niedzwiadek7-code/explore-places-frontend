import React, { cloneElement, ReactElement, useState } from 'react'

type Props = {
  textComponent: ReactElement
}

const ShowMore: React.FC<Props> = ({ textComponent }) => {
  const [showMore, setShowMore] = useState(false)

  return cloneElement(
    textComponent,
    {
      onPress: () => setShowMore(!showMore),
      children: showMore ? 'Show less' : 'Show more',
    },
  )
}
