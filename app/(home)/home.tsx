import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import * as Location from 'expo-location'
import { useTranslation } from 'react-i18next'
import { useAuth } from '@/context/auth/Auth'
import { ActivitiesFactory } from '@/services/activities/ActivitiesFactory'
import { ActivityModel, CoordinatesModel } from '@/models'
import LoadingView from '@/components/UI/LoadingView'
import Activity from '@/components/Activity'
import CustomList from '@/components/CustomList'

const ACTIVITIES_COUNT = 10

const Home = () => {
  const { token } = useAuth()
  const [activities, setActivities] = useState<ActivityModel[]>([])
  const [actualPosition, setActualPosition] = useState<CoordinatesModel | null>(null)
  const { i18n } = useTranslation()

  const getActualPosition = async (): Promise<CoordinatesModel | null> => {
    if (!actualPosition) {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        return null
      }
      const location = await Location.getCurrentPositionAsync({})
      setActualPosition(
        new CoordinatesModel(
          location.coords.latitude,
          location.coords.longitude,
        ),
      )
    }
    return actualPosition
  }

  const fetchData = useCallback(
    async () => {
      const coordinates = await getActualPosition()
      return ActivitiesFactory.create(token).getActivities(
        ACTIVITIES_COUNT,
        i18n.language,
        coordinates || undefined,
      )
    },
    [token],
  )

  useEffect(() => {
    const getStartData = async () => {
      const localData = await fetchData()
      setActivities(localData)
    }

    getStartData()
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
