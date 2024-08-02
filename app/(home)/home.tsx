import React, { useCallback, useEffect, useState } from 'react'
import { ImageBackground, TouchableOpacity, View } from 'react-native'
import {
  Card, IconButton, Text,
} from 'react-native-paper'
import { useAuth } from '@/context/auth/Auth'
import { ActivitiesFactory } from '@/services/activities/ActivitiesFactory'
import { useActivities } from '@/context/activities/Activities'
import { ActivityModel } from '@/models'
import { ListItem } from '@/utils/collections'
import ModalComponent from '@/components/UI/Modal'
import LoadingView from '@/components/UI/LoadingView'

const Home = () => {
  const { getActivitiesQueueSize, addActivities, popActivity } = useActivities()
  const { token } = useAuth()
  const [activity, setActivity] = useState<ActivityModel | undefined>(undefined)
  const [image, setImage] = useState<ListItem<string> | undefined>(undefined)

  const fetchData = useCallback(async () => {
    if (getActivitiesQueueSize() < 1) {
      const activities = await ActivitiesFactory.create(token).getActivities(2)
      await addActivities(activities)
    }

    const activityTmp = await popActivity()
    if (activityTmp) {
      setImage(activityTmp.images.get(0))
      setActivity(activityTmp)
    }
  }, [addActivities, getActivitiesQueueSize, popActivity, token])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (!activity || !image) {
    return <LoadingView />
  }

  return (
    <View
      style={{
        flex: 1,
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
    </View>
  )
}

export default Home
