import { useCallback, useState } from 'react'
import { TranslatedField } from '@/models'

type Result = {
  isTranslated: boolean,
  toggleTranslation: () => void,
  localTranslate: (prop: TranslatedField) => string,
}

const useLocalTranslation = (): Result => {
  const [isTranslated, setIsTranslated] = useState(true)

  const toggleTranslation = () => {
    setIsTranslated(!isTranslated)
  }

  const localTranslate = useCallback(
    (prop: TranslatedField): string => (
      (isTranslated && prop.translated)
        ? prop.translated
        : prop.original
    ),
    [isTranslated],
  )

  return {
    isTranslated,
    toggleTranslation,
    localTranslate,
  }
}

export default useLocalTranslation
