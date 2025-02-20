import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, Image } from 'react-native'
import * as Location from 'expo-location'
import { useTranslation } from 'react-i18next'
import { ActivitiesSingleton } from '@/services/activities/ActivitiesSingleton'
import { ActivityModel, CoordinatesModel } from '@/models'
import LoadingView from '@/components/UI/LoadingView'
import Activity from '@/components/Activity'
import CustomList from '@/components/CustomList'

const ACTIVITIES_COUNT = 10
const LOCATION_REFRESH_INTERVAL = 10000

const Home = () => {
  const [activities, setActivities] = useState<ActivityModel[]>([])
  const { i18n } = useTranslation()
  const [actualPosition, setActualPosition] = useState<CoordinatesModel | null>(null)

  const getActualPosition = async (): Promise<CoordinatesModel | null> => {
    const { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      return null
    }
    const location = await Location.getCurrentPositionAsync({})
    return new CoordinatesModel(
      location.coords.latitude,
      location.coords.longitude,
    )
  }

  const fetchData = useCallback(
    async (
      ignoreIds: (string | number)[] = [],
    ) => {
      const coordinates = actualPosition || await getActualPosition()
      const activitiesFetched = await ActivitiesSingleton.getInstance().getActivities(
        ACTIVITIES_COUNT,
        i18n.language,
        coordinates || undefined,
        ignoreIds,
      )

      const activityPromises = activitiesFetched.reduce<Promise<boolean>[]>(
        (acc, activity) => {
          const imagePromises = activity.images.items.map((e) => Image.prefetch(e))
          acc.push(...imagePromises)
          return acc
        },
        [],
      )

      Promise.all(activityPromises)
      return activitiesFetched
    },
    [i18n.language, actualPosition],
  )

  useEffect(() => {
    const getCoords = async () => {
      const coords = await getActualPosition()
      if (coords) {
        setActualPosition(coords)
      }
    }

    const locationInterval = setInterval(async () => {
      await getCoords()
    }, LOCATION_REFRESH_INTERVAL)

    getCoords()

    return () => {
      clearInterval(locationInterval)
    }
  }, [])

  useEffect(() => {
    const getStartData = async () => {
      const localData = await fetchData()
      setActivities(localData)
    }

    setTimeout(() => {
      getStartData()
    }, 100)
  }, [fetchData])

  if (!activities.length) {
    return <LoadingView />
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <CustomList
        data={activities}
        renderItem={(activity) => <Activity activity={activity} />}
        fetchMoreData={fetchData}
      />
    </SafeAreaView>
  )
}

export default Home
