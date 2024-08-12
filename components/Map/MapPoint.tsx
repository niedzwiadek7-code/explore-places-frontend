import React from 'react'
import { View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { CoordinatesModel } from '@/models'

type Props = {
  coordinates: CoordinatesModel
}

const MapPoint: React.FC<Props> = ({ coordinates }) => (
  <View
    style={{
      width: '100%',
      height: '100%',
    }}
  >
    <MapView
      style={{
        flex: 1,
        margin: 0,
        padding: 0,
      }}
      initialRegion={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      provider={PROVIDER_GOOGLE}
    >
      <Marker
        coordinate={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        }}
      />
    </MapView>
  </View>
)

export default MapPoint
