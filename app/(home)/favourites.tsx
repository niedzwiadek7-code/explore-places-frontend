import React, { useCallback } from 'react'
import {
  FlatList, ImageBackground, SafeAreaView,
} from 'react-native'
import { Card, Text } from 'react-native-paper'
import { ActivitiesFactory } from '@/services/activities/ActivitiesFactory'
import { useAuth } from '@/context/auth/Auth'
import { ActivityModel } from '@/models'
import { useFetch } from '@/hooks/useFetch'
import LoadingView from '@/components/UI/LoadingView'

const TabTwoScreen = () => {
  // TODO: show this points on map
  const { token } = useAuth()

  const fetchData = useCallback(
    async (): Promise<ActivityModel[]> => ActivitiesFactory.create(token).getLikedActivities(),
    [token],
  )

  const {
    data,
    loading,
  } = useFetch({
    fetchData,
    defaultData: [],
  })

  if (loading) {
    return <LoadingView />
  }

  const renderItem = ({ item }: { item: ActivityModel }) => (
    <SafeAreaView
      style={{
        flex: 0.5,
        height: 275,
      }}
    >
      <ImageBackground
        source={{ uri: item.images.get(0).value }}
        imageStyle={{
          borderRadius: 5,
          objectFit: 'cover',
        }}
        style={{
          height: '100%',
          margin: 2,
          flex: 1,
        }}
      >
        <Card
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,.0)',
            shadowColor: 'transparent',
          }}
        >
          <Card.Content>
            <Text
              variant="bodyMedium"
              style={{
                fontFamily: 'OpenSans',
                fontWeight: 900,
                color: 'white',
                textDecorationStyle: 'solid',
                textShadowColor: 'black',
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 0.6,
              }}
            >
              {item.name}
            </Text>
          </Card.Content>
        </Card>
      </ImageBackground>
    </SafeAreaView>
  )

  return (
    <SafeAreaView style={{
      flex: 1,
      marginVertical: 5,
    }}
    >
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        showsHorizontalScrollIndicator
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
        contentContainerStyle={{
          flex: 1,
        }}
      />
    </SafeAreaView>
  )
}

export default TabTwoScreen
