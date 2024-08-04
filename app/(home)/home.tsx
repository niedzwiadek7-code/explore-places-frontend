import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { useAuth } from '@/context/auth/Auth'
import { ActivitiesFactory } from '@/services/activities/ActivitiesFactory'
import { ActivityModel } from '@/models'
import LoadingView from '@/components/UI/LoadingView'
import Activity from '@/components/Activity'
import CustomList from '@/components/CustomList'

const ACTIVITIES_COUNT = 2

const Home = () => {
  const { token } = useAuth()
  const [activities, setActivities] = useState<ActivityModel[]>([])

  const fetchData = useCallback(
    async () => ActivitiesFactory.create(token).getActivities(ACTIVITIES_COUNT),
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
