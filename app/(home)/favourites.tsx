import React, { useCallback, useEffect, useState } from 'react'
import {
  BackHandler,
  FlatList, ImageBackground, SafeAreaView,
} from 'react-native'
import { Card, Text } from 'react-native-paper'
import { TabsProvider, Tabs, TabScreen } from 'react-native-paper-tabs'
import { useTranslation } from 'react-i18next'
import { ActivitiesFactory } from '@/services/activities/ActivitiesFactory'
import { useAuth } from '@/context/auth/Auth'
import { ActivityModel } from '@/models'
import { useFetch } from '@/hooks/useFetch'
import LoadingView from '@/components/UI/LoadingView'
import CustomList from '@/components/CustomList'
import Activity from '@/components/Activity'

const TabTwoScreen = () => {
  // TODO: show this points on map
  const { token } = useAuth()
  const [showList, setShowList] = useState(false)
  const [index, setIndex] = useState<number>(0)
  const { t, i18n } = useTranslation('translation', { keyPrefix: 'favourites' })

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (showList) {
          setShowList(false)
        }
        return true
      },
    )

    return () => backHandler.remove()
  }, [showList])

  const fetchData = useCallback(
    async (): Promise<ActivityModel[]> => ActivitiesFactory.create(token).getLikedActivities(
      i18n.language,
    ),
    [token],
  )

  const {
    data,
    loading,
    setData,
  } = useFetch({
    fetchData,
    defaultData: [],
  })

  useEffect(() => {
    setData(data.filter((activity) => activity.likedByUser))
  }, [showList])

  if (loading) {
    return <LoadingView />
  }

  const renderItem = ({ item }: { item: ActivityModel }) => (
    <SafeAreaView
      style={{
        flex: 0.5,
        height: 275,
      }}
      onTouchEnd={() => {
        setShowList(!showList)
        const localIndex = data.findIndex((activity) => activity.id === item.id)
        setIndex(localIndex)
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
              {item.name.original}
            </Text>
          </Card.Content>
        </Card>
      </ImageBackground>
    </SafeAreaView>
  )

  return (
    <TabsProvider
      defaultIndex={0}
    >
      <Tabs>
        <TabScreen
          label={t('likes')}
        >
          <SafeAreaView style={{
            flex: 1,
            marginVertical: 5,
          }}
          >
            {
              showList
                ? (
                  <CustomList
                    data={data}
                    renderItem={(activity) => <Activity activity={activity} />}
                    index={index}
                  />
                ) : (
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
                )
             }
          </SafeAreaView>
        </TabScreen>

        <TabScreen
          label={t('saved')}
        >
          <SafeAreaView>
            <Text>{t('saved')}</Text>
          </SafeAreaView>
        </TabScreen>
      </Tabs>
    </TabsProvider>
  )
}

export default TabTwoScreen
