import React, { useState } from 'react'
import {
  ImageBackground, SafeAreaView, TouchableOpacity, View,
} from 'react-native'
import { Card, IconButton, Text } from 'react-native-paper'
import { ActivityModel } from '@/models'
import ModalComponent from '@/components/UI/Modal'

type Props = {
  activity: ActivityModel
}

const Activity: React.FC<Props> = ({ activity }) => {
  const [image, setImage] = useState(activity.images.get(0))

  return (
    <SafeAreaView
      style={{
        height: '100%',
      }}
    >
      <TouchableOpacity
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '20%',
          height: '85%',
          zIndex: 1000,
        }}
        onPress={() => setImage(image.prev())}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '20%',
          height: '85%',
          zIndex: 1000,
        }}
        onPress={() => setImage(image.next())}
      />
      <ImageBackground
        source={{ uri: image.value }}
        imageStyle={{
          borderRadius: 15,
          objectFit: 'cover',
        }}
        style={{
          margin: 10,
          flex: 1,
        }}
      >
        <Card
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,.0)',
          }}
          mode="contained"
        >
          <Card.Content>
            <Text
              variant="titleLarge"
              style={{
                fontFamily: 'OpenSans',
                color: 'white',
                fontWeight: 900,
                textDecorationStyle: 'solid',
                textShadowColor: 'black',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 0.6,
              }}
            >
              {activity.name}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 15,
              }}
            >
              <IconButton
                icon="heart"
                size={35}
                mode="contained"
                onPress={() => console.log('hearts')}
              />
              <IconButton
                icon="comment"
                mode="contained"
                size={35}
                onPress={() => console.log('comment')}
              />
              <IconButton
                icon="share"
                mode="contained"
                size={35}
                onPress={() => console.log('share')}
              />
              <IconButton
                icon="map"
                mode="contained"
                size={35}
                onPress={() => console.log('map')}
              />
              <ModalComponent
                button={(
                  <IconButton
                    icon="information"
                    mode="contained"
                    size={35}
                    onPress={() => console.log('details')}
                  />
                )}
              >
                <View>
                  <Text
                    variant="titleLarge"
                    style={{
                      fontFamily: 'OpenSans',
                    }}
                  >
                    {activity.name}
                  </Text>

                  <Text
                    variant="bodyMedium"
                    style={{
                      fontFamily: 'OpenSans',
                      marginTop: 20,
                    }}
                  >
                    {activity.description}
                  </Text>

                  <Text
                    variant="titleMedium"
                    style={{
                      fontFamily: 'OpenSans',
                      marginTop: 10,
                    }}
                  >
                    Adres:
                  </Text>
                  <Text
                    variant="bodyMedium"
                    style={{
                      fontFamily: 'OpenSans',
                    }}
                  >
                    {activity.address.toString()}
                  </Text>
                </View>
              </ModalComponent>
            </View>
          </Card.Content>
        </Card>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Activity
