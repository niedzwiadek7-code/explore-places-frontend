import React, { useEffect, useState, useRef } from 'react'
import { TextInput, TextInputProps } from 'react-native-paper'

interface AutoResizingTextInputProps extends TextInputProps {}

const AutoResizingTextInput: React.FC<AutoResizingTextInputProps> = (props) => {
  const [height, setHeight] = useState(40)
  const textInputRef = useRef<TextInput>()

  useEffect(() => {
    if (!props.value) {
      setHeight(40)
      if (textInputRef.current) {
        textInputRef.current.blur()
      }
    }
  }, [props.value])

  return (
    <TextInput
      ref={textInputRef}
      {...props}
      multiline
      style={[props.style, {
        height,
        // textAlignVertical: 'top',
        backgroundColor: 'transparent',
      }]}
      contentStyle={[props.contentStyle, {
        // marginVertical: 10,
      }]}
      onContentSizeChange={(event) => {
        setHeight(event.nativeEvent.contentSize.height)
        props.onContentSizeChange?.(event)
      }}
      // textAlignVertical="top"
    />
  )
}

export default AutoResizingTextInput
