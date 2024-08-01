import React, { useCallback, useEffect, useState } from 'react'
import { ImageBackground, View } from 'react-native'
import {
  Avatar, Button, Card, Text,
} from 'react-native-paper'
import { useAuth } from '@/context/auth/Auth'
import { ActivitiesFactory } from '@/services/activities/ActivitiesFactory'
import { useActivities } from '@/context/activities/Activities'
import { ActivityModel } from '@/models'

const Home = () => {
  const { getActivitiesQueueSize, addActivities, popActivity } = useActivities()
  const { token } = useAuth()
  const [activity, setActivity] = useState<ActivityModel | undefined>(null)

  const fetchData = useCallback(async () => {
    if (getActivitiesQueueSize() < 1) {
      const activities = await ActivitiesFactory.create(token).getActivities(2)
      await addActivities(activities)
    }

    const activityTmp = await popActivity()
    setActivity(activityTmp)
  }, [addActivities, getActivitiesQueueSize, popActivity, token])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (!activity) {
    return <Text>Loading...</Text>
  }

  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />

  return (
    <View>
      <Card>
        <ImageBackground
          source={{ uri: 'https://picsum.photos/700' }}
          // resizeMethod="auto"
          style={{
            width: 'auto',
            height: '100%',
          }}
        >
          <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
          <Card.Content>
            <Text variant="titleLarge">Card title</Text>
            <Text variant="bodyMedium">Card content</Text>
            <Text variant="bodyMedium">
              {' '}
              {JSON.stringify(activity)}
              {' '}
            </Text>
          </Card.Content>
          {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
          <Card.Actions>
            <Button>Cancel</Button>
            <Button onPress={fetchData}>Ok</Button>
          </Card.Actions>
        </ImageBackground>

      </Card>
      {/* <Text>Home</Text> */}
    </View>
  )
}

export default Home
