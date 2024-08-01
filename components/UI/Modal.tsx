import React, { cloneElement, ReactElement, useState } from 'react'
import { Modal, Portal } from 'react-native-paper'

type Props = {
  children: ReactElement,
  button: ReactElement,
}

const ModalComponent: React.FC<Props> = ({ children, button }) => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      {cloneElement(button, { onPress: () => setVisible(true) })}
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => setVisible(false)}
          contentContainerStyle={{
            backgroundColor: 'white',
            padding: 20,
            margin: 20,
          }}
        >
          {children}
        </Modal>
      </Portal>
    </>
  )
}

export default ModalComponent
