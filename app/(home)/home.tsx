import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, Image } from 'react-native'
import { useTranslation } from 'react-i18next'
import { ActivitiesSingleton } from '@/services/activities/ActivitiesSingleton'
import { ActivityModel } from '@/models'
import LoadingView from '@/components/UI/LoadingView'
import Activity from '@/components/Activity'
import CustomList from '@/components/CustomList'
import { useCoordinates } from '@/context/coordinates/Coordinates'

const ACTIVITIES_COUNT = 10

const Home = () => {
  const [activities, setActivities] = useState<ActivityModel[]>([])
  const { i18n } = useTranslation()
  const { actualPosition } = useCoordinates()

  const fetchData = useCallback(
    async (
      ignoreIds: (string | number)[] = [],
    ) => {
      const activitiesFetched = await ActivitiesSingleton.getInstance().getActivities(
        ACTIVITIES_COUNT,
        i18n.language,
        actualPosition || undefined,
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
