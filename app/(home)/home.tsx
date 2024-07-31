import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useAuth } from '@/context/auth/Auth'
import { ActivitiesFactory } from '@/services/activities/ActivitiesFactory'

const Home = () => {
  const { token } = useAuth()
  console.log(token)

  useEffect(() => {
    const fetchData = async () => {
      const activities = await ActivitiesFactory.create(token).getActivities(2)
      console.log(activities)
    }

    fetchData()
  })

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home
