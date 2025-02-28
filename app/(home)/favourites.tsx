import React, { useCallback, useEffect, useState } from 'react'
import {
  BackHandler,
  FlatList, ImageBackground, SafeAreaView, StyleSheet,
} from 'react-native'
import { Card, Text } from 'react-native-paper'
import { TabsProvider } from 'react-native-paper-tabs'
import { useTranslation } from 'react-i18next'
import { useNavigation } from 'expo-router'
import { ActivitiesSingleton } from '@/services/activities/ActivitiesSingleton'
import { ActivityModel } from '@/models'
import { useFetch } from '@/hooks/useFetch'
import LoadingView from '@/components/UI/LoadingView'
import CustomList from '@/components/CustomList'
import Activity from '@/components/Activity'
import { useCoordinates } from '@/context/coordinates/Coordinates'
import { useThemeContext } from '@/context/theme/Theme'

const TabTwoScreen = () => {
  const [showList, setShowList] = useState(false)
  const [index, setIndex] = useState<number>(0)
  const { i18n } = useTranslation('translation', { keyPrefix: 'favourites' })
  const { actualPosition } = useCoordinates()
  const { theme } = useThemeContext()
  const navigation = useNavigation()

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
    async (): Promise<ActivityModel[]> => ActivitiesSingleton.getInstance().getLikedActivities(
      i18n.language,
      actualPosition || undefined,
    ),
    [i18n.language, actualPosition],
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
    navigation.setOptions({
      headerShown: !showList,
    })
  }, [showList])

  if (loading) {
    return <LoadingView />
  }

  const renderItem = ({ item }: { item: ActivityModel }) => (
    <SafeAreaView
      style={{
        flex: 0.5,
        height: 275,
        backgroundColor: theme.colors.background, // Dostosuj tło do motywu
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
                fontWeight: '900',
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
    <TabsProvider defaultIndex={0}>
      <SafeAreaView style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
      >
        {showList ? (
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
              backgroundColor: theme.colors.background, // Dostosuj tło do motywu
            }}
            contentContainerStyle={{
              flex: 1,
            }}
          />
        )}
      </SafeAreaView>
    </TabsProvider>
  )
}

export default TabTwoScreen
