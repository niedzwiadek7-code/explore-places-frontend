import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { Text } from 'react-native-paper'
import { useAuth } from '@/context/auth/Auth'
import { ActivitiesFactory } from '@/services/activities/ActivitiesFactory'
import { ActivityModel } from '@/models'
import LoadingView from '@/components/UI/LoadingView'
import Activity from '@/components/Activity'
import CustomList from '@/components/CustomList'

const Home = () => {
  const { token } = useAuth()
  const [activities, setActivities] = useState<ActivityModel[]>([])

  const fetchData = useCallback(async () => {
    const activitiesTmp = await ActivitiesFactory.create(token).getActivities(2)
    setActivities(activitiesTmp)
  }, [token])

  useEffect(() => {
    fetchData()
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
      />
    </SafeAreaView>
  )
}

export default Home
