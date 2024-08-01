/* eslint-disable max-classes-per-file */

import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react'
import * as SecureStore from 'expo-secure-store'
import { Fifo } from '@/utils/collections'
import { ActivityModel } from '@/models'

class ActivitiesQueue extends Fifo<ActivityModel> {}

class ActivitiesContextClass {
  addActivities: (activities: ActivityModel[]) => Promise<void>

  popActivity: () => Promise<ActivityModel | undefined>

  clearActivities: () => Promise<void>

  getActivitiesQueueSize: () => number

  constructor(
    addActivities: (activities: ActivityModel[]) => Promise<void> = async () => {},
    popActivity: () => Promise<ActivityModel | undefined> = async () => undefined,
    clearActivities: () => Promise<void> = async () => {},
    getActivitiesQueueSize: () => number = () => 0,
  ) {
    this.addActivities = addActivities
    this.popActivity = popActivity
    this.clearActivities = clearActivities
    this.getActivitiesQueueSize = getActivitiesQueueSize
  }
}

const ActivitiesContext = createContext<ActivitiesContextClass>(
  new ActivitiesContextClass(),
)

type ProviderProps = {
  children: React.ReactNode
}

export const ActivitiesProvider: React.FC<ProviderProps> = ({ children }) => {
  const [activitiesQueue, setActivitiesQueue] = useState<ActivitiesQueue>(new ActivitiesQueue())

  useEffect(() => {
    const loadActivities = async () => {
      const activities = await SecureStore.getItemAsync('activities')

      if (activities) {
        const activitiesModels: ActivityModel[] = JSON.parse(activities)
        setActivitiesQueue(new ActivitiesQueue(activitiesModels))
      }
    }

    loadActivities()
  }, [])

  const clearActivities = useCallback(async () => {
    await SecureStore.deleteItemAsync('activities')
    setActivitiesQueue(new ActivitiesQueue())
  }, [])

  const addActivities = useCallback(async (activities: ActivityModel[]): Promise<void> => {
    activities.forEach((activity) => activitiesQueue.add(activity))
    await SecureStore.setItemAsync('activities', JSON.stringify(activitiesQueue.toArray()))
    setActivitiesQueue(activitiesQueue)
  }, [activitiesQueue])

  const popActivity = useCallback(async (): Promise<ActivityModel | undefined> => {
    const activity = activitiesQueue.remove()
    await SecureStore.setItemAsync('activities', JSON.stringify(activitiesQueue.toArray()))
    setActivitiesQueue(activitiesQueue)
    return activity
  }, [activitiesQueue])

  const getActivitiesQueueSize = useCallback(() => activitiesQueue.size(), [activitiesQueue])

  const value = useMemo(
    () => new ActivitiesContextClass(
      addActivities,
      popActivity,
      clearActivities,
      getActivitiesQueueSize,
    ),
    [addActivities, popActivity, clearActivities, getActivitiesQueueSize],
  )

  return (
    <ActivitiesContext.Provider value={value}>
      {children}
    </ActivitiesContext.Provider>
  )
}

export const useActivities = () => useContext(ActivitiesContext)
