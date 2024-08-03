import React, { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/context/auth/Auth'
import { ActivitiesFactory } from '@/services/activities/ActivitiesFactory'
import { useActivities } from '@/context/activities/Activities'
import { ActivityModel } from '@/models'
import LoadingView from '@/components/UI/LoadingView'
import Activity from '@/components/Activity'

const Home = () => {
  const { getActivitiesQueueSize, addActivities, popActivity } = useActivities()
  const { token } = useAuth()
  const [activity, setActivity] = useState<ActivityModel | undefined>(undefined)

  const fetchData = useCallback(async () => {
    if (getActivitiesQueueSize() < 1) {
      const activities = await ActivitiesFactory.create(token).getActivities(2)
      await addActivities(activities)
    }

    const activityTmp = await popActivity()
    if (activityTmp) {
      setActivity(activityTmp)
    }
  }, [addActivities, getActivitiesQueueSize, popActivity, token])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (!activity) {
    return <LoadingView />
  }

  return (
    <Activity
      activity={activity}
    />
  )
}

export default Home
