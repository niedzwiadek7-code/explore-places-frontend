import React from 'react'
import { View } from 'react-native'
import { ActivityIndicator, Text } from 'react-native-paper'

const LoadingView: React.FC = () => (
  <View style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}
  >
    <ActivityIndicator size="large" />
  </View>
)

export default LoadingView
