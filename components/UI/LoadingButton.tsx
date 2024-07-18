import React, {
  cloneElement, ReactElement, useState,
} from 'react'

type Props = {
  children: ReactElement,
}

const LoadingButton: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const onPressLocal = async () => {
    setLoading(true)
    await children.props.onPress()
    setLoading(false)
  }

  return cloneElement(
    children,
    {
      onPress: onPressLocal,
      loading,
    },
  )
}

export default LoadingButton
