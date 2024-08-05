import React, { useCallback } from 'react'
import { View, Text } from 'react-native'
import { ActivitiesFactory } from '@/services/activities/ActivitiesFactory'
import { useAuth } from '@/context/auth/Auth'
import { ActivityModel } from '@/models'
import { useFetch } from '@/hooks/useFetch'
import LoadingView from '@/components/UI/LoadingView'

const TabTwoScreen = () => {
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

  return (
    <View>
      <Text>Favourites</Text>
      {data.map((activity) => (
        <Text key={activity.id}>{activity.name}</Text>
      ))}
    </View>
  )
}

export default TabTwoScreen
